import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import QueryProvider from "./components/QueryProvider";
import { NextUIProvider } from "@nextui-org/react";
import Footer from "./components/Footer";
import Script from "next/script";

const inter = Noto_Sans_KR({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "여정",
  description: "당신의 즐거운 여행을 위해",
};

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
        integrity="sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <body className={inter.className}>
        <QueryProvider>
          <NextUIProvider>
            <Header />
            <div>{children}</div>
            <Footer />
          </NextUIProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
