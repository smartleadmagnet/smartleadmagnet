import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

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
        <div className="bg-muted relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Link href="/">
              <Image src="/images/logo/logo.png" alt="Logo" width={200} height={0} />
            </Link>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                Boost your conversions with intelligent, customizable lead magnets that capture your audience’s
                attention and grow your business.
              </p>
              <footer className="text-sm">Smart Lead Magnet Team</footer>
            </blockquote>
          </div>
        </div>
        <div className="flex h-[100vh] items-center justify-center lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <Card className="m-auto w-full max-w-sm">
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
            <p className="text-muted-foreground px-8 text-center text-sm">
              By clicking continue, you agree to our{" "}
              <Link href="/terms" className="hover:text-primary underline underline-offset-4">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="hover:text-primary underline underline-offset-4">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
