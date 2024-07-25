import PentrisProviders from "@/components/layouts/PentrisProviders";
import TopLoader from "@/components/layouts/TopLoader";
import { PROD_HREF, PROD_IMAGES_HREF } from "@/lib/constants";
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
  title: "Pentris v1.4",
  description: "Tetris, but with the Pentominoes",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: PROD_HREF,
    title: "Pentris v1.4",
    siteName: "Pentris",
    description: "Tetris, but with the Pentominoes",
    images: [
      {
        url: `${PROD_IMAGES_HREF}/preview.png`,
        alt: "Pentris",
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
        <PentrisProviders>{children}</PentrisProviders>
      </body>
    </html>
  );
}
