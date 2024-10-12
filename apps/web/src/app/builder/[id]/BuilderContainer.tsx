import { BuilderProvider } from "@/providers/BuilderProvider";
import Builder from "@/components/Builder";
import { LeadMagnet } from "@smartleadmagnet/database";

export default function BuilderContainer({leadMagnet}: { leadMagnet: LeadMagnet }) {
  return (
    <BuilderProvider leadMagnet={leadMagnet}>
      <Builder leadMagnet={leadMagnet}/>
    </BuilderProvider>
  )
}
