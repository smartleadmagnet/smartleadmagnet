import Link from "next/link";
import { getLeadBySlug } from "@smartleadmagnet/services";
import { marked } from "marked";
import React from "react";
import { BuilderProvider } from "@/providers/BuilderProvider";
import BuilderElementPreview from "@/components/Share";
import { Button } from "@smartleadmagnet/ui/components/ui/button";
import { AiOutlineCopy } from "react-icons/ai";
import { ImEmbed2 } from "react-icons/im";
import { cloneLead, createLead } from "@/actions/lead-magnet";
import { IoIosPeople } from "react-icons/io";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { id: string; template: string } }) {
  const { template } = params;
  const leadMagnet = await getLeadBySlug(template);

  const onClone = async () => {
    "use server";

    const lead = await cloneLead(leadMagnet.id);

    redirect(`/builder/${lead?.id!}`);
  };

  const onCreate = async () => {
    "use server";
    const lead = await createLead();
    redirect(`/builder/${lead?.id!}`);
  };

  return (
    <>
      <div className="container mx-auto mb-10 px-4 py-10">
        <div className="md:flex">
          <div className="md:w-1/2">
            <div className="mx-auto max-w-lg">
              <BuilderProvider leadMagnet={leadMagnet}>
                <BuilderElementPreview hideInfo />
              </BuilderProvider>
            </div>
          </div>
          <div className="p-8 md:w-1/2">
            <h1 className="mb-4 text-3xl font-bold text-gray-800">{leadMagnet.name}</h1>
            {leadMagnet.description && (
              <>
                <div
                  className="mx-auto mb-2 max-w-4xl text-gray-600"
                  dangerouslySetInnerHTML={{ __html: marked(leadMagnet.description) }}
                />
              </>
            )}
            <div className="flex">
              <form>
                <Button
                  formAction={onCreate}
                  className="mr-5 rounded border border-cyan-500 bg-cyan-500 px-6 py-6 text-lg font-bold text-white hover:border-cyan-600 hover:bg-cyan-600 hover:text-white"
                >
                  Start From Scratch
                </Button>
              </form>
              <form>
                <Button
                  formAction={onClone}
                  className="rounded border border-cyan-500 bg-white px-6 py-6 text-lg font-bold text-cyan-500 hover:border-cyan-600 hover:bg-cyan-600 hover:text-white"
                >
                  Make it Yours
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Three Steps */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-400 py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="mb-6 text-center text-4xl font-extrabold leading-tight text-white lg:text-5xl">
            Three Steps to Transform Your Website into a <span className="text-cyan-900">Lead Generation Machine</span>
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-white lg:text-xl">
            Follow these simple steps to unlock your website's full potential and start generating more leads today.
          </p>

          <div className="mx-auto max-w-4xl">
            {/* Step 1 */}
            <div className="mb-12 flex flex-col items-center lg:flex-row">
              <div className="mb-6 flex h-[150px] min-w-[150px] items-center justify-center rounded-full bg-cyan-900 text-white lg:mb-0 lg:mr-8">
                <AiOutlineCopy className="h-[80px] w-[80px]" />
              </div>
              <div className="text-center lg:text-left">
                <h3 className="mb-2 text-2xl font-bold text-white">Step 1: Customize This Lead Magnet</h3>
                <p className="mb-5 text-lg text-white">
                  Use the pre-built templates and customize them with your brand logo, title, and more.
                </p>
                <Button className="bg-cyan-900 px-8 py-6 font-bold text-white">Make it yours</Button>
              </div>
            </div>

            {/* Step 2 */}
            <div className="mb-12 flex flex-col items-center lg:flex-row-reverse">
              <div className="mb-6 flex h-[150px] min-w-[150px] items-center justify-center rounded-full bg-cyan-900 text-white lg:mb-0 lg:mr-8">
                <ImEmbed2 className="h-[80px] w-[80px]" />
              </div>
              <div className="text-center lg:text-left">
                <h3 className="mb-2 text-2xl font-bold text-white">Step 2: Embed Your Tool on Your Website</h3>
                <p className="text-lg text-white">
                  Place the lead magnet on your website to encourage visitors to provide their contact information.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="mb-12 flex flex-col items-center lg:flex-row">
              <div className="mb-6 flex h-[150px] min-w-[150px] items-center justify-center rounded-full bg-cyan-900 text-white lg:mb-0 lg:mr-8">
                <IoIosPeople className="h-[80px] w-[80px]" />
              </div>
              <div className="text-center lg:text-left">
                <h3 className="mb-2 text-2xl font-bold text-white">Step 3: Collect Leads</h3>
                <p className="text-lg text-white">
                  Capture valuable lead information, such as email addresses and names, when users interact with your
                  lead magnet.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button className="rounded-lg bg-cyan-900 px-10 py-5 text-xl font-bold text-white  transition duration-300 hover:bg-gray-900">
              Make it Yours
            </button>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="mb-6 text-center text-3xl font-bold text-gray-800 lg:text-4xl">
            Not the Right Fit for Your Needs?
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-center text-base text-gray-600 lg:mb-12 lg:text-lg">
            No worries! If this lead magnet doesn't match your requirements, we have plenty of other options available.
          </p>
          <div className="flex flex-col items-center justify-center space-y-4 md:flex-row md:space-x-4 md:space-y-0">
            <Link
              href="/suggest-a-magnet"
              className="w-full rounded border border-cyan-500 bg-cyan-500 px-6 py-4 text-center text-lg font-bold text-white hover:border-cyan-600 hover:bg-cyan-600 hover:text-white md:w-auto"
            >
              Suggest me a Magnet
            </Link>
            <Link
              href="/templates/all"
              className="w-full rounded border border-cyan-500 bg-white px-6 py-4 text-center text-lg font-bold text-cyan-500 hover:border-cyan-600 hover:bg-cyan-600 hover:text-white md:w-auto"
            >
              Go Back to Templates
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
