'use client';

import { useState } from 'react';
import cardData from '@/actions/cards.json';
import locations from '@/actions/locations.json';
import topics from '@/actions/topics.json';
import { CardData } from '@/actions/types';
import SkillCard from '@/components/skill-card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

  // const cards: CardData[] = );
  const cards: CardData[] = cardData.map((card) => ({
    ...card,
    time_stamp: new Date(card.time_stamp),
    comments: card.comments.map((comment) => ({
      ...comment,
      time_stamp: new Date(comment.time_stamp),
    })),
  }));

  return (
    <div className="flex w-full justify-center max-h-[30rem]">
      <div className="">
        <Input></Input>
        <div className="py-2 text-xl font-bold">主題</div>
        <div className="no-scrollbar flex max-h-[45vh] w-[180px] items-start overflow-y-auto">
          <Accordion type="single" collapsible className="w-full">
            {topics.map((topic, index) => (
              <AccordionItem key={index} value={`item-${index + 1}`}>
                <AccordionTrigger
                  className={`text-l ${
                    selectedTopic === topic.topic_name ? 'text-blue-500' : ''
                  }`}
                  onClick={() => handleTopicSelect(topic.topic_name)}
                >
                  {topic.topic_name}
                </AccordionTrigger>
                <AccordionContent>
                  {topic.labels.map((label, index) => (
                    <Button
                      key={index}
                      className="w-[180px] bg-white py-2 text-black hover:bg-gray-200"
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
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      <Tabs defaultValue="popular" className="w-[42rem] px-4">
        <TabsList>
          <TabsTrigger value="popular" className="h-[35px] w-[20rem]">
            熱門
          </TabsTrigger>
          <TabsTrigger value="recent" className="h-[35px] w-[20rem]">
            最新
          </TabsTrigger>
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
          <div className="no-scrollbar flex max-h-[600px] flex-col overflow-y-auto">
            {cards.map((card, index) => (
              <div key={`card-${index}`} className="py-2">
                <SkillCard cardData={card}></SkillCard>
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
