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
          Ready to Transform Your Landing Page Into
          <br />
          <span className="text-cyan-900">AI Lead Generation</span> Magic?
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-white lg:text-xl">
          Hey there! Our lead generation service is here to help you build a lead generation website that actually works. 
          We help marketing and lead generation teams slash their cost per lead - and make it look easy.
        </p>

        <div className="mx-auto max-w-4xl">
          {/* Step 1 */}
          <div className="mb-12 flex flex-col items-center lg:flex-row">
            <div className="mb-6 flex h-[150px] min-w-[150px] items-center justify-center rounded-full bg-cyan-900 text-white lg:mb-0 lg:mr-8">
              <FaUserCheck className="h-[80px] w-[80px]" />
            </div>
            <div className="text-center lg:text-left">
              <h3 className="mb-2 text-2xl font-bold text-white">Step 1: Jump Into AI Lead Generation</h3>
              <p className="mb-5 text-lg text-white">
                Get your hands on our AI lead generator tools and watch your landing site become a business leads machine. 
                Trust us - our website lead gen solution makes it a breeze!
              </p>
              <Link 
                href="/login"
                className="bg-cyan-800 hover:bg-cyan-900 px-8 py-4 font-bold text-white rounded">
                Let's Generate Some Leads
              </Link>
            </div>
          </div>

          {/* Step 2 */}
          <div className="mb-12 flex flex-col items-center lg:flex-row-reverse">
            <div className="mb-6 flex h-[150px] min-w-[150px] items-center justify-center rounded-full bg-cyan-900 text-white lg:mb-0">
              <RiDragDropLine className="h-[80px] w-[80px]" />
            </div>
            <div className="text-center lg:text-left lg:pr-8">
              <h3 className="mb-2 text-2xl font-bold text-white">Step 2: Craft Your Perfect Lead Magnet</h3>
              <p className="text-lg text-white">
                Put our AI-powered lead generation tools to work! Create lead magnets that your landing web page visitors 
                can't resist. Perfect for any marketing lead generation campaign you're running.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="mb-12 flex flex-col items-center lg:flex-row">
            <div className="mb-6 flex h-[150px] min-w-[150px] items-center justify-center rounded-full bg-cyan-900 text-white lg:mb-0 lg:mr-8">
              <ImEmbed2 className="h-[80px] w-[80px]" />
            </div>
            <div className="text-center lg:text-left">
              <h3 className="mb-2 text-2xl font-bold text-white">Step 3: Quick Website Setup</h3>
              <p className="text-lg text-white">
                Just pop our lead form onto your lead generation site - it's that simple! Our AI leads system 
                handles everything automatically, from capturing emails to processing them instantly.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="mb-12 flex flex-col items-center lg:flex-row-reverse">
            <div className="mb-6 flex h-[150px] min-w-[150px] items-center justify-center rounded-full bg-cyan-900 text-white lg:mb-0 lg:mr-8">
              <IoIosPeople className="h-[80px] w-[80px]" />
            </div>
            <div className="text-center lg:text-left">
              <h3 className="mb-2 text-2xl font-bold text-white">Step 4: Watch Those Qualified Leads Roll In</h3>
              <p className="text-lg text-white">
                Let our AI for lead generation do the heavy lifting! Keep tabs on your lead gens, 
                fine-tune your leads marketing, and watch your business grow - all from one dashboard.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Link href="/templates" className="rounded-lg bg-cyan-800 hover:bg-cyan-900 px-10 py-5 text-xl font-bold text-white transition duration-300">
            Build Your Lead Generation Website
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProcessSection;
