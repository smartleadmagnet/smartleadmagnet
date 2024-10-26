import { ImEmbed2 } from "react-icons/im";
import { FaUserCheck } from "react-icons/fa";
import { RiDragDropLine } from "react-icons/ri";


import { IoIosPeople } from "react-icons/io";
import Link from "next/link";


const ProcessSection = () => {
  return (
<div className="bg-gradient-to-r from-cyan-500 to-blue-400 py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="mb-6 text-center text-4xl font-extrabold leading-tight text-white lg:text-5xl leading-[1.5]">
            Start using <span className="text-cyan-900">Smartead Magnet</span>{""}<br/>
            in few simple steps
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-white lg:text-xl">
            Follow these simple steps to unlock your website's full potential and start generating more leads today.
          </p>

          <div className="mx-auto max-w-4xl">
            {/* Step 1 */}
            <div className="mb-12 flex flex-col items-center lg:flex-row">
              <div className="mb-6 flex h-[150px] min-w-[150px] items-center justify-center rounded-full bg-cyan-900 text-white lg:mb-0 lg:mr-8">
                <FaUserCheck className="h-[80px] w-[80px]" />
              </div>
              <div className="text-center lg:text-left">
                <h3 className="mb-2 text-2xl font-bold text-white">Step 1: Register with your email id</h3>
                <p className="mb-5 text-lg text-white">
                  Register with your email id to get started with Smartlead Magnet.
                </p>
                <Link 
                href="/login"
                className="bg-cyan-800  hover:bg-cyan-900 px-8 py-4 font-bold text-white rounded">Register Now</Link>
              </div>
            </div>

            {/* Step 2 */}
            <div className="mb-12 flex flex-col items-center lg:flex-row-reverse">
              <div className="mb-6 flex h-[150px] min-w-[150px] items-center justify-center rounded-full bg-cyan-900 text-white lg:mb-0 ">
                <RiDragDropLine className="h-[80px] w-[80px]" />
              </div>
              <div className="text-center lg:text-left lg:pr-8">
                <h3 className="mb-2 text-2xl font-bold text-white">Step 2: Start building your lead magnet </h3>
                <p className="text-lg text-white ">
                  Use the pre-built templates and customize them with your brand logo, title, and more.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="mb-12 flex flex-col items-center lg:flex-row">
              <div className="mb-6 flex h-[150px] min-w-[150px] items-center justify-center rounded-full bg-cyan-900 text-white lg:mb-0 lg:mr-8">
              <ImEmbed2 className="h-[80px] w-[80px]" />
              </div>
              <div className="text-center lg:text-left">
                <h3 className="mb-2 text-2xl font-bold text-white">Step 3: Embed Your Tool on Your Website</h3>
                <p className="text-lg text-white">
                  Capture valuable lead information, such as email addresses and names, when users interact with your
                  lead magnet.
                </p>
              </div>
            </div>
            {/* Step 4 */}
            <div className="mb-12 flex flex-col items-center lg:flex-row-reverse">
              <div className="mb-6 flex h-[150px] min-w-[150px] items-center justify-center rounded-full bg-cyan-900 text-white lg:mb-0 lg:mr-8">
                <IoIosPeople className="h-[80px] w-[80px]" />
              </div>
              <div className="text-center lg:text-left">
                <h3 className="mb-2 text-2xl font-bold text-white">Step 4: Collect Leads</h3>
                <p className="text-lg text-white">
                  Capture valuable lead information, such as email addresses and names, when users interact with your
                  lead magnet.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Link  href="/templates" className="rounded-lg bg-cyan-800  hover:bg-cyan-900 px-10 py-5 text-xl font-bold text-white  transition duration-300">
              Browse Templates
            </Link>
          </div>
        </div>
      </div>
  );
};

export default ProcessSection;
