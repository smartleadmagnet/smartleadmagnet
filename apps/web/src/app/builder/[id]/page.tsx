import Builder from "@/components/Builder";
import { getLeadMagnetById } from "@smartleadmagnet/services";


export default async function Page({ params }: { params: { id: string } }) {
	const leadMagnet = await getLeadMagnetById(params.id);
	return <Builder leadMagnet={leadMagnet} />
}
