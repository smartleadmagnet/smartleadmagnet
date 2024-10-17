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




const SubmissionPage = () => {
  //const router = useRouter(); // Create a router instance

  

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
          Export Submissions
        </Button>
      </div>
      <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-5">Name of Your Form
        {/* //status */}
        <span className="ml-3 text-sm bg-green-500 px-3 py-2 rounded-lg  text-white font-normal">Published</span>
        {/* <span className="ml-3 text-sm bg-gray-300 px-3 py-2 rounded-lg   font-normal">Draft</span> */}

      </h1>
      <div className="flex items-center gap-10 mb-10">
  <p className="text-gray-900 text-xl text-sm mb-1">Created on: <span className="font-medium">2024-10-17</span></p>
  <p className="text-gray-900  text-xl mb-1">Total Impressions: <span className="font-medium">100</span></p>
  <p className="text-gray-900  text-xl mb-1">Total Submissions: <span className="font-medium">100</span></p>
  </div>
        </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default SubmissionPage;
