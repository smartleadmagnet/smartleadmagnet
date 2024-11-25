import { CardContent, CardDescription, CardHeader, CardTitle } from "@smartleadmagnet/ui/components/ui/card";
import Image from "next/image";
import ConfettiBackground from "@smartleadmagnet/ui/components/ConfettiBackground";
import { Button } from "@smartleadmagnet/ui/components/ui/button";
import Link from "next/link";

export const dynamic = "force-static";

export default function PaymentSuccessPage() {
  return (
    <div className="bg-white">
      <div className="container relative mx-auto px-4 py-[60px]">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="z-10 flex flex-col justify-center">
            <CardHeader>
              <CardTitle className="text-3xl font-semibold">Payment Successful!</CardTitle>
              <CardDescription className="mt-4 text-lg">
                Thank you for your purchase. Your payment was successfully processed. You will receive an email
                confirmation shortly.
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-6 space-y-4">
              <Link href="/">
                <Button className="btn btn-primary mr-5 rounded-md p-2">Embed your first magnet</Button>
              </Link>
              <Link href="/settings/billing">
                <Button variant="outline" className="ml-5 p-2 px-4">
                  Go to Billing
                </Button>
              </Link>
            </CardContent>
          </div>
          <ConfettiBackground />
          <div className="flex justify-center">
            <Image src="/images/success_page.png" alt="Payment Success" width={400} height={400} />
          </div>
        </div>
      </div>
    </div>
  );
}
