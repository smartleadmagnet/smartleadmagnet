import HeroSection from "@/components/Homepage/Hero";
import BrandSection from "@/components/Homepage/BrandSection";
import FeatureSection from "@/components/Homepage/FeatureSection";
import ImageContentSection from "@/components/Homepage/ImageContentSection";
import ContentImageSection from "@/components/Homepage/ContentImageSection";
import ServiceSection from "@/components/Homepage/ServiceSection";
import ClientSection from "@/components/Homepage/ClientSection";
import AccordionSection from "@/components/Homepage/AccordionSection";
import CtaSection from "@/components/Homepage/CtaSection";

export default async function Home() {
  return (
    <div className="flex size-full  flex-col">
      <HeroSection />
      <BrandSection />
      <FeatureSection />
      <ImageContentSection />
      <ContentImageSection />
      <ServiceSection />
      <ClientSection />
      <AccordionSection />
      <CtaSection />
    </div>
  );
}
