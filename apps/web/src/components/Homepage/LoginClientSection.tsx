import React from "react";
import Marquee from "@smartleadmagnet/ui/components/ui/marquee";
import testimonial from "@/data/testimonial.json";
import Image from "next/image";

const firstRow = testimonial.slice(0, testimonial.length / 2);
const secondRow = testimonial.slice(testimonial.length / 2);

const ReviewCard = ({
  imageSrc,
  name,
  designation,
  description,
}: {
  imageSrc: string;
  name: string;
  designation: string;
  description: string;
}) => {
  return (
    <div className="mx-auto max-w-md rounded-lg bg-white p-4 shadow-lg relative z-20">
      <div className="flex items-start">
        <Image className="h-12 w-12 rounded-full" width={20} height={20} src={imageSrc} alt={name} />
        <div className="ml-3 flex-1">
          <div className="flex justify-between">
            <div>
              <span className="font-semibold text-gray-900">{name}</span>
              <span className="text-gray-500">{designation}</span>
            </div>
          </div>
          <p className="mt-2 text-gray-800">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default function LoginClientSection() {
  return (
    <>
      <div className="relative z-20 flex flex-col items-center justify-center overflow-hidden ">
        <h2 className="text-4xl text-white text-center mb-4">Love from Our Valued Customers ❤️</h2>
        <div className="relative">
          {/* Marquee for text testimonials */}
          <Marquee pauseOnHover className="[--duration:20s]">
            {firstRow.map((review, index) => (
              <ReviewCard key={index} {...review} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:50s]">
            {secondRow.map((review, index) => (
              <ReviewCard key={index} {...review} />
            ))}
          </Marquee>
       </div>
      </div>
    </>
  );
}
