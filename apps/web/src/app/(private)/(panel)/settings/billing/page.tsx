import { Separator } from "@smartleadmagnet/ui/components/ui/separator";
import { Button } from "@smartleadmagnet/ui/components/ui/button";
import { getUserInfo } from "@/actions/user";
import { getUserPayments } from "@smartleadmagnet/services";
import { Payment } from "@smartleadmagnet/database";
import { getPlanName, PlanTier } from "@/lib/types";
import { format } from "date-fns";
import Link from "next/link";
import CancelSubscription from "@/components/CancelSubscription";

export default async function BillingPage() {
  const user = await getUserInfo();
  const payments = (await getUserPayments(user?.id!)) || [];
  const planInfo = payments?.find((payment: Payment) => payment.planType !== PlanTier.CREDIT);
  const availableCredit = (user.Credit?.total || 0) - (user?.Credit?.used || 0);
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Billing</h3>
        <p className="text-muted-foreground text-sm">Manage your billing information.</p>
      </div>
      <Separator />
      <div className="space-y-2">
        <h3 className="flex flex-row items-center justify-start text-lg font-medium">
          Plan Type: {getPlanName(planInfo?.planType)}
          {planInfo?.subscriptionStatus === "active" && "(Active)"}
          {planInfo?.subscriptionStatus === "canceled" && <div className="ml-2 text-red-500">(Canceled)</div>}
        </h3>
        {planInfo && (
          <div className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <p className="text-base font-bold">
                Purchased On: {format(new Date(planInfo?.createdAt), "dd MMM yyyy")}{" "}
              </p>
              {planInfo?.planType === PlanTier.SUBSCRIPTION && planInfo?.subscriptionStatus === "active" && (
                <p>Credits are in subscription plan will reset every billing cycle.</p>
              )}
              {planInfo?.planType === PlanTier.SUBSCRIPTION &&
                planInfo?.subscriptionStatus === "canceled" &&
                availableCredit > 0 && (
                  <p>Credits will be expired on {format(new Date(planInfo?.subscriptionEndDate), "dd MMM yyyy")}</p>
                )}
            </div>
            <div>
              {planInfo?.planType === PlanTier.SUBSCRIPTION && planInfo?.subscriptionStatus === "active" && (
                <CancelSubscription id={planInfo?.subscriptionId} />
              )}
            </div>
          </div>
        )}
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Lead Magnet Credits:</h3>
        <div className="flex flex-row items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            {user.Credit && <p className="text-base font-bold">Remaining Credit: {availableCredit}</p>}
            {!user.Credit && <p className="text-base font-bold">No Credit</p>}
          </div>
          <div>
            {planInfo?.subscriptionStatus !== "canceled" && (
              <>
                {!user.Credit && (
                  <Link href="/pricing">
                    <Button className="btn-primary mr-5">Choose Plan</Button>
                  </Link>
                )}
                {user.Credit && (
                  <Link href="/buy-credits">
                    <Button className="btn-primary mr-5">Buy More Credits</Button>
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      {/* Billing history */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Billing History:</h3>
          <table className="min-w-full rounded-lg border border-gray-200 bg-white">
            <thead>
              <tr>
                <th className="border-b px-4 py-2 text-left text-sm font-medium text-gray-700">Date</th>
                <th className="border-b px-4 py-2 text-left text-sm font-medium text-gray-700">Amount</th>
                <th className="border-b px-4 py-2 text-left text-sm font-medium text-gray-700">Plan</th>
                <th className="border-b px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment: Payment, index: number) => (
                <tr key={index} className={`hover:bg-gray-100 ${index % 2 === 0 ? "odd:bg-gray-50" : ""}`}>
                  <td className="whitespace-nowrap border-b px-4 py-2">{format(new Date(payment.createdAt), "dd MMM yyyy")}</td>
                  <td className="whitespace-nowrap border-b px-4 py-2">{payment.price}</td>
                  <td className="whitespace-nowrap border-b px-4 py-2">{getPlanName(payment.planType)}</td>
                  <td className="whitespace-nowrap border-b px-4 py-2">{payment.subscriptionStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        
        </div>
    </div>
  );
}
