'use server';

export default async function ChatBoxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex items-center justify-center">{children}</div>;
}
