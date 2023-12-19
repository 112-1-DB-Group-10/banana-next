'use server';

export default async function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex items-center justify-center">{children}</div>;
}
