import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    template: "%s | UTMCSSA",
    default: "UTMCSSA — 多伦多大学密西沙加中国学生学者联合会",
  },
  description:
    "多伦多大学密西沙加校区中国学生学者联谊会官方网站。了解我们的活动、团队和服务。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh" className={inter.variable}>
      <body className="min-h-screen font-sans flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
