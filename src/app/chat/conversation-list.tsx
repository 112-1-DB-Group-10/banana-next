'use server';

import { getConversations } from '@/actions/chatActions';
import { Conversation } from '@/actions/types';
import users from '@/db/users.json';
import { getUserSession } from '@/lib/session';
import ConversationItem from './conversation-item';

const ConversationList = async ({ query }: { query?: string }) => {
  const session = await getUserSession();
  const conversations = await getConversations(session.user_id);
  console.log(conversations);
  const filteredConversations: Conversation[] = conversations?.filter(
    (conversation) =>
      conversation.username
        .toLowerCase()
        .indexOf((query || '').toLowerCase()) !== -1,
  );
  console.log(query);
  console.log(conversations);
  console.log(filteredConversations);
  return (
    <div className="w-full">
      {filteredConversations?.map((conversation, index) => (
        <ConversationItem
          key={`conversation-item-${conversation.partner_id}`}
          {...conversation}
          isLast={index === users.length - 1}
        />
      ))}
    </div>
  );
};

export default ConversationList;
