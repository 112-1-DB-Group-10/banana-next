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
        <div className="py-2 text-xl font-bold">Topic</div>
        <div className="no-scrollbar flex max-h-[38vh] w-[180px] items-start overflow-y-auto">
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

        <div className="py-2 text-xl font-bold">Location</div>
        <div className="no-scrollbar flex max-h-[30vh] w-[180px] items-start overflow-y-auto">
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
      
      <Tabs defaultValue='popular' className="w-[610px] px-4">
      <TabsList>
        <TabsTrigger value="popular" className='w-[300px] h-[35px]'>熱門</TabsTrigger>
        <TabsTrigger value="recent" className='w-[300px] h-[35px]'>最新</TabsTrigger>
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
