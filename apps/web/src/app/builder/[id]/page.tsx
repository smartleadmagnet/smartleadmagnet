import { getLeadMagnetById } from "@smartleadmagnet/services";
import BuilderContainer from "@/app/builder/[id]/BuilderContainer";

export default async function Page({params}: { params: { id: string } }) {
  const leadMagnet = await getLeadMagnetById(params.id);
  return <BuilderContainer leadMagnet={leadMagnet}/>
}
