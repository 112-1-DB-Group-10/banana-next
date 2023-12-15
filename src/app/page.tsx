'use server';

import MainPage from './mainpage';

export default async function HomePage() {
  return (
    <div className="flex w-full flex-1 justify-between pl-4 pr-4">
      <MainPage />
    </div>
  );
}
