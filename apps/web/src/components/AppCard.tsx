import React from "react";
import { Button } from "@smartleadmagnet/ui/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@smartleadmagnet/ui/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger,DropdownMenuItem } from "@smartleadmagnet/ui/components/ui/dropdown-menu";
import { ChevronDown, Edit, Share,List,ImageIcon } from "lucide-react"; // Icons from lucide-react
import DeleteMagnet from "@/components/DeleteMagnet";
import CopyMagnet from "@/components/CopyMagnet";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { marked } from "marked"; // Import marked

import { cloneLead } from "@/actions/lead-magnet";

interface Props {
  id: string;
  name: string;
  description: string;
  status: string;
  image: string;
  analytics?: {
    impressions: number;
    used: number;
  };
}

export default function AppCard({ id, name, description, analytics,status,image }: Props) {
  const onClone = async () => {
    "use server";
    console.log("Cloning");
    
    const lead = await cloneLead(id);
    console.log(lead);
    redirect(`/builder/${lead?.id!}`);
  };
  return (
    <Card className="p-0 ">
      <div className="flex items-center gap-2 mr-3 bg-gray-900 p-2 w-full text-white rounded px-4">
          {status === "pending" ? (
            <>
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
          <span className="text-sm font-normal flex items-center">
            Draft
          </span>
            </>
          ) : (
            <>
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          <span className="text-sm font-normal flex items-center">
            Published 
          </span>
            </>
          )}  
          
         
        </div>
      <CardHeader className="flex">
        <div className="flex items-start justify-between">
          <div className="flex">
            <div >
              
              {image ? (
                <Image
                className="h-[60px] w-[60px] rounded-full object-cover object-center"
                src={image}
                alt="Neil image"
                width={60}
                height={60}
              />
                ):(
                  <div className="app_icon">
                  <ImageIcon className="h-[40px] w-[40px] rounded-full" />
                  </div>
                )
              }
              
              
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
              <div className="flex flex-col p-1">
                  {/* Edit Option */}
                  <DropdownMenuItem asChild>
                    <Link href={`/builder/${id}`} className="flex items-center p-1 hover:bg-gray-100">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  {/* Copy Option*/}
                  <DropdownMenuItem asChild>
                    <CopyMagnet id={id} onClone={onClone} />
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
        {description &&
                <>
                  <span className="text-sm app_description" dangerouslySetInnerHTML={{ __html: marked(description.slice(0,200)) }} />
                  
                  </>
                }
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
