'use server';

import Link from 'next/link';
import {
  updateBelongsTo,
  insertApplication,
  insertBelongsTo,
  NewApplications,
  NewLabels,
} from '@/actions/adminActions';
import { insertTopic, NewTopics, deleteTopic } from '@/actions/adminActions';
import { getChatBox, getConversations } from '@/actions/chatActions';

export default async function HomePage() {
  const conversations = await getConversations('0007970e-3ee4-4814-a886-0717399d1547');
  console.log(conversations);
  // const chatBox = await getChatBox('0007970e-3ee4-4814-a886-0717399d1547', 'c2cba69e-d7d4-4280-b8d1-fe1995f52a2c');
  // const application: NewApplications = {
  //   user_id: "af384980-d23b-4a43-b03c-7324041c808d",
  //   englishname: "Winner",
  //   enroll_year: 2023,
  //   verification: "pass",
  //   institute: "華梵大學",
  //   document_url: "https://drive.google.com/file/d/1ExMxLCiKifVspjZRJ7EBWGv9EzU6ki45/view?usp=sharing",
  // };
  // console.log(application);
  // await insertApplication(
  //     application
  // );
  // const topic: NewTopics = {
  //   topic_name: '耍笨',
  // };
  // await insertTopic(topic);
  // console.log(topic.topic_name);
  // await deleteTopic(topic);

  // const topic: NewTopics = {
  //   topic_name: '耍笨',
  // };
  // const label_name = '測試用標籤2'
  // await updateBelongsTo(topic, label_name);
  // const label: NewLabels = {
  //   label_name: '測試用標籤1',
  //   created_user: "002a91b7-6e79-48fc-a8ed-70de45ebfcd800005a81-6b0b-4829-9216-3797e122ecd8"
  // };

  // await insertBelongsTo(topic, label_name);

  return (
    <div>
      <Link className="bg-blue" href="/a">
        B
      </Link>
    </div>
  );
}
