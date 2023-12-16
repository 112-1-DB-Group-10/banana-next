'use server';

import ChatNavPane from './chat-nav-pane';

const Chat = async ({
  searchParams,
}: {
  searchParams?: {
    q?: string;
  };
}) => {
  return <ChatNavPane query={searchParams?.q} />;
};

export default Chat;
