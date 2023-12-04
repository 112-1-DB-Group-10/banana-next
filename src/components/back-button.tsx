'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@radix-ui/react-icons';

export default function BackButton() {
  const router = useRouter();
  return (
    <button className="text-[#0084ff]" onClick={() => router.back()}>
      <ArrowLeftIcon className="h-5 w-5 shrink-0" />
    </button>
  );
}
