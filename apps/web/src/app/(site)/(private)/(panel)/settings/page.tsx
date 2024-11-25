import { Separator } from "@smartleadmagnet/ui/components/ui/separator";
import { ProfileForm } from "./profile-form";
import { getUserInfo } from "@/actions/user";

export default async function SettingsProfilePage() {
  const user = await getUserInfo();
  console.log(user);
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-muted-foreground text-sm">This is how others will see you on the site.</p>
      </div>
      <Separator />
      <ProfileForm user={user} />
    </div>
  );
}
