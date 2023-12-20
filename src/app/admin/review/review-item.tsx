'use client';

import { updateApplication } from '@/actions/adminActions';
import { UserApplication } from '@/actions/types';
import Avatar from '@/components/avatar';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const ApplicationItem = ({ application }: { application: UserApplication }) => {
  const passApplication = async () => {
    await updateApplication(application, 'pass');
  };
  const failApplication = async () => {
    await updateApplication(application, 'fail');
  };
  return (
    <div className="flex h-[4.5rem] w-full flex-row items-center">
      <AlertDialog>
        <div className="flex w-[40rem] flex-row items-center justify-between">
          <Avatar userId={application.user_id} image={application.avatar} />
          <div className="w-[10rem] p-4 font-bold">{application.username}</div>
          <div className="w-[8rem] p-4 font-bold">{application.enrollYear}</div>
          <div className="w-[12rem] p-4">{application.institute}</div>
          <div className="w-[10rem] p-4 text-blue-600/100">
            <Link href={application.document_url}>點我查看</Link>
          </div>
          <div className="w-[8rem] p-4">
            {application.suspended ? '已停權' : '一般用戶'}
          </div>
        </div>
        <AlertDialogTrigger asChild>
          <Button variant="outline">審核</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>要給他 pass 還是 fail 呢</AlertDialogTitle>
            <AlertDialogDescription>想清楚啦想清楚啦</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <form onSubmit={passApplication}>
              <AlertDialogAction type="submit">
                一定是大拇指的啦
              </AlertDialogAction>
            </form>
            <form onSubmit={failApplication}>
              <AlertDialogAction type="submit">
                他不是學生 詐騙
              </AlertDialogAction>
            </form>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
export default ApplicationItem;
