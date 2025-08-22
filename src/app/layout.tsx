import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TALK - 모바일 메신저",
  description: "Next.js 기반 모바일 전용 메신저 앱",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className} suppressHydrationWarning={true}>
        <div className="min-h-screen bg-background">{children}</div>
      </body>
    </html>
  );
}
