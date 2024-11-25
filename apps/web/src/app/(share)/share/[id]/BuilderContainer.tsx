import { LeadMagnet } from "@smartleadmagnet/database";
import { BuilderProvider } from "@/providers/BuilderProvider";
import BuilderElementPreview from "@/components/Share";

export default function BuilderContainer({ leadMagnet }: { leadMagnet: LeadMagnet }) {
  return (
    <BuilderProvider leadMagnet={leadMagnet}>
      <BuilderElementPreview />
    </BuilderProvider>
  );
}
