'use client';

import { UUID } from 'crypto';
import { NewTopics, suspendUser } from '@/actions/adminActions';
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
import { insertTopic } from '@/actions/adminActions';
import { insertBelongsTo } from '@/actions/adminActions';
import { Input } from '@/components/ui/input';

import { NewLabels } from '@/actions/adminActions';

import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog';
import * as z from 'zod';
import { NewUsers, insertUser } from '@/actions/adminActions';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const FormSchema = z.object({
  topic: z.string({})
});

const InsertTopicItem = () => {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      topic: ''
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const submission: NewTopics = {
      topic_name: data.topic
    }
    // const submission_belongs_to = {
    //   topic_name: topic,
    //   label_name: data.label
    // }
    await insertTopic(submission);
    // await insertLabel(submission);
  };

  const handleInsertLabel = async () => {

    // await deleteLabel(label);
    // const submission: NewLabels = {
    //   label_name: label,
    //   created_user: user_id
    // }
    // console.log(submission)
    // await insertLabel(submission);
  };
  return (
    <div className="flex h-[2rem] w-full flex-row items-center">
      <AlertDialog>
      <AlertDialogTrigger asChild>
          <Button variant="outline">新增主題</Button>
        </AlertDialogTrigger>
        {/* <AlertDialogTrigger asChild>
          <Button variant="outline">+</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>新增主題</AlertDialogTitle>
          </AlertDialogHeader>
          <Input></Input>
          <AlertDialogFooter>
            <form onSubmit={handleInsertLabel}>
              <AlertDialogAction type="submit">確定新增主題</AlertDialogAction>
            </form>
          </AlertDialogFooter>
        </AlertDialogContent> */}
        <AlertDialogContent>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
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
