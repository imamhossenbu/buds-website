import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { RecentEvents } from "@/components/home/RecentEvents";
import { RecentNotices } from "@/components/home/RecentNotices";

export const metadata = {
  title: "Home | Buds Debating Society",
  description: "The premier debating society dedicated to fostering critical thinking, eloquence, and intellectual discourse.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-bg">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <RecentEvents />
      <RecentNotices />
      <Footer />
    </main>
  );
}
