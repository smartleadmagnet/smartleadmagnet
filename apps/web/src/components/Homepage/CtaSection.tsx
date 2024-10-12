import Image from 'next/image';

const CtaSection = () => {
  return (
    <div className="mb-20">
      <div className="container mx-auto px-30 bg-cyan-600 p-24 rounded relative">
        <div className="cta-shape">
          <Image
            src="/images/home/cta-shape.png"
            alt="Shape"
            width={140} // Adjust the width based on your image dimensions
            height={140} // Adjust the height based on your image dimensions
          />
        </div>
        <div className="relative flex flex-col items-center">

          <div className="text-center text-white">
            <h2 className="text-4xl md:text-5xl font-semibold leading-[1.5]">
              Ready to supercharge your lead generation?<br/>
              <span className="font-bold text-black"> Sign up now </span>
              and see how <br/>SmartLeadMagnet can transform your <br/>marketing strategy.
            </h2>
          </div>
          <div className="flex gap-4 mt-6">
            <a href="#"
               className="bg-white text-cyan-600 text-xl px-6 py-3 rounded-lg  hover:bg-gray-200 transition duration-300">
              Get Started
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CtaSection;
