import TopLoader from "@/components/layouts/TopLoader";
import { BASE_URL } from "@/lib/constants";
import { type Metadata } from "next";
import { Silkscreen } from "next/font/google";
import "./globals.css";

// Potential Font Choices:
// Silkscreen: https://fonts.google.com/specimen/Silkscreen
// Pixelify: https://fonts.google.com/specimen/Pixelify+Sans
// Tourney: https://fonts.google.com/specimen/Tourney

const fontSans = Silkscreen({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
});

// OPG compliant metadata (https://ogp.me/)
export const metadata: Metadata = {
  title: "plett.fun",
  description: "A tiny website by Josiah.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    title: "plett.fun",
    siteName: "plett.fun",
    description: "A tiny website by Josiah.",
    images: [
      {
        url: `${BASE_URL}/static/home/preview.png`,
        alt: "Game list preview",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fontSans.variable} suppressHydrationWarning>
      <body className="flex flex-col h-screen overflow-hidden bg-background font-sans antialiased">
        <TopLoader />
        {children}
      </body>
    </html>
  );
}
