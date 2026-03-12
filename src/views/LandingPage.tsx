import { HeroSection } from '@/components/landing/HeroSection';
import { MemorySection } from '@/components/landing/MemorySection';
import { HybridWorkflowsSection } from '@/components/landing/HybridWorkflowsSection';
import { OrbitalEcosystem } from '@/components/landing/OrbitalEcosystem';
import { ModeToggleSection } from '@/components/landing/ModeToggleSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { ActionDemoSection } from '@/components/landing/ActionDemoSection';
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';
import { PowerUserHandoff } from '@/components/landing/PowerUserHandoff';
import { PersonalAlphaSection } from '@/components/landing/PersonalAlphaSection';

export default function LandingPage() {
  return (
    <div className="relative overflow-hidden w-full">
      {/* Background Gradients: Light Mode (Subtle) vs Dark Mode (Deep) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-400/20 dark:bg-blue-600/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-[100px] -z-10" />

      <HeroSection />
      <MemorySection />
      <HybridWorkflowsSection />
      <OrbitalEcosystem />
      <ModeToggleSection />
      <FeaturesSection />
      <ActionDemoSection />
      <PersonalAlphaSection />
      <TestimonialsSection />
      <PowerUserHandoff />
    </div>
  );
}
