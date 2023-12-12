import React from 'react';

interface User {
  name: string;
  message: string;
  imageURL: string;
}

const UserList: React.FC<{ users: User[] }> = ({ users }) => {
  return (
    <div>
      {users.map((user, index) => (
        <div key={index} className="flex flex-row py-4 px-2 items-center border-b-2">
          <div className="w-1/4">
            <img
              src={user.imageURL}
              className="object-cover h-12 w-12 rounded-full"
              alt=""
            />
          </div>
          <div className="w-full">
            <div className="text-lg font-semibold">{user.name}</div>
            <span className="text-gray-500">{user.message}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
