import { AppShell } from "@/components/layout/AppShell";
import { ClientItemsTable } from "@/components/clients/ClientItemsTable";
import { AttachmentsList } from "@/components/clients/AttachmentsList";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Mail, Phone, Paperclip } from "lucide-react";

export default async function ClientDetailPage({ params }: { params: { id: string } }) {
  const supabase = createClient();

  const [{ data: client }, { data: attachments }] = await Promise.all([
    supabase
      .from("clients")
      .select("*, items(*)")
      .eq("id", params.id)
      .single(),
    supabase
      .from("attachments")
      .select("*")
      .eq("client_id", params.id)
      .order("created_at", { ascending: false }),
  ]);

  if (!client) notFound();

  const items = client.items ?? [];
  const missingCount = items.filter(
    (i: { status: string }) => i.status === "missing" || i.status === "overdue"
  ).length;

  return (
    <AppShell title={client.name}>
      <div className="max-w-5xl mx-auto space-y-6">
        <Link href="/clients" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 transition-colors">
          <ChevronLeft className="w-4 h-4" /> Wszyscy klienci
        </Link>

        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{client.name}</h2>
              <div className="flex flex-wrap gap-5 mt-3">
                {client.email && (
                  <a href={`mailto:${client.email}`} className="flex items-center gap-2 text-sm text-gray-500 hover:text-accent transition-colors">
                    <Mail className="w-4 h-4" /> {client.email}
                  </a>
                )}
                {client.phone && (
                  <a href={`tel:${client.phone}`} className="flex items-center gap-2 text-sm text-gray-500 hover:text-accent transition-colors">
                    <Phone className="w-4 h-4" /> {client.phone}
                  </a>
                )}
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div className="text-right">
                <div className="text-xs text-gray-400">Pozycje</div>
                <div className="text-sm font-semibold text-gray-700">{items.length}</div>
              </div>
              <div className="text-right pl-4 border-l border-gray-200">
                <div className="text-xs text-gray-400">Braki</div>
                <div className="text-sm font-bold text-amber-600">{missingCount}</div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Pozycje ({items.length})</h3>
          <ClientItemsTable clientId={client.id} clientName={client.name} items={items} />
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Paperclip className="w-4 h-4 text-gray-400" />
            Pliki otrzymane emailem ({(attachments ?? []).length})
          </h3>
          <AttachmentsList attachments={attachments ?? []} />
        </div>
      </div>
    </AppShell>
  );
}
