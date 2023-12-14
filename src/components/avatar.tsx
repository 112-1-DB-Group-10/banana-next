'use client';

import Image from 'next/image';
import { User } from '@/db/types';
import { isURL } from '@/lib/utils';

const Avatar = ({ user }: { user: User }) => {
  return (
    <Image
      width={100}
      height={100}
      src={
        isURL(user.avatar)
          ? user.avatar
          : `data:image/png;base64,${user.avatar}`
      }
      className="h-12 w-12 rounded-full object-cover"
      alt={`Avatar of user ${user.username}`}
    />
  );
};

export default Avatar;
