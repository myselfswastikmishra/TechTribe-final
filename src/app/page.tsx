import type { Metadata } from "next";
import { HomePageContent } from "@/components/HomePageContent";

export const metadata: Metadata = {
  title: "Tech Tribe - Community & Freelance Agency",
  description: "A vibrant community for tech enthusiasts and a freelance agency for building exceptional digital solutions. Explore our projects, events, and services.",
};

export default function Home() {
  return <HomePageContent />;
}
