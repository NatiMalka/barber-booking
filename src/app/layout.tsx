import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import { Noto_Sans_Hebrew } from "next/font/google";

const notoSansHebrew = Noto_Sans_Hebrew({
  weight: ['300', '400', '500', '700'],
  variable: "--font-noto-sans-hebrew",
  subsets: ["hebrew", "latin"],
});

export const metadata: Metadata = {
  title: "מספרת בר ארזי - מערכת זימון תורים",
  description: "מערכת זימון תורים למספרת בר ארזי - עיצוב שיער",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${notoSansHebrew.variable} antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
