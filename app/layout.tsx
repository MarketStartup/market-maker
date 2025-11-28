import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner"
import "./globals.css";
import Header from "@/components/shared/nav/header";
import Footer from "@/components/shared/nav/footer";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/lib/theme-context";
import { getHeaderData, getFooterData } from "@/lib/api";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Market Makers",
  description: "Market Makers",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headerData = await getHeaderData();
  const footerData = await getFooterData();

  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <head>
        <script
          async
          crossOrigin="anonymous"
          src="https://tweakcn.com/live-preview.min.js"
        />
      </head>
      <body className="antialiased">
        <SessionProvider>
          {/* <ThemeProvider > */}
          <Header props={headerData} />
          {children}
          <Footer props={footerData} />
          {/* </ThemeProvider> */}
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
