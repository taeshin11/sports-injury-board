import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SportsInjuryBoard — NFL NBA MLB NHL Injury Reports",
  description: "Live injury reports across NFL, NBA, MLB, and NHL. Updated every 30 minutes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
