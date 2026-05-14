import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Luxury Timepiece | The Pinnacle of Horology",
  description: "Discover the impossible. A celestial masterpiece of micro-engineering defying gravity in multiple dimensions.",
  openGraph: {
    title: "Luxury Timepiece | Eternity",
    description: "Discover the impossible.",
    images: [{ url: "/sequence/frame_100_delay-0.042s.jpg" }],
  },
};

import SmoothScroller from "@/components/SmoothScroller";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${cormorant.variable} font-sans antialiased bg-black`}
      >
        <SmoothScroller>
          {children}
        </SmoothScroller>
      </body>
    </html>
  );
}
