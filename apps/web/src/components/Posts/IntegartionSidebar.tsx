import React from "react";
import Link from "next/link"; // Import Link from next/link for navigation

export default function IntegrationSidebar() {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-lg font-semibold">Integration Options</h2>
      <ul className="space-y-2">
        <li>
          <Link
            className="block rounded-md p-2 text-cyan-500 transition-colors duration-300 hover:bg-cyan-100"
            href="/integrations/smartlead-magnet-api"
          >
            SmartLead Magnet API
          </Link>
        </li>
        <li>
          <Link
            className="block rounded-md p-2 text-cyan-500 transition-colors duration-300 hover:bg-cyan-100"
            href="/integrations/zapier"
          >
            Zapier
          </Link>
        </li>
        <li>
          <Link
            className="block rounded-md p-2 text-cyan-500 transition-colors duration-300 hover:bg-cyan-100"
            href="/integrations/wordpress"
          >
            WordPress
          </Link>
        </li>
        <li>
          <Link
            className="block rounded-md p-2 text-cyan-500 transition-colors duration-300 hover:bg-cyan-100"
            href="/integrations/hubspot"
          >
            HubSpot
          </Link>
        </li>
        <li>
          <Link
            className="block rounded-md p-2 text-cyan-500 transition-colors duration-300 hover:bg-cyan-100"
            href="/integrations/shopify"
          >
            Shopify
          </Link>
        </li>
        <li>
          <Link
            className="block rounded-md p-2 text-cyan-500 transition-colors duration-300 hover:bg-cyan-100"
            href="/integrations/webflow"
          >
            Webflow
          </Link>
        </li>
        <li>
          <Link
            className="block rounded-md p-2 text-cyan-500 transition-colors duration-300 hover:bg-cyan-100"
            href="/integrations/wix"
          >
            Wix
          </Link>
        </li>
        <li>
          <Link
            className="block rounded-md p-2 text-cyan-500 transition-colors duration-300 hover:bg-cyan-100"
            href="/integrations/squarespace"
          >
            Squarespace
          </Link>
        </li>
      </ul>
    </div>
  );
}
