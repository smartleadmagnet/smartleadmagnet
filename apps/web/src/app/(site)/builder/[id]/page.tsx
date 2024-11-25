import { getLeadMagnetById } from "@smartleadmagnet/services";
import BuilderContainer from "./BuilderContainer";
import { getSessionUser } from "@/services/user";

export default async function Page({ params }: { params: { id: string } }) {
  const leadMagnet = await getLeadMagnetById(params.id);
  const user = await getSessionUser();
  return <BuilderContainer leadMagnet={leadMagnet} user={user} />;
}
