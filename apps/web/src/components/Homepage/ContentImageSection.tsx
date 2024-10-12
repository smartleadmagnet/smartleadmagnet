import Image from "next/image";

const ImageContentSection = () => {
  return (
    <div className="content-section-one py-24">
      {" "}
      {/* Adjusted section padding */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse flex-wrap lg:flex-row-reverse">
          <div className="w-full lg:w-6/12">
            <div className="relative">
              {/* Main image */}
              <div className="flex flex-col items-end justify-end">
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
          <div className="flex w-full flex-col justify-center lg:w-6/12">
            <div className="content">
              <div className="mb-6">
                <h2 className="text-l5-secondary mb-5 text-2xl font-bold md:text-5xl">🎨 Easy Drag-and-Drop Builder</h2>
                <p className="mt-4 text-xl leading-[1.2]">
                  No coding skills? No problem. With SmartLeadMagnet’s intuitive drag-and-drop interface, you can create
                  and customize your lead magnets in minutes. Choose from a variety of pre-designed templates and
                  personalize them to match your brand’s look and feel.
                </p>
              </div>
              <div className="my-[40px] border-b border-gray-300" />
              {/* Divider */}
              <h3 className="text-l5-secondary text-2xl font-bold">⚡ Instant Integration</h3>
              <p className="mb-[40px] mt-4 text-xl leading-[1.2]">
                Once your lead magnet is ready, simply copy the generated iframe and integrate it into your website with
                ease. No complex setup or third-party tools required—just instant results.
              </p>
              <h3 className="text-l5-secondary text-2xl font-bold">📈 Boost Conversions with Personalization</h3>
              <p className="mt-4 text-xl leading-[1.2]">
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
