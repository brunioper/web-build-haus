import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/components/LangContext";
import { ThemeProvider } from "@/components/ThemeContext";
import Cursor from "@/components/Cursor";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", weight: ["300","400","500","600","700"] });
const inter = Inter({ subsets: ["latin"], variable: "--font-body", weight: ["300","400","500"] });

export const metadata: Metadata = {
  title: "Build Haus Studio — Web Design & Development",
  description: "Estudio de diseño web en Montevideo, Uruguay. 5+ años, 20+ clientes. Landing pages, e-commerce, apps web.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="min-h-screen">
        <ThemeProvider>
          <LangProvider>
            <Cursor />
            {children}
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
