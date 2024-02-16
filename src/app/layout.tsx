import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Theme from "./theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Alper Gürel",
  description:
    "Bir developer portfoyü. Yazılım, hayat ve kişisel gelişim ile alakalı konular burada!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className + " bg-background text-slate-300 font-body"}
      >
        <Theme>{children}</Theme>
      </body>
    </html>
  );
}
