import { getUsers, logEmail, wasEmailSent } from "@smartleadmagnet/services";
import { User } from "@smartleadmagnet/database";
import { sendEmail } from "@/lib/email";
import { render } from "@react-email/render";
import Day1 from "@/emails/day-1";
import Day2 from "@/emails/day-2";
import Day3 from "@/emails/day-3";
import Day4 from "@/emails/day-4";

const { convert } = require("html-to-text");

async function send(user: User, emailType: string, subject: string, template: any) {
  const emailHtml = await render(template);
  await sendEmail(user?.email!, subject, convert(emailHtml), emailHtml);
  await logEmail(user?.id!, emailType);
}

async function sendEmailChain(user: User) {
  const currentDate = new Date();
  const createdAt = new Date(user.createdAt);
  // ts-ignore
  const timeDiff: number = Math.floor((currentDate.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24)) as number; // in days

  if (timeDiff === 1 && !(await wasEmailSent(user?.id!, "Day 1"))) {
    // Send day 1 email
    await send(user, "Day 1", "Create High-Converting Lead Magnets in Minutes", <Day1 name={user?.name!} />); // Replace with actual Day 1 template
  } else if (timeDiff === 2 && !(await wasEmailSent(user?.id!, "Day 2"))) {
    // Send day 2 email
    await send(user, "Day 2", "Don’t Miss Out on Capturing More Leads!", <Day2 name={user?.name!} />); // Replace with actual Day 2 template
  } else if (timeDiff === 3 && !(await wasEmailSent(user?.id!, "Day 3"))) {
    // Send day 3 email
    await send(user, "Day 3", "Boost Your Lead Magnet Performance with AI", <Day3 name={user?.name!} />); // Replace with actual Day 3 template
  } else if (timeDiff === 4 && !(await wasEmailSent(user?.id!, "Day 4"))) {
    // Send day 4 email
    await send(
      user,
      "Day 4",
      "Don’t Miss Out on Capturing More Leads with SmartLeadMagnet",
      <Day4 name={user?.name!} />
    ); // Replace with actual Day 4 template
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
