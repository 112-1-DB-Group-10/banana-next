'use server';

import Link from 'next/link';
import { UserProfile } from '@/actions/types';
import Avatar from '@/components/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { getUserSession } from '@/lib/session';
import ProfileEdit from './profile-edit';

const ProfileInfo = async ({ user }: { user: UserProfile }) => {
  const session = await getUserSession();
  return (
    <Dialog>
      <div className="flex justify-between px-4">
        <div className="flex">
          <div className="relative p-4">
            <Avatar image={user.avatar} />
          </div>
          <div className="flex flex-col p-4">
            <div className="flex">
              <div className="pr-2 text-lg font-bold">{user.username}</div>
              <Separator orientation="vertical" />
              <div className="px-2">{user.sex == 'female' ? '女' : '男'}</div>
              <Separator orientation="vertical" />
              <div className="px-2">{user.age} 歲</div>
              <Separator orientation="vertical" />
              <div className="pl-2">
                {user.institute == null ? '' : user.institute}
              </div>
            </div>
            <div className="py-2">{user.email}</div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <Link href="/application" passHref>
            <Button variant="outline">驗證學生身份</Button>
          </Link>
          <DialogTrigger asChild>
            <Button variant="outline">修改個人資料</Button>
          </DialogTrigger>
        </div>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>修改個人資料</DialogTitle>
            <DialogDescription>在此修改個人資料</DialogDescription>
          </DialogHeader>
          <ProfileEdit
            user_id={session.user_id}
            username={session.username}
            sex={session.sex}
            age={session.age}
          />
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default ProfileInfo;
