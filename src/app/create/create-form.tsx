'use client';

import { handleNewCard } from '@/actions/cardActions';
import { CardData, UserProfile } from '@/actions/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
// create a new card, type: CardData
import { Button } from '@/components/ui/button';
import {
  Card
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
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

const locations = [
  '線上',
  '基隆',
  '台北',
  '新北',
  '桃園',
  '新竹',
  '苗栗',
  '台中',
  '彰化',
  '雲林',
  '嘉義',
  '台南',
  '高雄',
  '屏東',
  '宜蘭',
  '花蓮',
  '台東',
  '澎湖',
  '金門',
  '馬祖',
];

const visibility_options = ['public', 'verified'];

const FormSchema = z.object({
  location: z.string().min(1, {
    message: '請選擇地點',
  }),
  want_to_learn: z.string().min(1, {
    message: '請輸入想學的技能名稱',
  }),
  good_at: z.string().min(1, {
    message: '請輸入擅長的技能名稱',
  }),
  contents: z.string({}),
  visibility: z.string({
    required_error: '請選擇是否公開卡片',
  }),
  card_id: z.string({}),
  user_id: z.string({}),
  username: z.string({}),
  avatar: z.string({}),
  institute: z.string({}),
  created_time: z.date({}),
  updated_time: z.date({}),
  suspended: z.boolean({}),
  deleted: z.boolean({}),
  likes: z.number({}),
  comments: z.string({}),
});

const frameworks = [
  {
    value: 'next.js',
    label: 'Next.js',
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit',
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js',
  },
  {
    value: 'remix',
    label: 'Remix',
  },
  {
    value: 'astro',
    label: 'Astro',
  },
];

const CreateForm = ({
  user_id,
  user_data,
}: {
  user_id: string;
  user_data: UserProfile;
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      location: '',
      want_to_learn: '',
      good_at: '',
      contents: '',
      visibility: 'public',
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    router.push('/profile/' + user_id, { scroll: false });

    const submission: CardData = {
      card_id: crypto.randomUUID(),
      user_id: user_id,
      username: user_data.username,
      avatar: user_data.avatar,
      contents: data.contents,
      locations: [data.location],
      institute: user_data.institute as string,
      created_time: new Date(),
      updated_time: new Date(),
      visibility: data.visibility as 'public' | 'verified',
      suspended: user_data.suspended,
      deleted: false,
      want_to_learn: [data.want_to_learn],
      good_at: [data.good_at],
      num_likes: 0,
      num_comments: 0,
    };
    console.log(submission);
    await handleNewCard(submission);

    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };
  return (

    <Form {...form}>
      <Card className="bg-blueGray-50 mx-auto h-fit w-[50rem] flex-row justify-between gap-10 p-4 pt-8">
        <h1 className="mb-4 text-3xl font-bold">創建卡片</h1>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>地點</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="請選擇地點" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>地點</SelectLabel>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
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
            name="want_to_learn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>想學的技能</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="good_at"
            render={({ field }) => (
              <FormItem>
                <FormLabel>擅長的技能</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contents"
            render={({ field }) => (
              <FormItem>
                <FormLabel>其他想說的話</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="visibility"
            render={({ field }) => (
              <FormItem>
                <FormLabel>卡片是否公開</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel></SelectLabel>
                      {visibility_options.map((opt) => (
                        <SelectItem key={opt} value={opt}>
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Card>
    </Form>
  );
};

export default CreateForm;
