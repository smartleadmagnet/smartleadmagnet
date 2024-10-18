// pages/submission.tsx
import React from "react";
import { Button } from "@smartleadmagnet/ui/components/ui/button";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@smartleadmagnet/ui/components/ui/table";
import { ChevronLeft } from "lucide-react"; // Icons from lucide-react
import { getUsageById } from "@/actions/lead-magnet";
import { LeadMagnetUsage } from "@smartleadmagnet/database";
import { format } from "date-fns";
import ExportSubmissionsButton from "@/components/ExportSubmissionsButton";
import ViewPayload from "@/components/ViewPayload";



export default async function Page({ params }: { params: { id: string } }) {
  //const router = useRouter(); // Create a router instance
  let submissionData = await getUsageById(params.id);
  let useageData = submissionData.usage;
  let leadMagnet = submissionData.leadMagnet;

  
  

  

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <Link
         href={`/my-magnets`} 
         className="flex items-center hover:underline"
        >
          <ChevronLeft />
          Back
        </Link>
        
        <Button
          className="btn-primary"
        >
          <ExportSubmissionsButton usageData={useageData} leadMagnetName={leadMagnet.name} />
        </Button>
      </div>
      <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-5">{leadMagnet.name}
        {/* //status */}
        {leadMagnet?.status === 'pending' ? (
            <span className="ml-3 text-sm bg-gray-300 px-3 py-2 rounded-lg   font-normal">Draft</span> 
        ):(
          <span className="ml-3 text-sm bg-green-500 px-3 py-2 rounded-lg  text-white font-normal">Published</span>
        ) }
        
        

      </h1>
      <div className="flex items-center gap-10 mb-10">
  <p className="text-gray-900 text-xl text-sm mb-1">Created on: <span className="font-medium">{format(new Date(leadMagnet?.createdAt),"yyyy-MM-dd")}</span></p>
  <p className="text-gray-900  text-xl mb-1">Total Impressions: <span className="font-medium">{leadMagnet?.impressionsCount}</span></p>
  <p className="text-gray-900  text-xl mb-1">Total Submissions: <span className="font-medium">{leadMagnet?.usedCount}</span></p>
  </div>
        </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead >Ip Address</TableHead>
            <TableHead >Webhook Status</TableHead>
            <TableHead >Email Sent</TableHead>
            <TableHead>Submmited At</TableHead>
            <TableHead>Payload</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {useageData?.map((data: LeadMagnetUsage) => (
            <TableRow key={data.id}>
              <TableCell>{data.ipAddress}</TableCell>
              <TableCell>{data.webhookStatus}</TableCell>
              <TableCell>{data.emailSent?"Sent":"Not Sent"}</TableCell>
              <TableCell>{format(new Date(data.consumedAt),"yyyy-MM-dd")}
              </TableCell>
              <TableCell>
                <ViewPayload payload={data.payload} />
              </TableCell>
            </TableRow>
          ))}
          
        </TableBody>
      </Table>
    </div>
  );
};


