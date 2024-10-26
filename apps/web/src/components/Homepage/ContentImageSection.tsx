import Image from "next/image";

const ImageContentSection = () => {
  return (
    <div className="content-section-one py-16 md:py-24">
      {/* Adjusted padding for mobile and larger screens */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row-reverse">
          <div className="flex w-full items-center  justify-center sm:mb-5 lg:w-6/12">
            <div className="relative flex items-center justify-center">
              {/* Responsive image */}
              <Image
                src="/images/home/dnd.png"
                alt="SmatLeadMagnet Drag and Drop Builder"
                width={600} // Adjust width based on screen size
                height={400}
                className="w-full object-contain lg:pl-10"
                // Ensures the image is responsive
              />
            </div>
          </div>
          <div className="flex w-full flex-col justify-center lg:w-6/12">
            <div className="content">
              <div className="mb-6">
                <h2 className="text-l5-secondary mb-4 text-xl font-bold sm:text-2xl md:text-3xl lg:text-5xl">
                  🎨 Easy Drag-and-Drop Builder
                </h2>
                <p className="text-lg leading-[1.2] md:text-xl">
                  No coding skills? No problem. With SmartLeadMagnet’s intuitive drag-and-drop interface, you can create
                  and customize your lead magnets in minutes. Choose from a variety of pre-designed templates and
                  personalize them to match your brand’s look and feel.
                </p>
              </div>
              <div className="my-8 border-b border-gray-300" />
              {/* Divider */}
              <h3 className="text-l5-secondary text-xl font-bold md:text-2xl">⚡ Instant Integration</h3>
              <p className="mb-8 mt-4 text-lg leading-[1.2] md:text-xl">
                Once your lead magnet is ready, simply copy the generated iframe and integrate it into your website with
                ease. No complex setup or third-party tools required—just instant results.
              </p>
              <h3 className="text-l5-secondary text-xl font-bold md:text-2xl">
                📈 Boost Conversions with Personalization
              </h3>
              <p className="mt-4 text-lg leading-[1.2] md:text-xl">
                SmartLeadMagnet allows you to add personalized touches to your lead magnets, ensuring higher engagement
                and better conversion rates. Use custom prompts to make each magnet unique and appealing to your
                audience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageContentSection;
