'use server';

export default async function ChatBoxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center items-center">
      {children}
    </div>
  );
}
