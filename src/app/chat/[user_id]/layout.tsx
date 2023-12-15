'use server';

import { Card } from '@/components/ui/card';

export default async function ChatBoxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Card className="flex h-[35rem] w-[50rem] justify-around overflow-y-scroll p-4">
      {children}
    </Card>
  );
}
