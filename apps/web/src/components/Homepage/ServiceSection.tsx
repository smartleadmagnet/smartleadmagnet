import Link from "next/link";
import { getTopLeadMagnets } from "@/actions/lead-magnet";
import LeadMagnetCard from "@/components/LeadMagnetCard";
import { getSessionUser } from "@/services/user";

const ServiceSection: React.FC = async () => {
  const topLeadMagnets = await getTopLeadMagnets(10);
  const user = await getSessionUser();

  return (
    <div className="service-section bg-gradient-to-r from-cyan-500 to-blue-600 py-16" id="services">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="mb-[80px] text-5xl font-bold text-white">
            Take a look at some of our most commonly used lead magnets in action.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {topLeadMagnets.map((magnet) => (
            <LeadMagnetCard key={magnet.id} leadMagnet={magnet} user={user} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/templates"
            className="rounded-lg bg-cyan-900 px-10 py-5 text-xl font-bold text-white transition duration-300 hover:bg-gray-900"
          >
            Browse All Templates
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceSection;
