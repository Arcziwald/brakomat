import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/service";

// Sendgrid Inbound Parse sends multipart/form-data with:
// from, subject, text, html, attachments (JSON array), attachment-info
// Full docs: https://docs.sendgrid.com/for-developers/parsing-email/setting-up-the-inbound-parse-webhook

export async function POST(request: NextRequest) {
  // Verify webhook secret
  const secret = request.nextUrl.searchParams.get("secret");
  if (secret !== process.env.EMAIL_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();

    const fromRaw = formData.get("from") as string ?? "";
    const subject = formData.get("subject") as string ?? "";

    // Extract email address from "Name <email@example.com>" format
    const fromMatch = fromRaw.match(/<(.+?)>/) ?? fromRaw.match(/(\S+@\S+)/);
    const fromEmail = (fromMatch?.[1] ?? fromRaw).toLowerCase().trim();

    if (!fromEmail) {
      return NextResponse.json({ error: "No sender email" }, { status: 400 });
    }

    // Find client by sender email (searches across all users — needs service role)
    const { data: client } = await supabaseAdmin
      .from("clients")
      .select("id, user_id, name")
      .ilike("email", fromEmail)
      .single();

    // Log the inbound email regardless of match
    const { data: emailLog } = await supabaseAdmin
      .from("email_logs")
      .insert({
        user_id: client?.user_id ?? null,
        client_id: client?.id ?? null,
        from_email: fromEmail,
        subject: subject || null,
        matched: !!client,
      })
      .select()
      .single();

    if (!client || !emailLog) {
      // Email logged as unmatched — no further processing
      return NextResponse.json({ ok: true, matched: false });
    }

    // Parse attachments from Sendgrid
    // Sendgrid sends attachment content as form fields: attachment1, attachment2, ...
    // and metadata as "attachment-info" JSON string
    const attachmentInfoRaw = formData.get("attachment-info") as string | null;
    const attachmentInfo: Record<string, { filename: string; type: string; size: number }> =
      attachmentInfoRaw ? JSON.parse(attachmentInfoRaw) : {};

    const uploadedAttachments: string[] = [];

    for (const [key, meta] of Object.entries(attachmentInfo)) {
      const file = formData.get(key) as File | null;
      if (!file) continue;

      const filename = meta.filename ?? file.name ?? key;
      const mimeType = meta.type ?? file.type ?? "application/octet-stream";
      const sizeBytes = meta.size ?? file.size ?? 0;
      const timestamp = Date.now();
      const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
      const filePath = `${client.user_id}/${client.id}/${timestamp}_${safeName}`;

      const arrayBuffer = await file.arrayBuffer();
      const { error: uploadError } = await supabaseAdmin.storage
        .from("documents")
        .upload(filePath, arrayBuffer, { contentType: mimeType, upsert: false });

      if (uploadError) continue;

      // Record attachment in DB
      await supabaseAdmin.from("attachments").insert({
        user_id: client.user_id,
        client_id: client.id,
        email_log_id: emailLog.id,
        filename,
        file_path: filePath,
        mime_type: mimeType,
        size_bytes: sizeBytes,
      });

      // Create a new item with status="received" for this document
      await supabaseAdmin.from("items").insert({
        user_id: client.user_id,
        client_id: client.id,
        title: filename.replace(/\.[^/.]+$/, ""), // strip extension for title
        status: "received",
        note: `Otrzymano przez email: ${subject || fromEmail}`,
      });

      uploadedAttachments.push(filename);
    }

    return NextResponse.json({
      ok: true,
      matched: true,
      client: client.name,
      attachments: uploadedAttachments,
    });
  } catch (err) {
    console.error("Email inbound error:", err);
    // Always return 200 to prevent Sendgrid from retrying
    return NextResponse.json({ ok: false, error: String(err) });
  }
}
