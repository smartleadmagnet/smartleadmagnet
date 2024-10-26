import HeroSection from "@/components/Homepage/Hero";
import FeatureSection from "@/components/Homepage/FeatureSection";
import ContentImageSection from "@/components/Homepage/ContentImageSection";
import ServiceSection from "@/components/Homepage/ServiceSection";
import ClientSection from "@/components/Homepage/ClientSection";
import AccordionSection from "@/components/Homepage/AccordionSection";
import HowItWorksSection from "@/components/Homepage/HowItWorksSection";
import CtaSection from "@/components/Homepage/CtaSection";
import getSeo from "@/lib/seo";
import { WebPageJsonLd, FAQPageJsonLd, ProductJsonLd, OrganizationJsonLd, BreadcrumbJsonLd } from "next-seo";
import faq from "@/data/faq.json";
import testimonial from "@/data/testimonial.json";
import { AggregateRating } from "next-seo/lib/types";
import { Suspense } from "react";
import SocialProofModal from "@smartleadmagnet/ui/components/SocialProofModal";

const title = "SmartLeadMagnet: AI Lead Magnets to Boost Website Traffic";
const description = `Drive more traffic to your website with SmartLeadMagnet’s AI-powered lead magnets. Capture leads, grow your audience, and boost your business easily.`;

const aggRating: AggregateRating = {
  ratingValue: "4.8",
  reviewCount: testimonial?.length?.toString(),
  ratingCount: "120",
  bestRating: "5",
  worstRating: "4",
};

export function generateMetadata() {
  return getSeo({
    title,
    description,
  });
}

// export const dynamic = "force-static";

export default async function Page() {
  return (
    <div className="flex size-full flex-col">
      <WebPageJsonLd
        useAppDir
        id="https://smartleadmagnet.com/"
        url="https://smartleadmagnet.com/"
        title={<title></title>}
        description={description}
        images={[
          "https://smartleadmagnet.com/og-image.png",
          "https://smartleadmagnet.com/images/logo/logo.png",
          "https://smartleadmagnet.com/lead-magnet-01.png",
          "https://smartleadmagnet.com/lead-magnet-02.png",
        ]}
        inLanguage="en-US"
      />
      <FAQPageJsonLd
        useAppDir
        mainEntity={faq.map((item) => ({
          questionName: item.question,
          acceptedAnswerText: item.answer,
        }))}
      />
      <OrganizationJsonLd
        useAppDir
        id="https://smartleadmagnet.com/"
        url="https://smartleadmagnet.com/"
        name="SmartLeadMagnet"
        logo="https://smartleadmagnet.com/assets/Logo.png"
        sameAs={[
          "https://www.facebook.com/SmartLeadMagnet",
          "https://www.twitter.com/SmartLeadMagnet",
          "https://www.linkedin.com/company/SmartLeadMagnet",
        ]}
      />
      <ProductJsonLd
        useAppDir
        description={description}
        id={title}
        productName="SmartLeadMagnet"
        images={[
          "https://smartleadmagnet.com/og-image.png",
          "https://smartleadmagnet.com/assets/Logo.png",
          "https://smartleadmagnet.com/features/drag-and-drop.png",
          "https://smartleadmagnet.com/features/ai-powered.png",
          "https://smartleadmagnet.com/features/lead-capture.png",
          "https://smartleadmagnet.com/assets/pricing/01.png",
          "https://smartleadmagnet.com/assets/pricing/02.png",
          "https://smartleadmagnet.com/assets/pricing/03.png",
        ]}
        reviews={testimonial?.map((t) => ({
          author: t.name,
          datePublished: "2024-01-06T03:37:40Z",
          reviewBody: t.description,
          reviewRating: {
            bestRating: "5",
            ratingValue: "5",
            worstRating: "1",
          },
        }))}
        aggregateRating={aggRating}
      />
      <BreadcrumbJsonLd
        useAppDir
        itemListElements={[
          {
            position: 1,
            name: "Home",
            item: "https://smartleadmagnet.com/",
          },
        ]}
      />

      <HeroSection />
      <FeatureSection />
      <ContentImageSection />
      <ServiceSection />
      <ClientSection />
      <AccordionSection />
      <HowItWorksSection />
      <CtaSection />
      <Suspense fallback={<div>Loading...</div>}>
        <SocialProofModal />
      </Suspense>
    </div>
  );
}
