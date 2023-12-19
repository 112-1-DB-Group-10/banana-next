'use client';

import { UUID } from 'crypto';
import { suspendUser } from '@/actions/adminActions';
import { UserProfile } from '@/actions/types';
import { deleteLabel } from '@/actions/adminActions';
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

const DeleteLableItem = ({ label }: { label: string }) => {
  const handleDeleteLabel = async () => {
    // const s = await suspendUser(user.user_id as UUID);
    // console.log(`Suspended user ${user.user_id}`);
    // console.log(s);
    await deleteLabel(label);
  };
  return (
    <div className="flex h-[2rem] w-full flex-row items-center">
      <AlertDialog>
        <div className="flex flex-row items-center">
        </div>
        <AlertDialogTrigger asChild>
          <Button variant="outline">{label}</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>確定要刪除此標籤嗎？</AlertDialogTitle>
            <AlertDialogDescription>
              這樣這個標籤很可憐欸，你確定嗎qq？
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>好吧那算了</AlertDialogCancel>
            <form onSubmit={handleDeleteLabel}>
              <AlertDialogAction type="submit">確定我不管</AlertDialogAction>
            </form>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
export default DeleteLableItem;
