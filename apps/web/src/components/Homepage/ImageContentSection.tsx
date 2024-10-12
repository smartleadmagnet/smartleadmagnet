import Image from 'next/image';

const ImageContentSection = () => {
  return (
    <div className="py-24 content-section-one"> {/* Adjusted section padding */}
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-6/12" >
            <div className="relative">
              {/* Main image */}
              <div className="content-image--mobile-width">
                <Image
                  src="https://placehold.co/600x400.png"
                  alt="alternative text"
                  width={500}
                  height={500}
                  className="object-contain" // Ensures the image fits within the container
                />
              </div>
            </div>
          </div>
          <div className="w-full lg:w-6/12 flex flex-col justify-center">
            <div className="content">
              <div className="mb-6">
                <h2 className="text-2xl md:text-5xl font-bold text-l5-secondary mb-5">
                  🧠 AI-Powered Lead Magnets
                </h2>
                <p className="mt-4 text-xl leading-[1.2]">
                  Our platform utilizes cutting-edge AI to generate powerful lead magnets that are relevant to your audience’s needs. Tailor your content with a few clicks, and let our AI do the heavy lifting.
                </p>
              </div>
              <div className="border-b border-gray-300 my-[40px]" /> {/* Divider */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="stat-single text-center">
                  <span className="block text-5xl font-bold text-cyan-500 mb-2">80%</span>
                  <span className="block text-2xl text-gray-600">Increase in Monthly Meetings</span>
                </div>
                <div className="stat-single text-center">
                  <span className="block text-5xl font-bold text-cyan-500 mb-2">$50M</span>
                  <span className="block text-2xl text-gray-600">Recurring Revenue Generated</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageContentSection;
