import Link from "next/link";
const CtaSection = () => {
  return (
    <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="mb-6 text-center text-3xl font-bold text-gray-800 lg:text-4xl">
            Need help finding the right lead magnet?
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-center text-base text-gray-600 lg:mb-12 lg:text-lg">
            No worries! We've got you covered. Browse our collection of lead magnet templates or suggest a magnet, and we'll
          </p>
          <div className="flex flex-col items-center justify-center space-y-4 md:flex-row md:space-x-4 md:space-y-0">
            <Link
              href="/suggest-a-magnet"
              className="w-full rounded border border-cyan-500 bg-cyan-500 px-6 py-4 text-center text-lg font-bold text-white hover:border-cyan-600 hover:bg-cyan-600 hover:text-white md:w-auto"
            >
              Suggest me a Magnet
            </Link>
            <Link
              href="/templates/all"
              className="w-full rounded border border-cyan-500 bg-white px-6 py-4 text-center text-lg font-bold text-cyan-500 hover:border-cyan-600 hover:bg-cyan-600 hover:text-white md:w-auto"
            >
              Browse Templates
            </Link>
          </div>
        </div>
      </div>
  );
};

export default CtaSection;
