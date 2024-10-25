import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const HowItWorksSection: React.FC = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-4xl font-bold">Create a powerful lead generation tool in minutes</h2>
        <p className="mb-16 text-center text-xl">Designing effective lead capture tools used to be time-consuming. Not anymore!</p>
        
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <ol className="space-y-8">
              <li className="flex items-start">
                <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500 text-white font-bold">1</div>
                <div>
                  <h3 className="text-xl font-semibold">Select an ideal template</h3>
                  <p className="mt-2">Browse through numerous options across various categories.</p>
                  <Link href="/templates" className="mt-2 text-cyan-500 hover:underline">View Template Gallery →</Link>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500 text-white font-bold">2</div>
                <div>
                  <h3 className="text-xl font-semibold">Personalize your design</h3>
                  <p className="mt-2">Tailor the appearance and content to match your brand.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500 text-white font-bold">3</div>
                <div>
                  <h3 className="text-xl font-semibold">Launch and start collecting leads</h3>
                  <p className="mt-2">User-friendly setup process, no technical expertise required.</p>
                  <Link href="/contact" className="mt-2 inline-block rounded border border-cyan-500 px-4 py-2 text-cyan-500 hover:bg-cyan-500 hover:text-white">
                    Need help? Contact our support team →
                  </Link>
                </div>
              </li>
            </ol>
          </div>
          <div className="lg:w-1/2">
            <div className="aspect-w-16 aspect-h-9">
              <iframe 
                src="https://www.youtube.com/embed/your-video-id" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="w-full h-full rounded-lg shadow-lg"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
