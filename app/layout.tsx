import type { Metadata } from "next";
import "./globals.css";
import { LangProvider } from "@/components/LangContext";
import Cursor from "@/components/Cursor";

export const metadata: Metadata = {
  title: "Build Haus Studio — Web Design & Development",
  description:
    "Premium web design studio based in Montevideo, Uruguay. 5 years of experience, 20+ clients served.",
  openGraph: {
    title: "Build Haus Studio",
    description: "Web design & development studio. Based in Montevideo, Uruguay.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <LangProvider>
          <Cursor />
          {children}
        </LangProvider>
      </body>
    </html>
  );
}
