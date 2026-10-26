import type { Metadata } from "next";
import { IntroStage } from "@/components/IntroStage";

// Source for public/video/string-intro.mp4; not a public page.
export const metadata: Metadata = {
  title: "Intro render",
  robots: { index: false, follow: false },
};

export default function IntroRenderPage() {
  return <IntroStage />;
}
