import ChatMessages from './messages';
import UserList from './userlist';

const Chat = () => {

  return (
    <div className="mx-auto w-full rounded-lg px-1 shadow-lg">
      {/* Chatting */}
      <div className="flex flex-row justify-between bg-white">
        {/* chat list */}
        <div className="flex flex-col overflow-y-auto border-r-2">
          {/* search compt */}
          <div className="border-b-2 px-2 py-4">
            <input
              type="text"
              placeholder="search chatting"
              className="w-full rounded-2xl border-2 border-gray-200 px-2 py-2"
              value={''}
            />
          </div>
          {/* end search compt */}
          <div className="flex flex-col items-center justify-center border-b-2">
            <UserList
              users={[]}
              selectedUserId={''}
              onSelectUser={(userId: string) => {}}
            />
          </div>
        </div>
        {/* end chat list */}
        {/* message */}
        <ChatMessages
          messages={[]}
          loggedInUserId={''}
          selectedUserId={''}
          selectedUserAvatar={''}
        />
        {/* end message */}
      </div>
    </div>
  );
};

export default Chat;
