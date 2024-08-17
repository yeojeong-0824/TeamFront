import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import QueryProvider from "./components/QueryProvider";
import { NextUIProvider } from "@nextui-org/react";

const inter = Noto_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "여정",
  description: "여행에 필요한 정보를 한 곳에서!",
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
