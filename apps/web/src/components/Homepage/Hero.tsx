import Link from "next/link";
import Image from "next/image";

const HeroSection: React.FC = () => {
  return (
    <div className="hero-section relative text-center" id="hero">
      <Image className="hero-shape shape-1" src="/images/home/magnet.svg" alt="image shape" width={100} height={100} />
      <Image className="hero-shape shape-2" src="/images/home/magnify.svg" alt="image shape" width={100} height={100} />
      <Image className="hero-shape shape-3" src="/images/home/pen.svg" alt="image shape" width={100} height={100} />

      <div className="container mx-auto px-10">
        <div className="flex flex-wrap">
          <div className="mx-auto w-full md:w-9/12">
            <div className="py-12">
              <div className="mb-6">
                <p className="text-lg text-gray-500">Having trouble generating leads from your website?</p>

                <h1 className="hero-heading">
                  <span>
                    Boost your website traffic in the first month with customized
                    <br />
                    <span className="rounded-md bg-[#BEF8FC] px-2">Lead Magnets</span>
                  </span>
                </h1>

                <p className="mt-4 text-lg">
                Transform your website into a powerful lead generation machine! With simple steps, you can create a lead magnet that will help you generate more leads and grow your business.
                </p>
              </div>
              <div className="mb-10 flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Link
                  className="rounded-lg bg-cyan-500 px-6 py-3 text-center text-xl font-bold text-white hover:bg-cyan-600 sm:px-8 sm:py-4 sm:text-2xl"
                  href="/app"
                >
                  Build Magnet Now
                </Link>
                <Link
                  href="#"
                  className="rounded-lg border-2 border-cyan-500 px-6 py-3 text-center text-xl font-bold text-cyan-500 hover:bg-cyan-500 hover:text-white sm:px-8 sm:py-4 sm:text-2xl"
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
