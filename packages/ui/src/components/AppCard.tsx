import React from "react";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

interface Props {
	id: string,
	name: string,
	description: string,
	analytics?: {
		impressions: number,
		used: number,
	}
}

export default function AppCard({id, name, description, analytics}: Props) {
	return (
		<Card className="p-4">
			<CardHeader className="flex flex-row justify-between items-start">
				<div>
					<CardTitle>{name}</CardTitle>
					<CardDescription>
						{description}
					</CardDescription>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="flex flex-row items-center justify-between">
							<span>Actions</span>
							<ChevronDown className="h-4 w-4  ml-5"/>
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
			</CardHeader>
			<CardContent className="flex flex-row">
				<div className="text-center">
					<p className="text-sm font-medium">Impression</p>
					<p className="text-lg font-bold">{analytics?.impressions || 0}</p>
				</div>
				<div className="text-center">
					<p className="text-sm font-medium">Usage Count</p>
					<p className="text-lg font-bold">{analytics?.used || 0}</p>
				</div>
			</CardContent>
		</Card>
	);
}