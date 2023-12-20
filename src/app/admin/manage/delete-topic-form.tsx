'use client';

import { NewTopics, deleteTopic } from '@/actions/adminActions';
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

const DeleteTopicItem = ({ topic }: { topic: string }) => {
  const handleDeleteTopic = async () => {
    const submission: NewTopics = {
      topic_name: topic,
    };
    await deleteTopic(submission);
  };
  return (
    <div className="flex h-[2rem] flex-row items-center">
      <AlertDialog>
        <div className="flex flex-row items-center"></div>
        <AlertDialogTrigger asChild>
          <Button>{topic}</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>確定要刪除此主題嗎？</AlertDialogTitle>
            <AlertDialogDescription>
              這樣這個主題很可憐欸，你確定嗎qq？
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>好吧那算了</AlertDialogCancel>
            <form onSubmit={handleDeleteTopic}>
              <AlertDialogAction type="submit">確定我不管</AlertDialogAction>
            </form>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
export default DeleteTopicItem;
