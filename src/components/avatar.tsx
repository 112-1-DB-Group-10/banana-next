'use client';

import Image from 'next/image';
import { isURL } from '@/lib/utils';

const Avatar = ({ image }: { image: string }) => {
  return (
    <Image
      width={100}
      height={100}
      src={isURL(image) ? image : `data:image/png;base64,${image}`}
      className="h-12 w-12 rounded-full object-cover"
      alt="Avatar"
    />
  );
};

export default Avatar;
