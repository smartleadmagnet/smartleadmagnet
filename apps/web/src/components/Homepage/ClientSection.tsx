import React from "react";
import Marquee from "@smartleadmagnet/ui/components/ui/marquee";
import testimonial from "@/data/testimonial.json";
import Image from "next/image";

const firstRow = testimonial.slice(0, testimonial.length / 2);
const secondRow = testimonial.slice(testimonial.length / 2);

const ReviewCard = ({
  imageSrc,
  rating,
  name,
  designation,
  description,
}: {
  imageSrc: string;
  rating: number;
  name: string;
  designation: string;
  description: string;
}) => {
  return (
    <div className="mx-auto max-w-md rounded-lg bg-white p-4 shadow-lg">
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

const VideoTestimonial = ({ videoSrc, title }: { videoSrc: string; title: string }) => {
  return (
    <div className="mx-auto mb-4 max-w-[300px] overflow-hidden rounded-lg">
      <video className="aspect-video h-auto w-full" controls src={videoSrc}>
        Your browser does not support the video tag.
      </video>
      <h3 className="mt-5 text-center text-xl text-white">{title}</h3>
    </div>
  );
};

export default function ClientSection() {
  return (
    <>
      <div className="bg-background relative flex flex-col items-center justify-center overflow-hidden rounded-lg border py-16 md:shadow-xl">
        {/* Title */}
        <h2 className="mb-6 text-center text-5xl font-bold text-gray-900">Our Clients Thoughts on Us</h2>

        {/* Video Testimonials */}

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

          <div className="dark:from-background pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white"></div>
          <div className="dark:from-background pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white"></div>
        </div>
      </div>
    </>
  );
}
