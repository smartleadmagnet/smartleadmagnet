import { auth } from '@/lib/auth';

export const getSessionUser = async () => {
  const session = await auth();
  // @ts-ignore
  return session?.user;
};
