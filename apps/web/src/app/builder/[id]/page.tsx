import Builder from "@/components/Builder";
import { getLeadMagnetById } from "@smartleadmagnet/services";


export default async function Page({ params }: { params: { id: string } }) {
	const leadMagnet = await getLeadMagnetById(params.id);
	
	console.log({ leadMagnet });
	
	return <Builder leadMagnet={leadMagnet} />
}
