import { Yahtzee } from "@/components/yahtzee/Yahtzee";
import { BASE_URL } from "@/lib/constants";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Mini Yahtzee Roller",
  description: "Roll and keep dice, Yahtzee-style.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${BASE_URL}/yahtzee`,
    title: "Mini Yahtzee Roller",
    siteName: "Yahtzee",
    description: "Roll and keep dice, Yahtzee-style.",
  },
};

export default function YahtzeePage() {
  return <Yahtzee />;
}
