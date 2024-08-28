import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import QueryProvider from "./components/QueryProvider";
import { NextUIProvider } from "@nextui-org/react";

const inter = Noto_Sans_KR({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "여정",
  description: "당신의 즐거운 여행을 위해",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <NextUIProvider>
            <Header />
            {children}
          </NextUIProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
