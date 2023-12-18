'use client';

import { UUID } from 'crypto';
import { suspendUser } from '@/actions/adminActions';
import { UserProfile } from '@/actions/types';
import Avatar from '@/components/avatar';
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

const UserItem = ({ user }: { user: UserProfile }) => {
  const handleSuspendUser = async () => {
    const s = await suspendUser(user.user_id as UUID);
    console.log(`Suspended user ${user.user_id}`);
    console.log(s);
  };
  return (
    <div className="flex h-[4.5rem] w-full flex-row items-center justify-between">
      <AlertDialog>
        <div className="flex flex-row">
          <Avatar userId={user.user_id} image={user.avatar} />
          <div className="w-[10rem] p-4 font-bold">{user.username}</div>
          <div className="p-4">{user.sex === 'female' ? '女' : '男'}</div>
          <div className="w-[3rem] p-4">{user.age}</div>
          <div className="w-[14rem] overflow-hidden truncate p-4">
            {user.email}
          </div>
          <div className="w-[10rem] p-4">{user.institute}</div>
          <div className="w-[8rem] p-4">
            {user.suspended ? '已停權' : '一般用戶'}
          </div>
        </div>
        <AlertDialogTrigger asChild>
          <Button variant="outline">停權此用戶</Button>
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
            <form onSubmit={handleSuspendUser}>
              <AlertDialogAction type="submit">確定我不管</AlertDialogAction>
            </form>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
export default UserItem;
