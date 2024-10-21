import React from 'react';
import Link from 'next/link'; // Import Link from next/link for navigation

export default function IntegrationSidebar() {
  return (
    <div className="bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Integration Options</h2>
      <ul className="space-y-2">
      <li>
          <Link
            className="block p-2 rounded-md text-cyan-500 hover:bg-cyan-100 transition-colors duration-300"
            href="/integrations/smartlead-magnet-api"
          >
            SmartLead Magnet API
          </Link>
        </li>
      <li>
          <Link
            className="block p-2 rounded-md text-cyan-500 hover:bg-cyan-100 transition-colors duration-300"
            href="/integrations/zapier"
          >
            Zapier
          </Link>
        </li>
        <li>
          <Link
            className="block p-2 rounded-md text-cyan-500 hover:bg-cyan-100 transition-colors duration-300"
            href="/integrations/wordpress"
          >
            WordPress
          </Link>
        </li>
        <li>
          <Link
            className="block p-2 rounded-md text-cyan-500 hover:bg-cyan-100 transition-colors duration-300"
            href="/integrations/hubspot"
          >
            HubSpot
          </Link>
        </li>
        <li>
          <Link
            className="block p-2 rounded-md text-cyan-500 hover:bg-cyan-100 transition-colors duration-300"
            href="/integrations/shopify"
          >
            Shopify
          </Link>
        </li>
        <li>
          <Link
            className="block p-2 rounded-md text-cyan-500 hover:bg-cyan-100 transition-colors duration-300"
            href="/integrations/webflow"
          >
            Webflow
          </Link>
        </li>
      </ul>
    </div>
  );
}
