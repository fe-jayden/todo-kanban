import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import RootProvider from "./provider";

const DMSans = DM_Sans({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo list project",
  description: "Todo list project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RootProvider>
      <html lang="en">
        <body className={DMSans.className}>{children}</body>
      </html>
    </RootProvider>
  );
}
