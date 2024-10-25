import { NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { suggestLeadMagnet } from '@smartleadmagnet/llm';
import { createFromWebsite } from '@/actions/lead-magnet';
import { adjectives, Config, names, starWars, uniqueNamesGenerator } from "unique-names-generator";

const config: Config = {
  dictionaries: [names, starWars, adjectives],
};

export async function POST(request: Request) {
  const { url } = await request.json();

  if (!url) {
    return NextResponse.json({ message: 'URL is required' }, { status: 400 });
  }

  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const title = $('title').text();
    const description = $('meta[name="description"]').attr('content') || '';
    const bodyText = $('body').text().trim().replace(/\s+/g, ' ').substring(0, 5000); // Limit to 5000 characters

    const suggestedMagnet = await suggestLeadMagnet({ title, description, content: bodyText });
    // Generate a unique name for the lead magnet
    // Extract the website name from the URL
    const websiteName = new URL(url).hostname.replace('www.', '');

    // Create the lead magnet using the suggested data
    const createdLeadMagnet = await createFromWebsite({
      name: websiteName,
      ...suggestedMagnet,
    });

    // Construct the redirect URL
    const redirectUrl = `/builder/${createdLeadMagnet.id}`;

    return NextResponse.json({
      websiteData: {
        title,
        description,
        url,
      },
      suggestedMagnet: createdLeadMagnet,
      redirectUrl,
    });
  } catch (error) {
    console.error('Error processing website data:', error);
    return NextResponse.json({ message: 'Error processing website data' }, { status: 500 });
  }
}
