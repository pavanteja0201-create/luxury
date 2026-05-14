"use client";

import Navbar from "@/components/Navbar";
import Collection from "@/components/Collection";
import dynamic from "next/dynamic";

const HeroWatchViewer = dynamic(() => import("@/components/HeroWatchViewer"), { ssr: false });
const ScrollExperience = dynamic(() => import("@/components/ScrollExperience"), { ssr: false });

export default function Home() {
  return (
    <main className="bg-black text-white selection:bg-white/30 selection:text-white">
      <Navbar />
      <HeroWatchViewer />
      <ScrollExperience />
      <Collection />
    </main>
  );
}
