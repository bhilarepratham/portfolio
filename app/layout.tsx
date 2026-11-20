import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pratham Bhilare | Portfolio",
  description: "Pratham Bhilare: MS Management of Technology at ASU. Project and product management, operations, and analytics. Selected projects, experience, and research.",
  metadataBase: new URL("https://prathambhilare.vercel.app"),
  openGraph: {
    title: "Pratham Bhilare | Project & Product Manager",
    description: "Selected projects, experience, and research in project management, product strategy, and operations.",
    url: "https://prathambhilare.vercel.app",
    siteName: "Pratham Bhilare",
    images: [{ url: "/assets/portrait.jpeg", alt: "Portrait of Pratham Bhilare" }],
    type: "website",
  },
  twitter: { card: "summary", title: "Pratham Bhilare | Project & Product Manager" },
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
