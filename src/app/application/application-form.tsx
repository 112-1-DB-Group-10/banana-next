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
import { ProgressBar } from './progress';
import { UUID } from 'crypto';
import { NewApplications, insertApplication } from '@/actions/adminActions'


const colleges = [
  '國立台灣大學',
  '國立政治大學',
  '私立大葉大學',
  '私立文化大學',
  '國立中興大學',
  '國立臺灣師範大學',
  '國立成功大學',
  '國立臺北大學',
  '國立中央大學',
  '國立臺灣海洋大學',
  '國立高雄師範大學',
  '國立彰化師範大學',
  '國立中山大學',
  '國立中正大學',
  '國立宜蘭大學',
];

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
  // profilePicture: z
  // .any()
  // .refine((files) => files?.length == 1, "Image is required.")
  // .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
  // .refine(
  //   (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
  //   ".jpg, .jpeg, .png and .webp files are accepted."
  // ),
});

const ApplicationForm = ({user_id}:{user_id: UUID}) => {
  const { toast } = useToast();
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [verificationProgress, setVerificationProgress] = useState(0);

  // const handlePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files && e.target.files[0];
  //   if (file) {
  //     setProfilePicture(file);
  //   }
  // };

  const handleSubmit = () => {
    setVerificationProgress((prevProgress) => prevProgress + 25);
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      englishName: '',
      school: '',
      enrollYear: '',
      document_url: '',
      // profilePicture,
    },
  });

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log('fuck');
    const submission : NewApplications = {
        user_id: user_id,
        englishname: data.englishName,
        enroll_year: Number(data.enrollYear),
        institute: data.school,
        verification: "pending",        
        document_url: data.document_url
    }
    console.log(submission)
    await insertApplication(submission)
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          {/* <code className="text-white">{JSON.stringify(data, null, 2)}</code> */}
        </pre>
      ),
    });
  }
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
              <FormItem>
                <FormLabel>學校</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="請選擇您的學校" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Schools</SelectLabel>
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
          />
            <FormField
            control={form.control}
            name="document_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>認證文件的網址</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Google Drive 網址"
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

export default ApplicationForm;
