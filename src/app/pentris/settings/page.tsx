import PentrisSettings from "@/components/pentris/PentrisSettings";
import { BASE_URL, PENTRIS_IMAGES_HREF } from "@/lib/constants";
import { type Metadata } from "next";

// OPG compliant metadata (https://ogp.me/)
export const metadata: Metadata = {
  title: "Pentris Settings",
  description: "Customize keybinds",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    title: "Pentris v2.0",
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

export default async function PentrisSettingsPage() {
  return <PentrisSettings />;
}
