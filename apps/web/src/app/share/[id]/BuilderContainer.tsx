import { BuilderProvider } from "@/providers/BuilderProvider";
import { LeadMagnet } from "@smartleadmagnet/database";
import BuilderElementPreview from "@/components/Share";

export default function BuilderContainer({ leadMagnet }: { leadMagnet: LeadMagnet }) {
  return (
    <BuilderProvider leadMagnet={leadMagnet}>
      <BuilderElementPreview elementsList={leadMagnet.components} />
    </BuilderProvider>
  );
}
