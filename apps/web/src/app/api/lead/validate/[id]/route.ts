import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/services/user";
import { validateLeadWithInput } from "@smartleadmagnet/llm";
import { getLeadMagnetById } from "@smartleadmagnet/services";
import axios from "axios";
import * as cheerio from "cheerio";

export const dynamic = "force-dynamic";
export const maxDuration = 60; // defaults to force-static

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  // get slug id value from the request
  const user = await getSessionUser();
  if (user?.id) {
    try {
      const lead = await getLeadMagnetById(params.id);
      if (lead.userId !== user?.id!) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
      }
      const payload = await req.json();

      // Check if the lead has any website components
      const websiteComponent = (lead?.components as Array<any>)?.find((item) => item.type === "website");

      if (websiteComponent) {
        // Check if the website URL is present in the payload
        if (payload[websiteComponent.name]) {
          try {
            // Fetch the website content using axios
            const response = await axios.get(payload[websiteComponent.name]);
            const htmlContent = response.data;

            // // Parse the HTML content using cheerio
            const $ = cheerio.load(htmlContent);

            const title = $("title").text();
            const description = $('meta[name="description"]').attr("content") || "";
            const bodyText = $("body").text().trim().replace(/\s+/g, " ").substring(0, 5000); // Limit to 5000 characters

            // Add the website content to the payload
            payload[websiteComponent.name] = {
              title,
              description,
              bodyText,
            };
          } catch (error) {
            // Absorb the error if the website is not accessible
            console.error("Error fetching website content:", error);
          }
        }
      }
      const result = await validateLeadWithInput({ leadMagnet: lead, promptInput: payload });
      return NextResponse.json({ message: result });
    } catch (error: any) {
      console.log(error);
      return NextResponse.json({ error: error.message || error }, { status: 500 });
    }
  }
  return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
}
