'use client';

import { NewLabels, insertBelongsTo } from '@/actions/adminActions';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
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
import { UUID } from 'crypto';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const FormSchema = z.object({
  label: z.string({}),
});

const InsertLableItem = ({
  topic,
  user_id,
}: {
  topic: string;
  user_id: UUID;
}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      label: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const submission: NewLabels = {
      label_name: data.label,
      created_user: user_id,
    };
    await insertBelongsTo(topic, data.label, user_id);
  };

  const handleInsertLabel = async () => {
  };
  return (
    <div className="flex h-[2rem] w-full flex-row items-center">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">+</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-2/3 space-y-6"
            >
              <FormField
                control={form.control}
                name="label"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>請輸入標籤</FormLabel>
                    <FormControl>
                      <Input placeholder="請輸入標籤" {...field} />
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
export default InsertLableItem;
