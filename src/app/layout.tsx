import TopLoader from "@/components/layouts/TopLoader";
import { type Metadata } from "next";
import { Silkscreen } from "next/font/google";
import "./globals.css";
import { PROD_HREF } from "@/lib/constants";

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
  title: "Pentris v1.3",
  description: "Tetris, but with the Pentominoes",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: PROD_HREF,
    title: "Pentris v1.3",
    siteName: "Pentris",
    description: "Tetris, but with the Pentominoes",
    images: [
      {
        url: `${PROD_HREF}/src/images/public/favicon.png`, // FIXME: Host a banner image publicly.
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
        {children}
      </body>
    </html>
  );
}
