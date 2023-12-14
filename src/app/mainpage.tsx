'use client';

import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Cardstemp from '@/components/card'

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

const commentData = [
  {
    card_id: 'aaa',
    user_id: 'bbb',
    avatar: 'https://github.com/shadcn.png',
    username: 'Min Min',
    timestamp: '1分鐘前',
    contents: '幫自己推'
  },
  {
    card_id: 'aaa',
    user_id: 'ccc',
    avatar: 'https://github.com/shadcn.png',
    username: 'Wen',
    timestamp: '1分鐘前',
    contents: '我是賴玟'
  }]

const manyCardData = [{
  card_id: 'abc',
  user_id: 'ddd',
  avatar: 'https://github.com/shadcn.png',
  username: 'mm_9al',
  institute: '國立台灣大學',
  timestamp: '20分鐘前',
  location: '台北',
  want_to_learn: 'FLOLAC',
  good_at: '寫前端',
  contnets: '我好想學 FLOLAC 喔，有人想一起去今年的 FLOLAC 嗎？',
  likes: 100,
  comments: commentData
},{
  card_id: 'aaa',
  user_id: 'bbb',
  avatar: 'https://github.com/shadcn.png',
  username: 'Min Min',
  institute: '國立台灣大學',
  timestamp: '10分鐘前',
  location: '線上',
  want_to_learn: '寫前端',
  good_at: 'FLOLAC',
  contnets: '我不會寫前端嗚嗚嗚嗚嗚',
  likes: 10,
  comments: commentData
}]

export default function MainPage() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
    setSelectedLabel('');
  };

  const handleLableSelect = (label: string) => {
    setSelectedLabel(label);
  };

  return (
    <div className="flex w-full justify-center">
      <div className="">
        <Input></Input>
        <div className="py-2 text-xl font-bold">主題</div>
        <div className="no-scrollbar flex max-h-[45vh] w-[180px] items-start overflow-y-auto">
          <Accordion type="single" collapsible className="w-full">
            {topics.map((topic, index) => (
              <AccordionItem key={index} value={`item-${index + 1}`}>
                <AccordionTrigger
                  className={`text-l ${
                    selectedTopic === topic ? 'text-blue-500' : ''
                  }`}
                  onClick={() => handleTopicSelect(topic)}
                >
                  {topic}
                </AccordionTrigger>
                <AccordionContent>
                  {labels.map((label, index) => (
                    <Button
                      key={index}
                      className={`w-[180px] bg-white text-black hover:bg-gray-200 py-2`}
                      onClick={() => handleLableSelect(label)}
                    >
                      {label}
                    </Button>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="py-2 text-xl font-bold">地點</div>
        <div className="no-scrollbar flex max-h-[25vh] w-[180px] items-start overflow-y-auto">
          <Accordion type="single" collapsible className="w-full">
            {locations.map((location, index) => (
              <AccordionItem key={index} value={`item-${index + 1}`}>
                <AccordionTrigger>{location}</AccordionTrigger>
                {/* <AccordionContent>Content for {location}.</AccordionContent> */}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      
      <Tabs defaultValue='popular' className="w-[42rem] px-4">
      <TabsList>
        <TabsTrigger value="popular" className='w-[20rem] h-[35px]'>熱門</TabsTrigger>
        <TabsTrigger value="recent" className='w-[20rem] h-[35px]'>最新</TabsTrigger>
      </TabsList>
      <TabsContent value="popular">
      <div className="flex flex-grow p-1">
        <div className="mx-6 text-xl font-bold">
          {selectedTopic ? `${selectedTopic}` : '熱門'}
        </div>
        <div className="mx-6 text-xl">
          {selectedLabel ? `>${selectedLabel}` : ''}
        </div>
      </div>
      {/* {cardstemp()} */}
      <div className='no-scrollbar flex flex-col overflow-y-auto max-h-[600px]'>
      {manyCardData.map((cardData, index) => (
        <div className='py-2'>
        <Cardstemp cardData={cardData}></Cardstemp>
        </div>
      ))}
      </div>
      
      </TabsContent>
      <TabsContent value="recent">
      <div className="flex flex-grow p-1">
        <div className="mx-6 text-xl font-bold">
          {selectedTopic ? `${selectedTopic}` : '最新'}
        </div>
        <div className="mx-6 text-xl">
          {selectedLabel ? `>${selectedLabel}` : ''}
        </div>
      </div>
      </TabsContent>
      </Tabs>
      
    </div>
  );
}
