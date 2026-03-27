import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Brakomat — Śledź braki dokumentów",
  description:
    "Prosty system dla biur rachunkowych. Śledź braki dokumentów, zmieniaj statusy i wysyłaj przypomnienia w kilka sekund.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
