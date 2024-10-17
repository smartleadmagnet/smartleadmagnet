import { Button } from "@smartleadmagnet/ui/components/ui/button";
import { Separator } from "@smartleadmagnet/ui/components/ui/separator";
import { createLead, getByUser } from "@/actions/lead-magnet";
import { redirect } from "next/navigation";
import AppCard from "@/components/AppCard";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@smartleadmagnet/ui/components/ui/select";

export default async function MyForms() {
  const leads = await getByUser();

  const onCreate = async () => {
    "use server";
    const lead = await createLead();
    redirect(`/builder/${lead?.id!}`);
  };

  return (
    <div className="flex size-full flex-col px-5">
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Magnets</h1>
          <p className="text-muted-foreground">Here&apos;s a list of your magnets!</p>
        </div>
        <div className="my-4 flex items-end justify-between sm:my-0 sm:items-center">
          <div className="flex flex-col gap-4 sm:my-4 sm:flex-row"></div>
          <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="apple">Published</SelectItem>
          <SelectItem value="banana">Draft</SelectItem>
          
        </SelectGroup>
      </SelectContent>
    </Select>
          
        </div>
      </div>
      <Separator className="mt-3 w-full shadow" />
      <ul className="faded-bottom no-scrollbar grid gap-4 overflow-auto pb-16 pt-4 md:grid-cols-2 lg:grid-cols-3">
        {leads.map((lead: any) => (
          <li key={lead.id}>
            <AppCard
              id={lead.id}
              name={lead.name}
              description={lead.description}
              analytics={{ impressions: lead.impressionsCount, used: lead.usedCount }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
