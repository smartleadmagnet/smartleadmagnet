import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

interface Props {
	name: string,
	description: string,
	analytics?: {
		impressions: number,
		used: number,
	}
}

export default function AppCard({ name, description, analytics }: Props) {
	return (
		<Card className="p-4">
			<CardHeader className="flex items-start">
				<div>
					<CardTitle>{name}</CardTitle>
					<CardDescription>
						{description}
					</CardDescription>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon">
							<MoreHorizontal className="w-5 h-5" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem>Edit</DropdownMenuItem>
						<DropdownMenuItem>Delete</DropdownMenuItem>
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