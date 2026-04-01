import type { Attachment } from "@/lib/types";
import { FileText, Image, FileSpreadsheet, File, Download } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";

function getMimeIcon(mime: string | null) {
  if (!mime) return File;
  if (mime.startsWith("image/")) return Image;
  if (mime === "application/pdf") return FileText;
  if (
    mime.includes("spreadsheet") ||
    mime.includes("excel") ||
    mime === "text/csv"
  )
    return FileSpreadsheet;
  return FileText;
}

function formatBytes(bytes: number | null): string {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

interface AttachmentsListProps {
  attachments: Attachment[];
}

export async function AttachmentsList({ attachments }: AttachmentsListProps) {
  if (attachments.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center text-gray-400 text-sm">
        Brak plików. Klient nie wysłał jeszcze żadnych dokumentów emailem.
      </div>
    );
  }

  // Generate signed URLs for all attachments
  const supabase = createClient();
  const withUrls = await Promise.all(
    attachments.map(async (att) => {
      const { data } = await supabase.storage
        .from("documents")
        .createSignedUrl(att.file_path, 3600);
      return { ...att, signedUrl: data?.signedUrl ?? null };
    })
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50">
            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Plik
            </th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Rozmiar
            </th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Otrzymano
            </th>
            <th className="px-6 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {withUrls.map((att) => {
            const Icon = getMimeIcon(att.mime_type);
            return (
              <tr key={att.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-blue-500" />
                    </div>
                    <span className="font-medium text-gray-900 truncate max-w-[240px]">
                      {att.filename}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-500 text-xs">
                  {formatBytes(att.size_bytes)}
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {formatDate(att.created_at)}
                </td>
                <td className="px-6 py-4 text-right">
                  {att.signedUrl ? (
                    <a
                      href={att.signedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-accent hover:text-accent-600 font-medium text-xs transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Pobierz
                    </a>
                  ) : (
                    <span className="text-gray-300 text-xs">Niedostępny</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
