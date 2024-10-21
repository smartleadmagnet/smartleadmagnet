import Link from "next/link";
import { getLeadBySlug } from "@smartleadmagnet/services";
import { marked } from "marked";
import React from "react";

export default async function Page({ params }: { params: { id: string; template: string } }) {
  const { id, template } = params;
  const leadMagnet = await getLeadBySlug(template);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-4xl font-bold">{leadMagnet.name}</h1>
      {leadMagnet.description && (
        <>
          <p
            className="mx-auto mb-8 max-w-4xl text-center text-gray-600"
            dangerouslySetInnerHTML={{ __html: marked(leadMagnet.description.slice(0, 200)) }}
          />
        </>
      )}
      <div className="md:flex">
        <div className="md:w-1/2">
          <iframe
            src="http://localhost:3000/share/6714188e94a51c96cb034181"
            width="100%"
            height="600"
            loading="lazy"
            referrerPolicy="unsafe-url"
            allow="clipboard-read;clipboard-write"
          ></iframe>
        </div>
        <div className="p-8 md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-800">Product Title</h1>
          <p className="mt-2 text-gray-600">
            This is a brief product description. It highlights the key features and benefits of the product in a concise
            way. Perfect for AI content writers or any creative task.
          </p>
          <div className="mt-4">
            <span className="text-2xl font-bold text-gray-800">$49.99</span>
            <span className="ml-2 text-sm text-gray-600 line-through">$59.99</span>
          </div>
          <div className="mt-4">
            <Link
              href={`/checkout/${id}`}
              className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 focus:bg-blue-500 focus:outline-none"
            >
              Buy Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
