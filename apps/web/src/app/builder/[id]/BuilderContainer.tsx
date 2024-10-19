import { BuilderProvider } from "@/providers/BuilderProvider";
import Builder from "@/components/Builder";
import { LeadMagnet, User } from "@smartleadmagnet/database";

export default function BuilderContainer({ leadMagnet }: { leadMagnet: LeadMagnet; user?: User }) {
  return (
    <BuilderProvider leadMagnet={leadMagnet}>
      <Builder />
    </BuilderProvider>
  );
}
