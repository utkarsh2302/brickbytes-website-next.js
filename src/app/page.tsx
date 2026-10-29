import BrandHero from "@/components/BrandHero";
import ClientLogos from "@/components/ClientLogos";
import LiveMapDemo from "@/components/LiveMapDemo";
import Problem from "@/components/Problem";
import Transformation from "@/components/Transformation";
import SalesComparison from "@/components/SalesComparison";
import ProductEcosystem from "@/components/ProductEcosystem";
import FeaturesBento from "@/components/FeaturesBento";
import ProductShowcase from "@/components/ProductShowcase";
import HowItWorks from "@/components/HowItWorks";
import UseCases from "@/components/UseCases";
import WhyBrickBytes from "@/components/WhyBrickBytes";
import Trust from "@/components/Trust";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <main>
        <BrandHero />
        <ClientLogos />
        <LiveMapDemo />
        <Problem />
        <Transformation />
        <SalesComparison />
        <ProductEcosystem />
        <FeaturesBento />
        <ProductShowcase />
        <HowItWorks />
        <UseCases />
        <WhyBrickBytes />
        <Trust />
        <About />
        <FAQ />
        <FinalCTA />
      </main>
    </div>
  );
}
