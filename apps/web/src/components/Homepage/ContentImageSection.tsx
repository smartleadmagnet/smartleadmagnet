import Image from "next/image";

const ImageContentSection = () => {
  return (
    <div className="content-section-one py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row-reverse">
          <div className="flex w-full items-center justify-center sm:mb-5 lg:w-6/12">
            <div className="relative flex items-center justify-center">
              <Image
                src="/images/home/dnd.png"
                alt="Smart Lead Magnet's Drag-and-Drop Lead Generation Builder"
                width={600}
                height={400}
                className="w-full object-contain lg:pl-10"
              />
            </div>
          </div>
          <div className="flex w-full flex-col justify-center lg:w-6/12">
            <div className="content">
              <div className="mb-6">
                <h2 className="text-l5-secondary mb-4 text-xl font-bold sm:text-2xl md:text-3xl lg:text-5xl">
                  🎨 Drag & Drop Lead Generation Builder
                </h2>
                <p className="text-lg leading-[1.2] md:text-xl">
                  Create your perfect lead generation website in minutes! Smart Lead Magnet's 
                  drag-and-drop builder lets you design professional lead magnets without any coding. 
                  Perfect for marketing and lead generation teams who want to focus on results, not technical setup.
                </p>
              </div>
              <div className="my-8 border-b border-gray-300" />
              
              <h3 className="text-l5-secondary text-xl font-bold md:text-2xl">
                ⚡ Point, Click, Generate Leads
              </h3>
              <p className="mb-8 mt-4 text-lg leading-[1.2] md:text-xl">
                Just drag, drop, and watch your landing site come alive! Our lead generation service 
                includes pre-built templates and lead forms that you can customize with a few clicks. 
                From business leads to qualified leads - we make the process simple.
              </p>

              <h3 className="text-l5-secondary text-xl font-bold md:text-2xl">
                📈 Customize Everything, No Coding Required
              </h3>
              <p className="mt-4 text-lg leading-[1.2] md:text-xl">
                Smart Lead Magnet's drag-and-drop tools help you create lead generation sites that match your brand. 
                Customize colors, layouts, and forms while our AI lead generator optimizes everything for 
                conversions. It's website lead gen made easy - whether you're building your first lead magnet 
                or scaling your leads marketing efforts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageContentSection;
