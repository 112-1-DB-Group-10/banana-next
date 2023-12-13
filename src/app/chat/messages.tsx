import React from 'react';

interface Messages {
  sender_id: string,
  receiver_id: string,
  time_stamp: string,
  contents: string,
}

interface ChatMessagesProps {
  messages: Messages[],
  loggedInUserId: string,
  selectedUserId: string | null,
  selectedUserAvatar: string | null;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, loggedInUserId, selectedUserId, selectedUserAvatar }) => {
  const userMessages = selectedUserId
    ? messages.filter(message => (message.sender_id === selectedUserId || message.receiver_id === selectedUserId))
    : [];

    return (
      <div className="w-full px-5 flex flex-col justify-between">
        <div className="flex flex-col mt-5">
          {userMessages.map((message, index) => (
            <div className={`flex justify-${message.sender_id === loggedInUserId ? 'end' : 'start'} mb-4`} key={index}>
              {message.sender_id !== loggedInUserId && (
                <img
                  src={selectedUserAvatar || "default-avatar-url"}
                  className="object-cover h-8 w-8 rounded-full"
                  alt=""
                />
              )}
              <div className={`ml-${message.sender_id === loggedInUserId ? '2' : '0'} py-3 px-4 bg-${message.sender_id === loggedInUserId ? 'blue' : 'gray'}-400 rounded-${message.sender_id === loggedInUserId ? 'bl' : 'br'}-3xl rounded-${message.sender_id === loggedInUserId ? 'tl' : 'tr'}-3xl rounded-tr-${message.sender_id === loggedInUserId ? 'xl' : 'xl'} text-white`}>
                {message.contents}
              </div>
              {message.sender_id === loggedInUserId && (
                <img
                  src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                  className="object-cover h-8 w-8 rounded-full"
                  alt=""
                />
              )}
            </div>
          ))}
        </div>
  
        {/* Input for new message */}
        <div className="py-5">
          <input
            className="w-full bg-gray-200 py-5 px-3 rounded-xl"
            type="text"
            placeholder="Type your message here..."
          />
        </div>
      </div>
    );
  };

export default ChatMessages;
