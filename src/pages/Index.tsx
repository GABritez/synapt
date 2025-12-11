import { LandingNavigation } from "@/components/landing/LandingNavigation";
import { HeroSection } from "@/components/landing/HeroSection";
import { InteractiveDemo } from "@/components/landing/InteractiveDemo";
import { CommunitySection } from "@/components/landing/CommunitySection";
import { CrossPlatformSection } from "@/components/landing/CrossPlatformSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background antialiased overflow-x-hidden selection:bg-primary selection:text-primary-foreground scroll-smooth">
      <LandingNavigation />
      <HeroSection />
      <InteractiveDemo />
      <CommunitySection />
      <CrossPlatformSection />
      <PricingSection />
      <Footer />
    </div>
  );
};

export default Index;
