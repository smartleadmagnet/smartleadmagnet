import Link from "next/link";
import Image from "next/image";

const HeroSection: React.FC = () => {
  return (
    <div className="relative hero-section text-center" id="hero">
      <Image
        className="hero-shape shape-1"
        src="/images/home/magnet.svg"
        alt="image shape"
        width={100}
        height={100}
      />
      <Image
        className="hero-shape shape-2"
        src="/images/home/magnify.svg"
        alt="image shape"
        width={100}
        height={100}
      />
      <Image
        className="hero-shape shape-3"
        src="/images/home/pen.svg"
        alt="image shape"
        width={100}
        height={100}
      />

      <div className="container mx-auto px-10">
        <div className="flex flex-wrap">
          <div className="w-full md:w-9/12 mx-auto">
            <div className="py-12">
              <div className="mb-6">
                <h1 className="hero-heading">
                  <span>
                    Get AI-Powered <br/>
                    <span className="bg-[#BEF8FC] rounded-md px-2">
                      Lead Magnets
                    </span>{" "}
                    Now and Skyrocket Your Conversions
                  </span>
                </h1>

                <p className="mt-4 text-lg">
                  Boost your conversions with intelligent, customizable lead
                  magnets that capture your audience’s attention and grow your
                  business.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row justify-center sm:space-x-4 space-y-4 sm:space-y-0 mb-10">
                <Link
                  className="bg-cyan-500 text-white font-bold py-3 px-6 rounded-lg text-xl hover:bg-cyan-600 sm:py-4 sm:px-8 sm:text-2xl text-center"
                  href="/app"
                >
                  Build Magnet Now
                </Link>
                <Link
                  href="#"
                  className="border-2 border-cyan-500 text-cyan-500 font-bold py-3 px-6 rounded-lg text-xl hover:bg-cyan-500 hover:text-white sm:py-4 sm:px-8 sm:text-2xl text-center"
                >
                  See How It Works
                </Link>
              </div>

              <Image
                className="w-full"
                src="/images/home/hero-image.png"
                alt="alternative text"
                layout="responsive"
                width={700}
                height={475}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
