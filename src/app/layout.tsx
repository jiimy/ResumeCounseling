import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header/Header";
import QueryProviders from "@/provider/queryProvider";
import CookiesRootProvider from "@/util/cookieProvider";

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
          <CookiesRootProvider>
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
          </CookiesRootProvider>
        </QueryProviders>
      </body>
    </html>
  );
}
