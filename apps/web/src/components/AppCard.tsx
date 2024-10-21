import React from "react";
import { Button } from "@smartleadmagnet/ui/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@smartleadmagnet/ui/components/ui/card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@smartleadmagnet/ui/components/ui/dropdown-menu";
import { ChevronDown, Edit, ImageIcon, List } from "lucide-react"; // Icons from lucide-react
import DeleteMagnet from "@/components/DeleteMagnet";
import CopyMagnet from "@/components/CopyMagnet";
import ViewSchema from "@/components/ViewSchema";
import ShareApp from "@/components/ShareApp";
import Image from "next/image";
import Link from "next/link";
import { marked } from "marked";

interface Props {
  id: string;
  name: string;
  description: string;
  status: string;
  image: string;
  components: any[];
  analytics?: {
    impressions: number;
    used: number;
  };
}

export default function AppCard({ id, name, description, analytics, status, image, components }: Props) {
  return (
    <Card className="p-0 ">
      <div className="mr-3 flex w-full items-center gap-2 rounded bg-gray-900 p-2 px-4 text-white">
        {status === "pending" ? (
          <>
            <span className="h-2 w-2 rounded-full bg-red-500"></span>
            <span className="flex items-center text-sm font-normal">Draft</span>
          </>
        ) : (
          <>
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            <span className="flex items-center text-sm font-normal">Published</span>
          </>
        )}
      </div>
      <CardHeader className="flex">
        <div className="flex items-start justify-between">
          <div className="flex">
            <div>
              {image ? (
                <Image
                  className="h-[60px] w-[60px] rounded-full object-cover object-center"
                  src={image}
                  alt="Neil image"
                  width={60}
                  height={60}
                />
              ) : (
                <div className="app_icon">
                  <ImageIcon className="h-[40px] w-[40px] rounded-full" />
                </div>
              )}

              <CardTitle className="text-md truncate pt-2">{name}</CardTitle>
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
                <div className="app-card-dropdown flex flex-col p-0">
                  {/* Edit Option */}
                  <DropdownMenuItem asChild>
                    <Link href={`/builder/${id}`} className="flex items-center  hover:bg-gray-100">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  {/* Copy Option*/}
                  <DropdownMenuItem asChild>
                    <CopyMagnet id={id} />
                  </DropdownMenuItem>

                  {/* Share Option */}
                  <DropdownMenuItem asChild>
                    <ShareApp id={id} />
                  </DropdownMenuItem>
                  {/* view Submission  Option */}
                  <DropdownMenuItem asChild>
                    <Link href={`/submission/${id}`} className="flex items-center  hover:bg-gray-100">
                      <List className="mr-2 h-4 w-4" />
                      View Submission
                    </Link>
                  </DropdownMenuItem>
                  {/* view Schema  Option */}
                  <DropdownMenuItem asChild>
                    <ViewSchema id={id} components={components} />
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
        {description && (
          <>
            <span
              className="app_description text-sm"
              dangerouslySetInnerHTML={{ __html: marked(description.slice(0, 200)) }}
            />
          </>
        )}
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
