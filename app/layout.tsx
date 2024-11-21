import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MP5",
  description: "Mini Project 5 for CS391",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
