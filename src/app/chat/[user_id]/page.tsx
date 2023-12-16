'use server';

import ChatNavPane from '../chat-nav-pane';
import { UUID } from 'crypto';
import { Card } from '@/components/ui/card';
import { getUserSession } from '@/lib/session';
import ChatBox from './chat-box';

const ChatBoxPage = async ({
  searchParams,
  params,
}: {
  params: {
    user_id: UUID;
  };
  searchParams?: {
    q?: string;
  };
}) => {
  const session = await getUserSession();
  return (
    <>
      <ChatNavPane query={searchParams?.q} />
      <Card className="flex h-[35rem] w-[50rem] justify-around overflow-y-scroll p-4">
        <div className="flex h-full w-full flex-col">
          <ChatBox partnerId={params.user_id} />
        </div>
      </Card>
    </>
  );
};

export default ChatBoxPage;
