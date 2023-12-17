'use server';

import * as React from 'react';
import Image from 'next/image';
import { CardData, UserProfile } from '@/actions/types';
import { Button } from '@/components/ui/button';

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

const ProfileInfo = ({user}: {user: UserProfile}) => {
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
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    使用者名稱
                  </Label>
                  <Input
                    id="name"
                    value={user.username}
                    className="col-span-3"
                  />
                </div>
                {/* <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <Input
                    id="username"
                    value="@peduarte"
                    className="col-span-3"
                  />
                </div> */}
              </div>
              <DialogFooter>
                <Button type="submit">儲存變更</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      </>
    )
}

export default ProfileInfo