import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sehnsucht.nach.einer.ehefrau",
  description: "Sehnsucht nach einer Ehefrau",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-lt-installed="true">
      <body className="antialiased">{children}</body>
    </html>
  );
}
