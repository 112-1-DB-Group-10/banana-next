'use client';

import { NewUsers, updateUser } from '@/actions/adminActions';
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { User } from '@/db/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const FormSchema = z.object({
  user_id: z.string({}),
  username: z.string().min(2, {
    message: '姓名至少超過兩個字',
  }),
  sex: z.enum(['male', 'female', 'unknown'], {}),
  age: z.string().min(1, {
    message: '請輸入年齡',
  }),
  email: z.string({}),
  avatar: z.string({}),
  role: z.string({}),
  suspended: z.boolean({}),
});

const ProfileEdit = ({ user }: { user: User }) => {
  const router = useRouter();
  const { toast } = useToast();

  const sex_options = ['male', 'female', 'unknown'];

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      user_id: user.user_id,
      username: user.username,
      sex: user.sex,
      age: String(user.age),
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      suspended: user.suspended,
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const submission: NewUsers = {
      user_id: user.user_id,
      username: data.username,
      sex: data.sex,
      age: Number(data.age),
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      suspended: user.suspended,
    };
    console.log(submission);
    await updateUser(submission);
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    router.push('/profile/' + user.user_id, { scroll: false });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>使用者名稱</FormLabel>
              <FormControl>
                <Input placeholder="請輸入使用者名稱" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sex"
          render={({ field }) => (
            <FormItem>
              <FormLabel>性別</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogTrigger asChild>
          <Button type="submit">儲存變更</Button>
        </DialogTrigger>
      </form>
    </Form>
  );
};

export default ProfileEdit;
