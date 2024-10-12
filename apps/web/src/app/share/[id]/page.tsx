import { getLeadMagnetById } from "@smartleadmagnet/services";
import Share from "@/components/Share";

export default async function Page({ params }: { params: { id: string } }) {
  const leadMagnet = await getLeadMagnetById(params.id);

  return <Share leadMagnet={leadMagnet} />;
}
