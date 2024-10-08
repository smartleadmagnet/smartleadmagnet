import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
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
      <CardHeader className="flex">
        <div className="flex justify-between items-start">
          <div className="flex">
            <div className="flex-shrink-0">
              <img
                className="w-[60px] h-[60px] rounded-full"
                src="https://picsum.photos/seed/picsum/100/300"
                alt="Neil image"
                width={100}
                height={100}
              />
			  <CardTitle className="text-md truncate pt-2">{name}</CardTitle>
			  <CardDescription className="text-sm truncate">
				{description}
			  </CardDescription>
            </div>

            
          </div>
          <div className="inline-flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex flex-row items-center justify-between"
                >
                  <span>Actions</span>
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="flex flex-col p-1">
                  <Link
                    href={`/builder/${id}`}
                    className="p-1 hover:cursor hover:bg-gray-100"
                  >
                    Edit
                  </Link>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-0 bg-gray-200">
	<div className="flex items-center justify-center mb-4">
<div className="w-full h-px bg-gray-300 dark:bg-gray-600" />
</div>

        <dl className="grid max-w-screen-xl grid-cols-2">
          
          <div className="flex flex-col items-center justify-center" >
            <dt className="text-2xl font-extrabold">
              {analytics?.impressions || 0}
            </dt>
            <dd className="text-gray-500 dark:text-gray-400">Impressions</dd>
          </div>
          <div className="flex flex-col items-center justify-center">
            <dt className="mb-2 text-2xl font-extrabold">
              {analytics?.used || 0}
            </dt>
            <dd className="text-gray-500 dark:text-gray-400">Usage Count</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
