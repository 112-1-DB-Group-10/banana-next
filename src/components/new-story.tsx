'use client';

import { FormEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function NewStory() {
  const [image, setImage] = useState<string | null>(null);

  const onStoryPost = async (event: FormEvent<HTMLFormElement>) => {
    console.log('form event!');
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // // const imageFile = formData.get('upload-image') as File;
    // // const content = formData.get('content');
    // // const reader = new FileReader();
    // // reader.readAsDataURL(imageFile);
    // // reader.onloadend = async () => {
    // // const session = await auth();
    // await newStory({
    //   // image: reader.result as string,
    //   // content: content as string,
    //   // authorUid: session?.user.id,
    //   image: 'dawdaw',
    //   content: 'dawdaw',
    //   authorUid: 'awdawdaw',
    // });
    // // };
  };

  return (
    <form
      className="flex h-full w-full flex-col items-center justify-center space-y-4 bg-contain bg-center bg-no-repeat p-4"
      style={{ backgroundImage: image ? `url(${image})` : undefined }}
      onSubmit={onStoryPost}
    >
      <div className="flex w-full grow flex-col items-center justify-center space-y-4">
        <Button asChild className="cursor-pointer bg-[#0084ff] text-white">
          <label htmlFor="upload-image">Add Image</label>
        </Button>
        <Input
          type="file"
          accept="image/*"
          className="hidden"
          id="upload-image"
          name="upload-image"
          onChange={(event) => {
            // const file = event.target.files?.[0];
            // if (!file) return;
            // const reader = new FileReader();
            // reader.onload = () => {
            //   if (typeof reader.result !== 'string') return;
            //   setImage(reader.result);
            // };
            // reader.readAsDataURL(event.target.files?.[0] as Blob);
          }}
        />
        <Input
          name="content"
          placeholder="What's on your mind?"
          className="rounded-md border-0 bg-[#000000a0] px-2 py-1 text-center text-white placeholder:text-[#ffffffa0] focus-visible:ring-0"
        />
      </div>
      <Button type="submit">Post</Button>
    </form>
  );
}
