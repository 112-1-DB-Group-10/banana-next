'use server';

import { Suspense } from 'react';
import { Card } from '@/components/ui/card';
import ConversationList from './conversation-list';
import ConversationSkeleton from './conversation-skeleton';
import Search from './search';

const ChatNavPane = async ({ query }: { query?: string }) => {
  console.log(query);
  return (
    <Card className="duration-400 h-[30rem] w-[20rem] overflow-y-scroll p-4 transition-all">
      <Search />
      <Suspense key={query} fallback={<ConversationSkeleton />}>
        <ConversationList query={query} />
      </Suspense>
    </Card>
  );
};

export default ChatNavPane;
