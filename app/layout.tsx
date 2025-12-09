import type { Metadata } from "next";
import { Poppins, Inter, Lexend } from "next/font/google";
import { Toaster } from "@/components/ui/sonner"
import "./globals.css";
import Header from "@/components/shared/nav/header";
import Footer from "@/components/shared/nav/footer";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/lib/theme-context";
import { getHeaderData, getFooterData, getCommonData } from "@/lib/api";
import { auth } from "@/auth"

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Market Makers",
  description: "Market Makers",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [commonData, headerData, footerData] = await Promise.all([
    getCommonData(),
    getHeaderData(),
    getFooterData(),
  ]);

  const session = await auth()

  return (
    <html lang="en" className={`${poppins.variable} ${lexend.variable}`}>
      <body className="antialiased">
        <SessionProvider session={session} >
          {/* <ThemeProvider > */}
          <Header
            commonProps={commonData}
            headerProps={headerData}
          />
          {children}
          <Footer
            commonProps={commonData}
            footerProps={footerData}
          />
          {/* </ThemeProvider> */}
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
