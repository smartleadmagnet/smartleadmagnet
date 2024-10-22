// pages/submission.tsx
import React from "react";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@smartleadmagnet/ui/components/ui/table";
import { ChevronLeft } from "lucide-react"; // Icons from lucide-react
import { getUsageById } from "@/actions/lead-magnet";
import { LeadMagnetUsage } from "@smartleadmagnet/database";
import { format } from "date-fns";
import ExportSubmissionsButton from "@/components/ExportSubmissionsButton";
import ViewPayload from "@/components/ViewPayload";

export default async function Page({ params }: { params: { id: string } }) {
  //const router = useRouter(); // Create a router instance
  let submissionData = await getUsageById(params.id);
  let usageData = submissionData.usage;
  let leadMagnet = submissionData.leadMagnet;

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <Link href={`/my-magnets`} className="flex items-center hover:underline">
          <ChevronLeft />
          Back
        </Link>

        <ExportSubmissionsButton usageData={usageData} leadMagnetName={leadMagnet.name} />
      </div>
      <div>
        <h1 className="mb-5 text-3xl font-bold text-gray-800">
          {leadMagnet.name}
          {/* //status */}
          {leadMagnet?.status === "pending" ? (
            <span className="ml-3 rounded-lg bg-gray-300 px-3 py-2 text-sm   font-normal">Draft</span>
          ) : (
            <span className="ml-3 rounded-lg bg-green-500 px-3 py-2 text-sm  font-normal text-white">Published</span>
          )}
        </h1>
        <div className="mb-10 flex items-center gap-10">
          <p className="mb-1 text-sm text-xl text-gray-900">
            Created on: <span className="font-medium">{format(new Date(leadMagnet?.createdAt), "yyyy-MM-dd")}</span>
          </p>
          <p className="mb-1  text-xl text-gray-900">
            Total Impressions: <span className="font-medium">{leadMagnet?.impressionsCount}</span>
          </p>
          <p className="mb-1  text-xl text-gray-900">
            Total Submissions: <span className="font-medium">{leadMagnet?.usedCount}</span>
          </p>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ip Address</TableHead>
            <TableHead>Webhook Status</TableHead>
            <TableHead>Email Sent</TableHead>
            <TableHead>Submmited At</TableHead>
            <TableHead>Payload</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usageData?.map((data: LeadMagnetUsage) => (
            <TableRow key={data.id}>
              <TableCell>{data.ipAddress}</TableCell>
              <TableCell>{data.webhookStatus}</TableCell>
              <TableCell>{data.emailSent ? "Sent" : "Not Sent"}</TableCell>
              <TableCell>{format(new Date(data.consumedAt), "yyyy-MM-dd")}</TableCell>
              <TableCell>
                <ViewPayload payload={data.payload} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
