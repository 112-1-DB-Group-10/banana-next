'use server';

import { getAllLabelsWithTopics } from '@/actions/cardActions';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { getUserSession } from '@/lib/session';
import DeleteLableItem from './delete-label-form';
import DeleteTopicItem from './delete-topic-form';
import InsertLableItem from './insert-label-form';
import InsertTopicItem from './insert-topic-form';

const ManagePage = async () => {
  const topics = [
    '體育',
    '音樂',
    '科技',
    '藝術',
    '健康',
    '語言',
    '遊戲',
    '文學',
    '學術',
    '商業',
  ];
  const topics_labels = await getAllLabelsWithTopics();
  const sesion = await getUserSession();

  return (
    <div className="flex flex-col justify-start overflow-y-scroll">
      {topics_labels.map((topic_labels, index) => (
        <div className="flex p-3">
          {/* <div className="font-bold text-2xl pr-4" key={index}>{topic_labels.topic_name}</div> */}
          <DeleteTopicItem topic={topic_labels.topic_name}></DeleteTopicItem>
          {topic_labels.labels.map((label) => (
            <div className="px-2">
              {/* <Button>{label}</Button> */}
              <DeleteLableItem label={label} />
            </div>
          ))}
          <div className="px-2">
            {/* <Button>+</Button> */}
            <InsertLableItem
              topic={topic_labels.topic_name}
              user_id={sesion.user_id}
            />
          </div>
        </div>
      ))}
      {/* <Button className="max-w-[5rem]">新增主題</Button> */}
      <InsertTopicItem></InsertTopicItem>
    </div>
  );
};

export default ManagePage;
