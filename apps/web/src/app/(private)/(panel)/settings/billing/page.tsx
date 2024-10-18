import { Separator } from "@smartleadmagnet/ui/components/ui/separator";
import {Button } from "@smartleadmagnet/ui/components/ui/button";
import { getUserInfo } from "@/actions/user";

export default function SettingsNotificationsPage() {
  const user = getUserInfo();
  console.log({user});
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Billing</h3>
        <p className="text-muted-foreground text-sm">
          Manage your billing information.
        </p>
      </div>
      <Separator />
      <div className="space-y-2">
      <h3 className="text-lg font-medium">Lead Magnet Credits</h3>
      <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <p className="text-base font-bold">100</p>
                    <p>Credits are in subscription plan will reset every billing cycle.</p>
                  </div>
                  
                  <div>
                    <Button className="btn-primary mr-5">
                      Buy More Credits
                      </Button>
                      
                  </div>
      </div>
      </div>
      <div className="space-y-2">
      <h3 className="text-lg font-medium">Active Subscription</h3>
      <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <p className="text-base font-bold">Monthly ($30)</p>
                    <p>This is some info about your subscription</p>
                  </div>
                  
                  <div>
                    <Button className="btn-primary mr-5">
                      UPGRADE
                      </Button>
                      <Button className="bg-red-600 hover:bg-red-900">
                      Cancel Subscription
                      </Button>
                  </div>
      </div>
      </div>
    </div>
  );
}
