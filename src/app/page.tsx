import ChatRooms from '@/components/chat-rooms';
import SearchBar from '@/components/search-bar';
import StoryRow from '@/components/story-row';
import { auth } from '@/lib/auth';

export default async function HomePage() {
  const session = await auth();
  console.log('session', session);
  return (
    <>
      <StoryRow />
      <SearchBar />
      <ChatRooms />
    </>
  );
}
