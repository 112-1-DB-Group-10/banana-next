import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { getUserSession } from '@/lib/session';
import './globals.css';
import NavBar from './navbar';
import { Toaster } from "@/components/ui/toaster"
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getUserSession();
  console.log(
    `Session of user '${session.username}' (${session.user_id}) is obtained.`,
  );
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex h-screen w-screen flex-col items-center justify-around">
          <NavBar />
          <div className="flex w-screen flex-1 justify-around py-24">
            {children}
          </div>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
