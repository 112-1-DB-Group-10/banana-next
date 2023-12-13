'use server';

import { getUserSession } from '@/lib/session';

export default async function HomePage() {
  const session = await getUserSession();
  console.log(session);
  return <div>Home</div>;
}
