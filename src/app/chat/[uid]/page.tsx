import BackButton from '@/components/back-button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { followings } from '@/data/fake';
import { cn } from '@/lib/utils';
import MessageInput from './MessageInput';

const chats = [
  { text: 'First message', from: 'me' },
  { text: 'Second message', from: 'other' },
  { text: 'Third message', from: 'me' },
  { text: 'Fourth message', from: 'me' },
  { text: 'Fifth message', from: 'other' },
  { text: 'Sixth message', from: 'other' },
  { text: 'Seventh message', from: 'other' },
  { text: 'Eighth message', from: 'me' },
];

interface ChatPageProps {
  params: {
    uid: string;
  };
}

export default function ChatPage({ params }: ChatPageProps) {
  const following = followings.find((following) => following.id === params.uid);

  if (!following) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-lg font-medium">No following found</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center space-x-3 border-b px-4 py-3">
        <BackButton />
        <Avatar className="h-8 w-8">
          <AvatarImage src={following.img} alt={following.name} />
          <AvatarFallback />
        </Avatar>
        <div className="text-left">
          <p className="text-md font-medium">{following.name}</p>
        </div>
      </div>
      <div className="flex grow flex-col space-y-1 p-3">
        {chats.map((chat, index) => (
          <div
            key={index}
            className={cn(
              'flex flex-col space-y-1',
              chat.from === 'me' ? 'items-end' : 'items-start',
            )}
          >
            <div
              className={cn(
                'flex items-center space-x-2 rounded-2xl px-3 py-2',
                chat.from === 'me'
                  ? 'bg-[#0084ff] text-white'
                  : 'bg-[#88888840] text-black',
                index > 0 &&
                  chat.from === chats[index - 1].from &&
                  chat.from === 'me' &&
                  'rounded-tr-[0.2rem]',
                index > 0 &&
                  chat.from === chats[index - 1].from &&
                  chat.from === 'other' &&
                  'rounded-tl-[0.2rem]',
                index < chats.length - 1 &&
                  chat.from === chats[index + 1].from &&
                  chat.from === 'me' &&
                  'rounded-br-[0.2rem]',
                index < chats.length - 1 &&
                  chat.from === chats[index + 1].from &&
                  chat.from === 'other' &&
                  'rounded-bl-[0.2rem]',
              )}
            >
              <p className="text-sm">{chat.text}</p>
            </div>
            {/* <p className="text-xs text-[#000000a0]">
              {chat.from === 'me' ? '1:00 PM' : '1:01 PM'}
            </p> */}
          </div>
        ))}
      </div>
      <MessageInput />
    </>
  );
}
