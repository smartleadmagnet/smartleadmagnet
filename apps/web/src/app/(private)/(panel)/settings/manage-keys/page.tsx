import ManageKeys from "@/components/ManageKeys";
import { getApiKeys } from "@/actions/api-keys";

export default async function Page() {
  const apiKeys = await getApiKeys();
  return <ManageKeys apiKeys={apiKeys} />;
}
