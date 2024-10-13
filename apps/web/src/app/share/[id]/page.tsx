import { getLeadMagnetById, updateLeadMagnetImpressions } from "@smartleadmagnet/services";
import BuilderContainer from "@/app/share/[id]/BuilderContainer";

export default async function Page({ params }: { params: { id: string } }) {
  const leadMagnet = await getLeadMagnetById(params.id);
  // await updateLeadMagnetImpressions(params.id);

  return <BuilderContainer leadMagnet={leadMagnet} />;
}
