'use client';

import { useState } from 'react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { UUID } from 'crypto';
import { Check, ChevronsUpDown } from 'lucide-react';
import * as z from 'zod';
import { NewApplications, insertApplication } from '@/actions/adminActions';
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

const colleges = [
  '元智大學',
  '臺北市立大學',
  '臺北基督學院',
  '明道學校財團法人明道大學',
  '國立臺灣海洋大學',
  '靜宜大學',
  '義守大學',
  '真理大學',
  '淡江大學',
  '實踐大學',
  '國立金門大學',
  '中原大學',
  '國立東華大學',
  '國立政治大學',
  '國立聯合大學',
  '南華大學',
  '國立成功大學',
  '康寧大學',
  '台灣首府學校財團法人台灣首府大學',
  '中山醫學大學',
  '高雄醫學大學',
  '大葉大學',
  '國立空中大學',
  '國立彰化師範大學',
  '國立中央大學',
  '銘傳大學',
  '國立臺灣大學',
  '國立陽明大學',
  '國立暨南國際大學',
  '國立高雄師範大學',
  '華梵大學',
  '國立臺北大學',
  '國立宜蘭大學',
  '亞洲大學',
  '長庚大學',
  '國立臺灣體育運動大學',
  '國立中正大學',
  '國立臺北藝術大學',
  '國立臺中教育大學',
  '東吳大學',
  '國立嘉義大學',
  '輔仁大學',
  '國立臺南大學',
  '國立高雄大學',
  '國立新竹教育大學',
  '法鼓學校財團法人法鼓文理學院',
  '國立臺東大學',
  '國立中興大學',
  '國立體育大學',
  '中信金融管理學院',
  '國立臺灣藝術大學',
  '臺北醫學大學',
  '國立臺灣師範大學',
  '大同大學',
  '國立交通大學',
  '中國文化大學',
  '高雄市立空中大學',
  '國立屏東大學',
  '中國醫藥大學',
  '佛光大學',
  '逢甲大學',
  '國立臺南藝術大學',
  '東海大學',
  '慈濟學校財團法人慈濟大學',
  '開南大學',
  '稻江科技暨管理學院',
  '世新大學',
  '國立清華大學',
  '中華大學',
  '國立臺北教育大學',
  '國立中山大學',
  '馬偕醫學院',
  '玄奘大學',
  '學校財團法人中華浸信會基督教台灣浸會神學院',
  '長榮大學',
].map((college) => ({ value: college, label: college }));

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const FormSchema = z.object({
  englishName: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  school: z.string({
    required_error: 'Please select an email to display.',
  }),
  enrollYear: z.string().min(2, {
    message: '請輸入入學年份',
  }),
  document_url: z.string().min(2, {
    message: '請輸入認證照片的網址',
  }),
  time_stamp: z.string({}),
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

const ApplicationForm = ({ user_id }: { user_id: string }) => {
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

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      englishName: '',
      school: '',
      enrollYear: '',
      document_url: '',
      time_stamp: '',
      // profilePicture,
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    // console.log('fuck');
    router.push('/profile/' + user_id, { scroll: false });

    const submission: NewApplications = {
      document_url: data.document_url,
      user_id: user_id,
      englishname: data.englishName,
      enroll_year: Number(data.enrollYear),
      institute: data.school,
      time_stamp: new Date(),
      verification: 'pending',
    };
    console.log(submission);
    // async function asyncInsert() {
    //   let fuck = await insertApplication(submission)
    // }
    // asyncInsert()
    // async () => {await insertApplication(submission)}
    await insertApplication(submission);

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
      <Card className="bg-blueGray-50 mx-auto w-[50rem] flex-row justify-between gap-10 p-4 pt-8">
        <h1 className="mb-4 text-3xl font-bold">香蕉認證</h1>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="englishName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>正式英文名字</FormLabel>
                <FormControl>
                  <Input
                    placeholder="護照姓名 (Eg: KUNG,LING-CHIEH)"
                    {...field}
                  />
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
              <FormItem className='flex flex-col items-start justify-center'>
                <FormLabel>學校</FormLabel>
                <Popover> 
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between"
                      >
                        {value
                          ? colleges.find(
                              (colleges) => colleges.value === value,
                            )?.label
                          : '搜尋您的學校'}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="請選擇學校" />
                      <CommandEmpty>查無此學校</CommandEmpty>
                      <CommandGroup>
                        {colleges.map((colleges) => (
                          <CommandItem
                            key={colleges.value}
                            value={colleges.value}
                            onSelect={(currentValue) => {
                              setValue(
                                currentValue === value ? '' : currentValue,
                              );
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                value === colleges.value
                                  ? 'opacity-100'
                                  : 'opacity-0',
                              )}
                            />
                            {colleges.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
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
          />
          <FormField
            control={form.control}
            name="document_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>認證文件的網址</FormLabel>
                <FormControl>
                  <Input placeholder="Google Drive 網址" {...field} />
                </FormControl>
                {/* <FormDescription>這是為了驗證真實身分.</FormDescription> */}
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

export default ApplicationForm;
