'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { cn, hextoASCII, isURL } from '@/lib/utils';

const Avatar = ({ userId, image }: { userId?: string; image: string }) => {
  const router = useRouter();
  const handleClick = async () => {
    if (userId) {
      router.push(`/profile/${userId}/`);
    }
  };
  return (
    <Image
      width={100}
      height={100}
      src={
        isURL(image)
          ? image
          : `data:image/png;base64,${hextoASCII(image.slice(2))}`
      }
      className={cn(
        'h-12 w-12 rounded-full object-cover',
        userId && 'cursor-pointer',
      )}
      alt="Avatar"
      onClick={handleClick}
    />
  );
};

export default Avatar;
