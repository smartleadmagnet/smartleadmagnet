import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@smartleadmagnet/ui/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@smartleadmagnet/ui/components/ui/card";
import { signIn } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function AuthenticationPage() {
  return (
    <>
      <div className="container relative  h-[100vh] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Acme Inc
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                Boost your conversions with intelligent, customizable lead
                magnets that capture your audience’s attention and grow your
                business.
              </p>
              <footer className="text-sm">Smart Lead Magnet Team</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8 h-[100vh] items-center justify-center flex">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Use your Google account to sign up.
              </p>
            </div>
            <Card className="w-full max-w-sm m-auto">
              <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>This is only for few people.</CardDescription>
              </CardHeader>
              <CardFooter>
                <form
                  action={async () => {
                    "use server";
                    await signIn("google", {
                      redirectTo: "/",
                    });
                  }}
                  className="w-full"
                >
                  <Button className="w-full btn-primary" >Sign in with Google</Button>
                </form>
              </CardFooter>
            </Card>
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
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
