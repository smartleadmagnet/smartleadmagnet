import MagnetSuggestionForm from "@/components/MagnetSuggestionForm";
import { getSessionUser } from "@/services/user";
import getSeo from "@/lib/seo";

export function generateMetadata() {
  return getSeo(
    {
      title: "SmartLeadMagnet - Generate Lead Magnet From Website URL",
      description:
        "Enter your website URL and get the best lead magnet for your website. Find what you're looking for below.",
    },
    "suggest-magnet"
  );
}

export default async function SuggestMagnetPage() {
  const user = await getSessionUser();
  return (
    <div className="hero-section flex flex-col items-center justify-center bg-gray-50 py-4">
      <h1 className="hero-heading mb-5 text-center text-3xl sm:text-4xl lg:text-5xl">
        Enter Your Website URL <br /> And Get Best <br />
        <span className="rounded-md bg-[#BEF8FC] px-2">Lead Magnet</span>
      </h1>
      <p className="mb-4 text-center text-xl sm:text-2xl">Find what you're looking for below</p>
      <MagnetSuggestionForm user={user} />
    </div>
  );
}
