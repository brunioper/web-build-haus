import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/components/LangContext";
import Cursor from "@/components/Cursor";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Build Haus Studio — Web Design & Development",
  description:
    "Premium web design studio crafting high-converting digital experiences. 5+ years, 25+ clients.",
  openGraph: {
    title: "Build Haus Studio",
    description: "Premium web design & development studio.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable}`}
      style={{ fontFamily: "var(--font-body)" }}
    >
      <body className="min-h-screen">
        <LangProvider>
          <Cursor />
          {children}
        </LangProvider>
      </body>
    </html>
  );
}
