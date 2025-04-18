import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header/Header";
import QueryProviders from "@/provider/queryProvider";

export const metadata: Metadata = {
  title: "이력서 컨설팅",
  description: "이력서 컨설팅 후기 모음",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <QueryProviders>
          <div className="main">
            <div className="view">
              <div>
                <Header />
                <div className="content">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </QueryProviders>
      </body>
    </html>
  );
}
