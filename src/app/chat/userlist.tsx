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

const UserList: React.FC<UserListProps> = ({
  users,
  selectedUserId,
  onSelectUser,
}) => {
  return (
    <div className="w-full">
      {users.map((user, index) => (
        <div
          key={index}
          className={`cursor-pointer border-b-2 border-gray-200 px-2 py-4 ${
            selectedUserId === user.id ? 'bg-gray-200' : ''
          }`}
          onClick={() => onSelectUser(user.id)}
        >
          <div className="w-full">
            <img
              src={user.imageURL}
              className="h-12 w-12 rounded-full object-cover"
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
