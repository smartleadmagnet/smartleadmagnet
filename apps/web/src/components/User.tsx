"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@smartleadmagnet/ui/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@smartleadmagnet/ui/components/ui/avatar";
import { useRouter } from "next/navigation";
import Spinner from "@smartleadmagnet/ui/components/Spinner";
import { signOut } from "next-auth/react";
import BuildNewMagnet from "@/components/BuildNewMagnet";

export default function User() {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Client-side API call to get user session
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/user"); // Update this endpoint as necessary
        if (response.ok) {
          const userData = await response.json();
          setUser(userData?.data);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  if (loading) {
    return <Spinner className="h-5 w-5 animate-spin" aria-hidden="true" />;
  }

  if (!user?.id) {
    return (
      <div className="hidden gap-2 md:block">
        <Link
          href="/login"
          className="mr-4 rounded-lg border-2  border-cyan-500 bg-cyan-500 px-3 py-2 font-bold  text-white hover:bg-cyan-600 sm:px-10  sm:py-4"
        >
          Login
        </Link>
        <Link
          href="/login"
          className="rounded-lg border-2 border-cyan-500 px-3 py-2 font-bold text-cyan-500  hover:bg-cyan-500 hover:text-white sm:px-8 sm:py-4"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className=" mr-3 flex justify-end">
        <BuildNewMagnet title="Build New Magnet" />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarImage src={user?.image} alt={user?.name} />
            <AvatarFallback>{(user?.name || user?.email).substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/my-magnets">My Magnets</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/settings">Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <button onClick={handleSignOut} className="w-full">
              Logout
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
