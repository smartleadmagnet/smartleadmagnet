import Image from "next/image";

const CtaSection = () => {
  return (
    <div className="mb-20">
      <div className="px-30 container relative mx-auto rounded bg-cyan-600 p-24">
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
            <h2 className="text-4xl font-semibold leading-[1.5] md:text-5xl">
              Ready to supercharge your lead generation?
              <br />
              <span className="font-bold text-black"> Sign up now </span>
              and see how <br />
              SmartLeadMagnet can transform your <br />
              marketing strategy.
            </h2>
          </div>
          <div className="mt-6 flex gap-4">
            <a
              href="#"
              className="rounded-lg bg-white px-6 py-3 text-xl text-cyan-600  transition duration-300 hover:bg-gray-200"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CtaSection;
