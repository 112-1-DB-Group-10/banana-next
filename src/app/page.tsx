import { auth } from '@/lib/auth';

export default async function HomePage() {
  const session = await auth();
  console.log('session', session);
  return <>Next App</>;
}
