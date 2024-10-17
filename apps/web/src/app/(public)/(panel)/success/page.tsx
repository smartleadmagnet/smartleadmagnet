import { Button } from "@smartleadmagnet/ui/components/ui/button";
import {  CardContent, CardHeader, CardTitle, CardDescription } from "@smartleadmagnet/ui/components/ui/card";
import Image from "next/image";
import ConfettiBackground from "@smartleadmagnet/ui/components/ConfettiBackground"; 

export default function PaymentSuccessPage() {
  return (
    <div className="bg-white">
    <div className="container mx-auto px-4 py-[60px] relative" >
     
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Title, Content, and Buttons */}
          <div className="flex flex-col justify-center">
            <CardHeader>
              <CardTitle className="text-3xl font-semibold">Payment Successful!</CardTitle>
              <CardDescription className="mt-4 text-lg">
                Thank you for your purchase. Your payment was successfully processed.
                You will receive an email confirmation shortly.
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-6 space-y-4">
              <Button className="btn-primary btn-lg mr-5" >
                Embed your first magnet
              </Button>
              <Button  variant="secondary">
                Go to your profile
              </Button>
            </CardContent>
          </div>
      <ConfettiBackground/>
          {/* Right Column - Image */}
          <div className="flex justify-center">
            <Image
              src="/images/success_page.png"
              alt="Payment Success"
              width={400}
              height={400}
            />
          </div>
        </div>
      
    </div>
    </div>
  );
}
