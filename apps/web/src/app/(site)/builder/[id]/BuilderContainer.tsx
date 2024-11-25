import { BuilderProvider } from "@/providers/BuilderProvider";
import Builder from "@/components/Builder";
import { LeadMagnet } from "@smartleadmagnet/database";

export default function BuilderContainer({ leadMagnet, user }: { leadMagnet: LeadMagnet; user?: any }) {
  return (
    <BuilderProvider leadMagnet={leadMagnet}>
      <Builder user={user} />
    </BuilderProvider>
  );
}
