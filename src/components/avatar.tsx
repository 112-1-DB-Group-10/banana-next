'use client';

import Image from 'next/image';
import { hextoASCII, isURL } from '@/lib/utils';

const Avatar = ({ image }: { image: string }) => {
  return (
    <Image
      width={100}
      height={100}
      src={
        isURL(image)
          ? image
          : `data:image/png;base64,${hextoASCII(image.slice(2))}`
      }
      className="h-12 w-12 rounded-full object-cover"
      alt="Avatar"
    />
  );
};

export default Avatar;
