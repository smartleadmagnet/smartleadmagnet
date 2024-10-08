import { Button } from "@smartleadmagnet/ui/components/ui/button";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@smartleadmagnet/ui/components/ui/card';
import { signIn } from '@/lib/auth';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex justify-center items-start md:items-center p-8">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            This is only for few people.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <form
            action={async () => {
              'use server';
              await signIn('google', {
                redirectTo: '/'
              });
            }}
            className="w-full"
          >
            <Button className="w-full">Sign in with Google</Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
