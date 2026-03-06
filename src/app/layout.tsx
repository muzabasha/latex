import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";
import { Sidebar } from "@/components/Sidebar";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Application of LaTeX Skills in Research Publications",
  description: "A comprehensive workshop for agriculture research scholars to master LaTeX.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased overflow-x-hidden`}>
        <Providers>
          <Navbar />
          <div className="flex w-full min-h-screen">
            <Sidebar />
            <main className="flex-1 w-full min-h-screen">
              {children}
            </main>
          </div>
          <BottomNav />
        </Providers>
      </body>
    </html>
  );
}
