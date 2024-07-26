import { BASE_URL, SPLIT_SECOND_IMAGES_HREF } from "@/lib/constants";
import { type Metadata } from "next";

// OPG compliant metadata (https://ogp.me/)
export const metadata: Metadata = {
  title: "Split Second",
  description: "Where time is non-linear...",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    title: "Split Second",
    siteName: "Split Second",
    description: "Where time is non-linear...",
    images: [
      {
        url: `${BASE_URL}${SPLIT_SECOND_IMAGES_HREF}/preview.png`,
        alt: "Split Second",
      },
    ],
  },
};

export default function SplitSecond() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <iframe
        src="https://splitsecond.surge.sh/"
        style={{ height: "100%", width: "100%", border: "none" }}
        title="Split Second"
      ></iframe>
    </div>
  );
}
