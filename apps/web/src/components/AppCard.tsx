import React from "react";
import { Button } from "@smartleadmagnet/ui/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@smartleadmagnet/ui/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger,DropdownMenuItem } from "@smartleadmagnet/ui/components/ui/dropdown-menu";
import { ChevronDown, Edit, Share,List } from "lucide-react"; // Icons from lucide-react
import DeleteMagnet from "@/components/DeleteMagnet";
import Link from "next/link";


interface Props {
  id: string;
  name: string;
  description: string;
  analytics?: {
    impressions: number;
    used: number;
  };
}

export default function AppCard({ id, name, description, analytics }: Props) {
  return (
    <Card className="p-0 ">
      <div className="flex items-center gap-2 mr-3 bg-gray-900 p-2 w-full text-white rounded px-4">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          <span className="text-sm font-normal flex items-center">
            Published
          </span>
          {/* <span className="w-2 h-2 bg-red-500 rounded-full"></span>
          <span className="text-sm font-normal flex items-center">
            Draft
          </span> */}
        </div>
      <CardHeader className="flex">
        <div className="flex items-start justify-between">
          <div className="flex">
            <div className="flex-shrink-0">
              <img
                className="h-[60px] w-[60px] rounded-full"
                src="https://picsum.photos/seed/picsum/100/300"
                alt="Neil image"
                width={100}
                height={100}
              />
              <CardTitle className="text-md truncate pt-2">{name}</CardTitle>
              <CardDescription className="truncate text-sm">{description}</CardDescription>
            </div>
          </div>
          <div className="inline-flex items-center">
          {/* <span className="me-2 text-sm bg-gray-300 px-3 py-2 rounded-lg   font-normal">Draft</span> */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex flex-row items-center justify-between">
                  <span>Actions</span>
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
              <div className="flex flex-col p-1">
                  {/* Edit Option */}
                  <DropdownMenuItem asChild>
                    <Link href={`/builder/${id}`} className="flex items-center p-1 hover:bg-gray-100">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Link>
                  </DropdownMenuItem>

                  {/* Share Option */}
                  <DropdownMenuItem asChild>
                  <Link href={`/share/${id}`} className="flex items-center p-1 hover:bg-gray-100">
                      <Share className="mr-2 h-4 w-4" />
                      Share
                    </Link>
                  </DropdownMenuItem>
                  {/* view Submission  Option */}
                  <DropdownMenuItem asChild>
                    <Link href={`/submission/${id}`} className="flex items-center p-1 hover:bg-gray-100">
                      <List className="mr-2 h-4 w-4" />
                      View Submission
                    </Link>
                  </DropdownMenuItem>

                  {/* Delete Option */}
                  <DropdownMenuItem asChild>
                    <DeleteMagnet id={id} />
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="bg-gray-200 px-0">
        <div className="mb-4 flex items-center justify-center">
          <div className="h-px w-full bg-gray-300 dark:bg-gray-600" />
        </div>

        <dl className="grid max-w-screen-xl grid-cols-2">
          <div className="flex flex-col items-center justify-center">
            <dt className="text-2xl font-extrabold">{analytics?.impressions || 0}</dt>
            <dd className="text-gray-500 dark:text-gray-400">Impressions</dd>
          </div>
          <div className="flex flex-col items-center justify-center">
            <dt className="mb-2 text-2xl font-extrabold">{analytics?.used || 0}</dt>
            <dd className="text-gray-500 dark:text-gray-400">Usage Count</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
