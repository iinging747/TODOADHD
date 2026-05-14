import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "정신차려 이 각박한 세상에서, 그렇게 안 살기 프로젝트",
  description: "ADHD 사용자를 위한 AI 세컨드 브레인과 인생 체크메이트 시스템"
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#f7f8fc"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
