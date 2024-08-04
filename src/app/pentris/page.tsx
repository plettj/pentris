import PentrisProviders from "@/components/layouts/PentrisProviders";
import Pentris from "@/components/pentris/Pentris";
import PentrisMobile from "@/components/pentris/PentrisMobile";
import { BASE_URL, PENTRIS_IMAGES_HREF } from "@/lib/constants";
import { type Metadata } from "next";

// OPG compliant metadata (https://ogp.me/)
export const metadata: Metadata = {
  title: "Pentris v1.5",
  description: "Tetris, but with the Pentominoes",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    title: "Pentris v1.5",
    siteName: "Pentris",
    description: "Tetris, but with the Pentominoes",
    images: [
      {
        url: `${BASE_URL}${PENTRIS_IMAGES_HREF}/preview.png`,
        alt: "Pentris",
      },
    ],
  },
};

export default async function PentrisPage() {
  return (
    <PentrisProviders>
      <PentrisMobile />
      <Pentris />
    </PentrisProviders>
  );
}
