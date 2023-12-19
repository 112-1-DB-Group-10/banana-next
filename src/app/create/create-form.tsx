'use client';

import { useState } from 'react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { UUID } from 'crypto';
import { Check, ChevronsUpDown } from 'lucide-react';
import * as z from 'zod';
import { NewApplications, NewCards, insertApplication } from '@/actions/adminActions';
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
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
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
import { cn } from '@/lib/utils';
import { ProgressBar } from './progress';
import { NewCard } from '@/actions/cardActions';
import { handleNewCard } from '@/actions/cardActions'; // create a new card, type: CardData
import { getUserById } from '@/actions/userActions';
import { CardData, UserProfile } from '@/actions/types';

const locations = ["線上", "基隆", "台北", "新北", "桃園", "新竹", "苗栗", "台中", "彰化", "雲林", "嘉義", "台南", "高雄", "屏東", "宜蘭", "花蓮", "台東", "澎湖", "金門", "馬祖"]

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const visibility_options = ['public', 'verified'];

const FormSchema = z.object({
    //   username: z.string().min(2, {
    //     message: 'Username must be at least 2 characters.',
    //   }),
    //   school: z.string({
    //     required_error: 'Please select an email to display.',
    //   }),
    //   enrollYear: z.string().min(2, {
    //     message: '請輸入入學年份',
    //   }),
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
    // profilePicture: z
    // .any()
    // .refine((files) => files?.length == 1, "Image is required.")
    // .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    // .refine(
    //   (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
    //   ".jpg, .jpeg, .png and .webp files are accepted."
    // ),
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

const CreateForm = ({ user_id, user_data }: { user_id: string, user_data: UserProfile }) => {
  const router = useRouter();
  const { toast } = useToast();
  // const [profilePicture, setProfilePicture] = useState<File | null>(null);
  // const [verificationProgress, setVerificationProgress] = useState(0);

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');
  // const handlePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files && e.target.files[0];
  //   if (file) {
  //     setProfilePicture(file);
  //   }
  // };

  // const user_data = await getUserById(user_id as UUID);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      //   username: '',
      //   school: '',
      //   enrollYear: '',
      location: '',
      want_to_learn: '',
      good_at: '',
      contents: '',
      visibility: 'public',
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    // console.log('fuck');
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
        visibility: data.visibility as "public" | "verified",
        suspended: user_data.suspended,
        deleted: false,
        want_to_learn: [data.want_to_learn],
        good_at: [data.good_at],
        num_likes: 0,
        num_comments: 0
    };
    console.log(submission);
    // async function asyncInsert() {
    //   let fuck = await insertApplication(submission)
    // }
    // asyncInsert()
    // async () => {await insertApplication(submission)}
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
    // <Form {...form}>
    //   <Card className="bg-blueGray-50 mx-auto w-[50rem] flex-row justify-between gap-10 p-4 pt-8">
    //     <h1 className="mb-4 text-3xl font-bold">香蕉認證</h1>
    //     <form
    //       onSubmit={form.handleSubmit(onSubmit)}
    //       className="w-2/3 space-y-6"
    //     >
    //       <FormField
    //         control={form.control}
    //         name="englishName"
    //         render={({ field }) => (
    //           <FormItem>
    //             <FormLabel>正式英文名字</FormLabel>
    //             <FormControl>
    //               <Input
    //                 placeholder="護照姓名 (Eg: KUNG,LING-CHIEH)"
    //                 {...field}
    //               />
    //             </FormControl>
    //             <FormDescription>這是為了驗證真實身分.</FormDescription>
    //             <FormMessage />
    //           </FormItem>
    //         )}
    //       />
    //       <FormField
    //         control={form.control}
    //         name="school"
    //         render={({ field }) => (
    //           <FormItem className='flex flex-col items-start justify-center'>
    //             <FormLabel>學校</FormLabel>
    //             <Popover> 
    //               <PopoverTrigger asChild>
    //                 <FormControl>
    //                   <Button
    //                     variant="outline"
    //                     role="combobox"
    //                     aria-expanded={open}
    //                     className="w-[200px] justify-between"
    //                   >
    //                     {value
    //                       ? colleges.find(
    //                           (colleges) => colleges.value === value,
    //                         )?.label
    //                       : '搜尋您的學校'}
    //                     <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
    //                   </Button>
    //                 </FormControl>
    //               </PopoverTrigger>
    //               <PopoverContent className="w-[200px] p-0">
    //                 <Command>
    //                   <CommandInput placeholder="請選擇學校" />
    //                   <CommandEmpty>查無此學校</CommandEmpty>
    //                   <CommandGroup>
    //                     {colleges.map((colleges) => (
    //                       <CommandItem
    //                         key={colleges.value}
    //                         value={colleges.value}
    //                         onSelect={(currentValue) => {
    //                           setValue(
    //                             currentValue === value ? '' : currentValue,
    //                           );
    //                           setOpen(false);
    //                         }}
    //                       >
    //                         <Check
    //                           className={cn(
    //                             'mr-2 h-4 w-4',
    //                             value === colleges.value
    //                               ? 'opacity-100'
    //                               : 'opacity-0',
    //                           )}
    //                         />
    //                         {colleges.label}
    //                       </CommandItem>
    //                     ))}
    //                   </CommandGroup>
    //                 </Command>
    //               </PopoverContent>
    //             </Popover>
    //             <FormMessage />
    //           </FormItem>
    //         )}
    //       />
    //       <FormField
    //         control={form.control}
    //         name="enrollYear"
    //         render={({ field }) => (
    //           <FormItem>
    //             <FormLabel>入學年份</FormLabel>
    //             <FormControl>
    //               <Input placeholder="2023" {...field} />
    //             </FormControl>
    //             <FormMessage />
    //           </FormItem>
    //         )}
    //       />
    //       <FormField
    //         control={form.control}
    //         name="document_url"
    //         render={({ field }) => (
    //           <FormItem>
    //             <FormLabel>認證文件的網址</FormLabel>
    //             <FormControl>
    //               <Input placeholder="Google Drive 網址" {...field} />
    //             </FormControl>
    //             {/* <FormDescription>這是為了驗證真實身分.</FormDescription> */}
    //             <FormMessage />
    //           </FormItem>
    //         )}
    //       />
    //       <Button type="submit">Submit</Button>
    //     </form>
    //   </Card>
    // </Form>
    
    <Form {...form}>
      <Card className="bg-blueGray-50 mx-auto h-fit w-[50rem] flex-row justify-between gap-10 p-4 pt-8">
        <h1 className="mb-4 text-3xl font-bold">創建卡片</h1>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          {/* <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>正式英文名字</FormLabel>
                <FormControl>
                  <Input placeholder="護照姓名 (Eg: KUNG,LING-CHIEH)" {...field} />
                </FormControl>
                <FormDescription>這是為了驗證真實身分.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="school"
            render={({ field }) => (
              <FormItem>
                <FormLabel>學校</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="請選擇學校" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>學校</SelectLabel>
                        {colleges.map((college) => (
                          <SelectItem key={college} value={college}>
                            {college}
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
            name="enrollYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel>入學年份</FormLabel>
                <FormControl>
                  <Input placeholder="2023" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
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
                {/* <FormDescription>這是為了驗證真實身分.</FormDescription> */}
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
          {/* <FormField
            control={form.control}
            name="profilePicture"
            render={({ field }) => (
              <FormItem>
                <FormLabel>上傳認證文件</FormLabel>
                <FormControl>
                  <Input
                    // accept=".jpg, .jpeg, .png, .pdf"
                    type="file"
                    id="profilePicture"
                    placeholder="您的學生證"
                    className="border-blue-600 file:rounded-md file:border file:border-solid file:border-blue-700 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <Button type="submit">Submit</Button>
        </form>
        {/* <div className="mt-20 w-1/3 pl-5">
          <ProgressBar />
        </div> */}
      </Card>
    </Form>


  );
};

export default CreateForm;
