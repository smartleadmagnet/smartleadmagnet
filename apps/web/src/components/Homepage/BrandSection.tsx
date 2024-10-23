import Image from "next/image";
import Marquee from "@smartleadmagnet/ui/components/ui/Marquee";
const BrandSection = () => {
  return (
    <div className="brand-section py-12">
      
        <div className="brands-wrapper-inner">
          <div className="brand-heading-2 mb-8">
            <h3 className="brand-heading__title text-center text-2xl font-bold">
              Trusted by the most innovative companies worldwide
            </h3>
          </div>
          <div className="brands-wrapper flex flex-wrap justify-center space-x-20">
          <Marquee pauseOnHover className="[--duration:20s]">
            {Array.from(Array(5)).map((_, i) => (
              <div className="single-brand-2" key={i}>
                <Image
                  src={`/images/home/brand-${i + 1}.png`}
                  alt="brand-logo"
                  width={150}
                  height={50}
                  layout="intrinsic"
                  className="mb-10 object-contain mx-5"
                />
              </div>
            ))}
            </Marquee>
          </div>
        </div>
      
    </div>
  );
};

export default BrandSection;
