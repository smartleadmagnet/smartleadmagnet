import { Button } from "@smartleadmagnet/ui/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@smartleadmagnet/ui/components/ui/dropdown-menu";
import { getSessionUser } from "@/services/user";
import React from "react";
import { signOut } from "@/lib/auth";

export async function User() {
  let user = await getSessionUser();

  console.log({ user });

  if (!user) {
    return (
      <div className="hidden gap-2 md:flex">
        <Link
          href="/login"
          className="rounded-lg bg-cyan-500 px-6 py-3 font-bold text-white  hover:bg-cyan-600 sm:px-10 sm:py-4 "
        >
          Login
        </Link>
        <Link
          href="/login"
          className="rounded-lg border-2 border-cyan-500 px-6 py-3 font-bold text-cyan-500  hover:bg-cyan-500 hover:text-white sm:px-8 sm:py-4"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
          <Image
            src={user.image ?? "/placeholder-user.jpg"}
            width={36}
            height={36}
            alt="Avatar"
            className="overflow-hidden rounded-full"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/my-forms">My Forms</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <form
            action={async () => {
              "use server";
              await signOut({
                redirectTo: "/login",
              });
            }}
            className="w-full"
          >
            <Button className="w-full">Logout</Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
