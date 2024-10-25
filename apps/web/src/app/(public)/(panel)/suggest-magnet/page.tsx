import MagnetSuggestionForm from '@/components/MagnetSuggestionForm';
import { getSessionUser } from '@/services/user';

export default async function SuggestMagnetPage() {
  const user = await getSessionUser();
  return (
    <div className="flex flex-col items-center justify-center py-4 bg-gray-50 hero-section">
      <h1 className="hero-heading text-center mb-5 text-3xl sm:text-4xl lg:text-5xl">
        Enter Your Website URL <br /> And Get Best <br />
        <span className="rounded-md bg-[#BEF8FC] px-2">Lead Magnet</span>
      </h1>
      <p className="text-xl sm:text-2xl mb-4 text-center">
        Find what you're looking for below
      </p>
      <MagnetSuggestionForm user={user} />
    </div>
  );
}
