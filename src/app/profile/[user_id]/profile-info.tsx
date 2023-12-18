'use server';

import * as React from 'react';
import Image from 'next/image';
import { CardData, UserProfile } from '@/actions/types';
import { Button } from '@/components/ui/button';
import { getUserSession } from '@/lib/session';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Separator } from '@/components/ui/separator';

import { isURL } from '@/lib/utils';
import ProfileEdit from './profile-edit';

const ProfileInfo = async ({user}: {user: UserProfile}) => {
  const session = await getUserSession()
    return (
      <>
        <div className="flex justify-between px-4">
          <div className="flex">
            <div className="relative p-4">
              <Image
                src={
                  isURL(user.avatar)
                    ? user.avatar
                    : `data:image/png;base64,${user.avatar}`
                }
                alt="User Avatar"
                width={70}
                height={70}
              />
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
          <div className="p-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">修改個人資料</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>修改個人資料</DialogTitle>
                  <DialogDescription>在此修改個人資料</DialogDescription>
                </DialogHeader>
                <ProfileEdit user_id={session.user_id} username={session.username} sex={session.sex} age={session.age}/>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </>
    )
}

export default ProfileInfo