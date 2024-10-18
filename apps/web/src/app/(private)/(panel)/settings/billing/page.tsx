import { Separator } from "@smartleadmagnet/ui/components/ui/separator";
import { Button } from "@smartleadmagnet/ui/components/ui/button";
import { getUserInfo } from "@/actions/user";
import { getUserPayments } from "@smartleadmagnet/services";
import { Payment } from "@smartleadmagnet/database";
import { getPlanName, PlanTier } from "@/lib/types";
import { format } from "date-fns";

export default async function SettingsNotificationsPage() {
  const user = await getUserInfo();
  const payments = (await getUserPayments(user?.id!)) || [];
  const planInfo = payments?.find((payment: Payment) => payment.planType !== PlanTier.CREDIT);
  console.log({ user, valid: planInfo.planTier === PlanTier.SUBSCRIPTION }, planInfo.planTier, PlanTier.SUBSCRIPTION);
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Billing</h3>
        <p className="text-muted-foreground text-sm">Manage your billing information.</p>
      </div>
      <Separator />
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Plan Type: {getPlanName(planInfo?.planType)}</h3>
        <div className="flex flex-row items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <p className="text-base font-bold">Purchased On: {format(new Date(planInfo.createdAt), "dd MMM yyyy")}</p>
            {planInfo.planType === PlanTier.SUBSCRIPTION && (
              <p>Credits are in subscription plan will reset every billing cycle.</p>
            )}
          </div>
          <div>
            {planInfo.planType === PlanTier.SUBSCRIPTION && (
              <Button className="bg-red-600 hover:bg-red-900">Cancel Subscription</Button>
            )}
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Lead Magnet Credits:</h3>
        <div className="flex flex-row items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <p className="text-base font-bold">Remaining Credit: {user.Credit?.total - user?.Credit?.used}</p>
          </div>
          <div>
            <Button className="btn-primary mr-5">Buy More Credits</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
