import { PaperPlaneIcon } from '@radix-ui/react-icons';
import StoryNav from '@/components/story-nav';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { followings } from '@/data/fake';

interface StoryPageProps {
  params: {
    uid: string;
    sid: string;
  };
}

const StoryPage = ({ params }: StoryPageProps) => {
  const following = followings.find((following) => following.id === params.uid);
  const story = following?.stories.find((story) => story.id === params.sid);

  if (!story || !following) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-lg font-medium">No story found</p>
      </div>
    );
  }

  return (
    <div
      className="flex h-full w-full select-none flex-col items-center justify-center gap-y-4 bg-contain bg-center bg-no-repeat p-4"
      style={{ backgroundImage: `url(${story.img})` }}
    >
      <div className="absolute top-0 flex w-full items-center space-x-2 px-3 pt-5 text-white">
        <Avatar className="h-8 w-8">
          <AvatarImage src={following.img} alt={following.name} />
          <AvatarFallback />
        </Avatar>
        <div className="text-left">
          <p className="text-md font-medium">{following.name}</p>
        </div>
      </div>

      <div className="absolute top-0 flex h-full w-full flex-col justify-center p-2">
        <StoryNav />
      </div>

      <div className="rounded-md border-0 bg-[#000000a0] px-2 py-1 text-center text-white placeholder:text-[#ffffffa0] focus-visible:ring-0">
        {story.text}
      </div>

      <div className="absolute bottom-0 flex w-full space-x-2 p-3">
        <Input
          type="text"
          placeholder="Type a message"
          className="rounded-md border-0 bg-[#ffffffa0] text-black placeholder-[#000000a0] focus-visible:ring-0"
        />
        <Button type="submit" size="icon" className="shrink-0">
          <PaperPlaneIcon className="-translate-y-[0.1rem] translate-x-[0.1rem] -rotate-45" />
        </Button>
      </div>
    </div>
  );
};

export default StoryPage;
