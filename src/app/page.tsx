'use server';

import { getUserSession } from '@/lib/session';
import MainPage from './mainpage';

const topics = [
  '運動',
  '音樂',
  '學科',
  '生活',
  'AA',
  'BB',
  'CC',
  'DD',
  'EE',
  'FF',
  'GG',
  'HH',
  'II',
  'JJ',
];
const locations = [
  '線上',
  '台北',
  '新北',
  '桃園',
  'aa',
  'bb',
  'cc',
  'dd',
  'ee',
  'ff',
  'gg',
];
const labels = ['zz', 'yy', 'xx', 'ww', 'vv', 'uu', 'tt'];

export default async function HomePage() {
  const session = await getUserSession();
  console.log(session);
  return (
    // <div className="w-full h-full bg-blue-500"></div>
    <div className="flex w-full flex-1 justify-between p-4">
      <MainPage />
    </div>
  );
}
