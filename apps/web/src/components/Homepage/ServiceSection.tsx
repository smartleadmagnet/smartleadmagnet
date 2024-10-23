import ServiceCard from "@/components/ServiceCard";
import Link from "next/link";
import { ImageIcon } from "lucide-react";


const ServiceSection: React.FC = () => {
  return (
    <div className="service-section bg-gradient-to-r from-cyan-500 to-blue-600 py-16" id="services">
      <div className="container mx-auto">
        {/* Section title */}
        <div className="mb-10 text-center">
          <h2 className="mb-[80px] text-5xl font-bold text-white">Take a look at some of our most commonly used lead magnets in action.</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md"><div className="mb-4 flex items-center space-x-4">
          
        <div className="app_icon">
                      <ImageIcon className="h-[40px] w-[40px] rounded-full" />
                    </div>
                    <h2 className="text-2xl font-semibold">Color book App</h2></div><p className="mb-4 text-gray-600"><p className="ql-align-justify"><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500</p></p><div className="flex space-x-2"><a className="rounded bg-cyan-500 px-4 py-2 text-white hover:bg-cyan-600" href="/templates/view/color-book-app">Use This</a><a className="rounded border border-cyan-500  px-4 py-2  text-cyan-500 hover:bg-cyan-600 hover:text-white" href="/templates/use/color-book-app">Make it yours</a></div></div>
      </div>


        <div className="flex justify-center">
            <Link  href="/templates" className="rounded-lg bg-cyan-900 px-10 py-5 text-xl font-bold text-white  transition duration-300 hover:bg-gray-900">
              Browse Templates
            </Link>
          </div>
      </div>
    </div>
  );
};

export default ServiceSection;
