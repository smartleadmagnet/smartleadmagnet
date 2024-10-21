import { getLeadMagnetById, getUserById, updateLeadMagnetImpressions } from "@smartleadmagnet/services";
import BuilderContainer from "@/app/share/[id]/BuilderContainer";


export default async function Page({ params }: { params: { id: string } }) {
  const leadMagnet = await getLeadMagnetById(params.id);
  const user = await getUserById(leadMagnet?.userId);
  if (!user.Credit || !(user?.Credit?.total || 0) > (user?.Credit?.used || 0)) {
    return <div>Not enough credits</div>;
  }

  await updateLeadMagnetImpressions(params.id);

  

  return <BuilderContainer leadMagnet={leadMagnet} />;
}
