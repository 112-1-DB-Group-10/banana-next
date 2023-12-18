'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ToastAction } from '@/components/ui/toast';
import { toast, useToast } from '@/components/ui/use-toast';
import { UUID } from 'crypto';
import { useRouter } from 'next/navigation'


const FormSchema = z.object({
    username: z.string().min(2, {
      message: '姓名至少超過兩個字',
    }),
    sex: z.string({
      required_error: '請選擇性別',
    }),
    age: z.number().min(0, {
      message: '請輸入年齡',
    }),
});


const ProfileEdit = ({user_id, username, sex, age}:{user_id: string, username: string, sex: string, age: number}) => {
    const router = useRouter()
    const { toast } = useToast();

    const sex_options = ['男', '女'];

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: username,
            sex: sex,
            age: age,
        },
    });

    const onSubmit = async (data: z.infer<typeof FormSchema>) => { 
        console.log('fuck');
        // const submission : NewApplications = {
        //     username: data.username,
        //     sex: data.sex,
        //     age: Number(data.age)
        // }
        // console.log(submission)
        // async() => {await insertApplication(submission)}
        toast({
          title: 'You submitted the following values:',
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{JSON.stringify(data, null, 2)}</code>
            </pre>
          ),
        });
      router.push('/profile/' + user_id, { scroll: false })
    }

    return (
        <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-2/3 space-y-6"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>使用者名稱</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="請輸入使用者名稱"
                        {...field}
                      />
                    </FormControl>
                    {/* <FormDescription>這是為了驗證真實身分.</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name="sex"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>性別</FormLabel>
                    <FormControl>
                      <Input 
                        // placeholder="" 
                        {...field} 
                        />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <FormField
            control={form.control}
            name="sex"
            render={({ field }) => (
              <FormItem>
                <FormLabel>性別</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="請選擇性別" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>性別</SelectLabel>
                      {sex_options.map((sex_option) => (
                        <SelectItem key={sex_option} value={sex_option}>
                          {sex_option}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>年齡</FormLabel>
                    <FormControl>
                      <Input
                        // placeholder="Google Drive 網址"
                        {...field}
                      />
                    </FormControl>
                    {/* <FormDescription>這是為了驗證真實身分.</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">儲存變更</Button>
            </form>
        </Form>
      );




}

export default ProfileEdit
