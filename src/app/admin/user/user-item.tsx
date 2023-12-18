'use client';

import Image from 'next/image';
import { UserProfile } from '@/actions/types';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { isURL } from '@/lib/utils';

const UserItem = ({ user }: { user: UserProfile }) => {
  const handleSuspendUser = async () => {
    // confirm
  };
  return (
    <div className="flex h-[4.5rem] flex-row items-center justify-between">
      <AlertDialog>
        <div className="flex flex-row">
          <Image
            src={
              isURL(user.avatar)
                ? user.avatar
                : `data:image/png;base64,${user.avatar}`
            }
            alt="User Avatar"
            width={50}
            height={50}
          />
          <div className="w-[10rem] p-4 font-bold">{user.username}</div>
          <div className="p-4">{user.sex == 'female' ? '女' : '男'}</div>
          <div className="w-[3rem] p-4">{user.age}</div>
          <div className="w-[14rem] p-4">{user.email}</div>
          <div className="w-[10rem] p-4">{user.institute}</div>
          <div className="w-[8rem] p-4">
            {user.suspended ? '已停權' : '一般用戶'}
          </div>
        </div>
        <AlertDialogTrigger asChild>
          <Button onClick={handleSuspendUser} variant="outline">
            停權此用戶
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>確定要停權此用戶嗎？</AlertDialogTitle>
            <AlertDialogDescription>
              這樣他很可憐欸，你確定嗎qq？
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>好吧那算了</AlertDialogCancel>
            <AlertDialogAction>確定我不管</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
export default UserItem;
