import React from "react";
import Marquee from "@smartleadmagnet/ui/components/ui/Marquee";
import testimonial from "@/data/testimonial.json";
import Image from "next/image";

const firstRow = testimonial.slice(0, testimonial.length / 2);
const secondRow = testimonial.slice(testimonial.length / 2);

const ReviewCard = ({
  imageSrc,
  rating,
  name,
  designation,
  description
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
              <span className="text-gray-500">· 2h</span>
            </div>
            <button className="text-gray-500 hover:text-gray-700">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 12h.01M12 12h.01M18 12h.01"
                />
              </svg>
            </button>
          </div>
          <p className="mt-2 text-gray-800">{description}</p>
        </div>
      </div>
    </div>
  );
};

const VideoTestimonial = ({ videoSrc,title }: { videoSrc: string,title:string }) => {
  return (
    <div className="mx-auto mb-4 rounded-lg overflow-hidden max-w-[300px]">
      <video
        className="w-full h-auto aspect-video"
        controls
        src={videoSrc}
      >
        Your browser does not support the video tag.
      </video>
      <h3 className="text-xl text-center mt-5 text-white">{title}</h3>
    </div>
  );
};

export default function ClientSection() {
  return (
    <>
    <div className="bg-gray-900 py-16">
    <div className="container max-w-[1000px] ">
    <h2 className="mb-6 text-5xl font-bold text-center text-white">
        Some kind words from our clients
      </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16">
        {/* Replace these video URLs with actual video sources */}
        <VideoTestimonial videoSrc="/videos/testimonial1.mp4" title="Significant change in vistor after SmartLead Magnet" />
        <VideoTestimonial videoSrc="/videos/testimonial2.mp4" title="100 plus new client after SmartLead Magnet" />
        <VideoTestimonial videoSrc="/videos/testimonial3.mp4" title="50% increase in lead conversion after SmartLead Magnet" />
        <VideoTestimonial videoSrc="/videos/testimonial1.mp4" title="Significant change in vistor after SmartLead Magnet" />
        <VideoTestimonial videoSrc="/videos/testimonial2.mp4" title="100 plus new client after SmartLead Magnet" />
        <VideoTestimonial videoSrc="/videos/testimonial3.mp4" title="50% increase in lead conversion after SmartLead Magnet" />
        
      </div>
      </div>
      </div>
    <div className="bg-background relative flex flex-col items-center justify-center overflow-hidden rounded-lg border md:shadow-xl py-16">
      {/* Title */}
      <h2 className="mb-6 text-5xl font-bold text-center text-gray-900">
        Our Clients Thoughts on Us
      </h2>

      {/* Video Testimonials */}
      
    <div className="relative">
      {/* Marquee for text testimonials */}
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review, index) => (
          <ReviewCard key={index} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
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
