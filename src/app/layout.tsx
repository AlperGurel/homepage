import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Theme from "./theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jörnal",
  description: "Hayata ve yazılıma dair paylaşımlar yaptığım bir ortam.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-slate-50"}>
        <Theme>{children}</Theme>
      </body>
    </html>
  );
}
