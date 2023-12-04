import Countdown from '@/components/countdown';

export default function StoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex h-full flex-col items-center justify-center">
      <div className="absolute top-0 flex w-full gap-1 p-2">
        <Countdown />
      </div>
      {children}
    </div>
  );
}
