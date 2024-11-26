import { getLastEmailSentDate, getUsers, logEmail, wasEmailSent } from "@smartleadmagnet/services";
import { User } from "@smartleadmagnet/database";
import { sendEmail } from "@/lib/email";
import { render } from "@react-email/render";
import Day1 from "@/emails/day-1";
import Day2 from "@/emails/day-2";
import Day3 from "@/emails/day-3";
import Day4 from "@/emails/day-4";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

const { convert } = require("html-to-text");

async function send(user: User, emailType: string, subject: string, template: any) {
  const emailHtml = await render(template);
  await sendEmail(user?.email!, subject, convert(emailHtml), emailHtml);
  await logEmail(user?.id!, emailType);
}

async function getNextEmailToSend(user: User) {
  const emailTypes = ["Day 1", "Day 2", "Day 3", "Day 4"];
  let lastSentEmail = null;

  // Find the last email that was sent
  for (const emailType of emailTypes) {
    if (await wasEmailSent(user.id!, emailType)) {
      lastSentEmail = emailType;
    } else {
      break;
    }
  }

  // If no email was sent, start with Day 1
  if (!lastSentEmail) {
    return "Day 1";
  }

  // Get next email in sequence
  const currentIndex = emailTypes.indexOf(lastSentEmail);
  return currentIndex < emailTypes.length - 1 ? emailTypes[currentIndex + 1] : null;
}

async function sendEmailChain(user: User) {
  const nextEmail = await getNextEmailToSend(user);
  if (!nextEmail) return; // All emails have been sent

  // Check if enough time has passed since user creation for first email
  // or since the last email was sent
  const currentDate = new Date();
  const lastEmailSent = await getLastEmailSentDate(user.id!);
  const timeToCheck = lastEmailSent || new Date(user.createdAt);

  const hoursSinceLastEmail = Math.floor((currentDate.getTime() - timeToCheck.getTime()) / (1000 * 60 * 60));

  // Only send if at least 24 hours have passed
  if (hoursSinceLastEmail < 24) return;

  // Send the appropriate email based on the sequence
  switch (nextEmail) {
    case "Day 1":
      await send(user, "Day 1", "Create High-Converting Lead Magnets in Minutes", <Day1 name={user?.name!} />);
      break;
    case "Day 2":
      await send(user, "Day 2", "Don't Miss Out on Capturing More Leads!", <Day2 name={user?.name!} />);
      break;
    case "Day 3":
      await send(user, "Day 3", "Boost Your Lead Magnet Performance with AI", <Day3 name={user?.name!} />);
      break;
    case "Day 4":
      await send(
        user,
        "Day 4",
        "Don't Miss Out on Capturing More Leads with SmartLeadMagnet",
        <Day4 name={user?.name!} />
      );
      break;
  }
}

export async function GET() {
  try {
    console.log("Cron job running...");
    // Find all users who were created more than 1 day ago
    const users = await getUsers();

    // Send email chains to all users
    await Promise.all(users.map((user) => sendEmailChain(user)));
  } catch (error) {
    console.error("Error resetting request counts:", error);
  }

  return Response.json({ status: "ok" });
}
