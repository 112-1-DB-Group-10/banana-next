'use server';

import { getChatBox, getConversations } from '@/actions/chatQueries';
import MainPage from './mainpage';

export default async function HomePage() {
  // const conversations = await getConversations('0007970e-3ee4-4814-a886-0717399d1547');
  // );

  return (
    <div className="flex w-full flex-1 justify-between pl-4 pr-4">
      {/* {
        JSON.stringify(conversations)
      } */}
      {/* {
        JSON.stringify(conversations)
      } */}
      <MainPage />
    </div>
  );
}
