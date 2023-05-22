import "./globals.css";
import { Roboto_Flex, Bai_Jamjuree } from "next/font/google";
import { cookies } from "next/headers";

import { SignIn } from "@/components/SignIn";
import { Profile } from "@/components/Profile";
import { Hero } from "@/components/Hero";
import { Copyright } from "@/components/Copyright";

const roboto = Roboto_Flex({ subsets: ["latin"], variable: "--font-roboto" });
const baiJamJuree = Bai_Jamjuree({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-bai-jamjuree",
});

export const metadata = {
  title: "NLW Spacetime",
  description:
    "Uma cápsula do tempo construída com React, Next.js, TailwindCSS e TypeScript.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = cookies().has("token");

  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${baiJamJuree.variable} font-sans bg-gray-900 text-gray-100`}
      >
        <main className="grid grid-cols-2 min-h-screen">
          {/* Left */}
          <div className=" flex flex-col items-start justify-between px-28 py-16 relative overflow-hidden border-r border-white/10 bg-stars bg-cover">
            {/* Blur */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 h-[288px] w-[526px] bg-purple-700 rounded-full opacity-50 blur-full" />
            {/* Stripes */}
            <div className="absolute right-2 top-0 bottom-0 w-2 bg-stripes" />

            {isAuthenticated ? <Profile /> : <SignIn />}
            <Hero />
            <Copyright />
          </div>

          {/* Right */}
          <div className="flex flex-col bg-stars bg-cover max-h-screen overflow-y-scroll">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
