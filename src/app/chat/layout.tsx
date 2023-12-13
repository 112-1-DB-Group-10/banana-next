import users from './data/users.json';
import UserList from './userlist';

export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log('users', users);
  return (
    <div className="flex w-screen flex-1 justify-around pt-24">
      <UserList
        selectedUserId={null}
        onSelectUser={function (userId: string): void {
          throw new Error('Function not implemented.');
        }}
      />
      {children}
    </div>
  );
}
