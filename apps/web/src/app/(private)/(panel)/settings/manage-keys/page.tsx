import ManageKeys from "@/components/ManageKeys";
import { getApiKeys } from "@/actions/api-keys";
import { getUserInfo } from "@/actions/user";

export default async function Page() {
  const [apiKeys, user] = await Promise.all([getApiKeys(), getUserInfo()]);
  return <ManageKeys apiKeys={apiKeys} user={user!} />;
}
