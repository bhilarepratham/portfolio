import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pratham Bhilare | Portfolio",
  description: "A refined dark portfolio website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}