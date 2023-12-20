'use client';

import { NewTopics, insertTopic } from '@/actions/adminActions';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const FormSchema = z.object({
  topic: z.string({}),
});

const InsertTopicItem = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      topic: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const submission: NewTopics = {
      topic_name: data.topic,
    };
    await insertTopic(submission);
  };

  return (
    <div className="flex h-[2rem] w-full flex-row items-center">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">新增主題</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-2/3 space-y-6"
            >
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>請輸入主題</FormLabel>
                    <FormControl>
                      <Input placeholder="請輸入主題" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <AlertDialogTrigger asChild>
                <Button type="submit">儲存變更</Button>
              </AlertDialogTrigger>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
export default InsertTopicItem;
