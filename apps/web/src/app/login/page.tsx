import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import LoginClientSection from "@/components/Homepage/LoginClientSection";
import { Button } from "@smartleadmagnet/ui/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@smartleadmagnet/ui/components/ui/card";
import { signIn } from "@/lib/auth";
import MagicLinkForm from "@/components/MagicLinkForm";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

interface Props {
  searchParams?: {
    callbackUrl?: string;
  };
}

export default function AuthenticationPage({ searchParams }: Props) {
  return (
    <>
      <div className="container relative  h-[100vh] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="flex  justify-center bg-muted relative hidden h-full flex-col  text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          
          <LoginClientSection/>
          
          
          <div className="area login-area" >
            <ul className="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
    </div >
        </div>
        <div className="flex h-[100vh] items-center justify-center lg:p-8 login-form-area bg-gray-900 relative">
        <div className="z-20 flex items-center text-lg font-medium p-10 absolute top-0 justify-center text-center w-full">
            <Link href="/">
              <Image src="/images/logo/logo.png" alt="Logo" width={200} height={0} />
            </Link>
          </div>
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          
            <Card className="m-auto w-full max-w-sm bg-white">
              <CardHeader>
                <CardTitle className="text-2xl">Sign In or Register to Get Started</CardTitle>
              </CardHeader>
              <CardContent className="pb-3">
                <MagicLinkForm
                  id="email"
                  callbackUrl={searchParams?.callbackUrl ? decodeURIComponent(searchParams.callbackUrl) : "/"}
                  buttonClass="mt-4 tracking-wide font-semibold btn btn-primary w-full rounded hover:btn-primary transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  inputClass="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  buttonTitle="Get Code to Log In"
                  placeholder="Email Address"
                />
                <div className="flex items-center">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="mx-4 text-gray-600">or</span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>
              </CardContent>
              <CardFooter>
                <form
                  action={async () => {
                    "use server";
                    await signIn("google", {
                      redirectTo: searchParams?.callbackUrl ? decodeURIComponent(searchParams.callbackUrl) : "/",
                    });
                  }}
                  className="w-full"
                >
                  <Button className="text-gray flex w-full items-center justify-center  rounded rounded border border-gray-300  bg-white hover:bg-gray-100">
                    <Image src="/images/google-icon.svg" alt="Google Icon" className="mr-2" width={20} height={20} />
                    Sign in with Google
                  </Button>
                </form>
                
              </CardFooter>
            </Card>
            
          </div>
        </div>
      </div>
    </>
  );
}
