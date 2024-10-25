import Image from "next/image";

const HeroSection: React.FC = () => {
  return (
    <div className="hero-section relative  pb-10 text-center" id="hero">
      <Image className="hero-shape shape-1" src="/images/home/magnet.svg" alt="image shape" width={100} height={100} />
      <Image className="hero-shape shape-2" src="/images/home/magnify.svg" alt="image shape" width={100} height={100} />
      <Image className="hero-shape shape-3" src="/images/home/pen.svg" alt="image shape" width={100} height={100} />

      <div className="container mx-auto px-10">
        <div className="flex flex-wrap">
          <div className="mx-auto w-full">
            <div className="py-2">
              <div className="mb-6">
                <p className="text-lg text-gray-500">Having trouble generating leads from your website?</p>

                <h1 className="hero-heading max-w-[1000px] mx-auto">
                  <span>
                    Boost your website traffic in the first month with customized
                    <br />
                    <span className="rounded-md bg-[#BEF8FC] px-2">Lead Magnets</span>
                  </span>
                </h1>

                <p className="mt-4 text-lg">
                  Transform your website into a powerful lead generation machine! With simple steps, you can create a
                  lead magnet that will help you generate more leads and grow your business.
                </p>
              </div>
              <div
              className="iframe-container"
              >
                <iframe
                  src="https://app.supademo.com/embed/cm2n1nipb05s6k69dpnd4bolh?embed_v=2"
                  loading="lazy"
                  title="Smartleadmagnet Demo"
                  allow="clipboard-write"
                  allowFullScreen
                  
                  
                  
                ></iframe>
              </div>
              {/*<Image*/}
              {/*  className="w-full"*/}
              {/*  src="/images/home/hero-image.png"*/}
              {/*  alt="alternative text"*/}
              {/*  layout="responsive"*/}
              {/*  width={700}*/}
              {/*  height={475}*/}
              {/*/>*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
