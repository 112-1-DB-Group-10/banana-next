import React from 'react';

interface User {
  id: string; 
  name: string;
  message: string;
  imageURL: string;
  lastMessage: string;
}

interface UserListProps {
  users: User[];
  selectedUserId: string | null;
  onSelectUser: (userId: string) => void;
}

const UserList: React.FC<UserListProps> = ({ users, selectedUserId, onSelectUser }) => {
  return (
    <div className='w-full'>
      {users.map((user, index) => (
        <div
          key={index}
          className={`py-4 px-2 border-b-2 border-gray-200 cursor-pointer ${selectedUserId === user.id ? 'bg-gray-200' : ''}`}
          onClick={() => onSelectUser(user.id)}
        >
        <div className="w-full">
          <img
            src={user.imageURL}
            className="object-cover h-12 w-12 rounded-full"
            alt=""
          />
          </div>
          <div className="w-full">
            <div className="text-lg font-semibold">{user.name}</div>
            <span className="text-gray-500">{user.lastMessage}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;