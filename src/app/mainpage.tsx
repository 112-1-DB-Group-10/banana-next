'use client'

import React, { useState } from 'react';

import {Input} from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button";

const topics = ['運動', '音樂', '學科', '生活', 'AA', 'BB', 'CC', 'DD', 'EE', 'FF', 'GG', 'HH', 'II', 'JJ']
const locations = ['線上', '台北', '新北', '桃園', 'aa', 'bb', 'cc', 'dd', 'ee', 'ff', 'gg']
const labels = ['zz', 'yy', 'xx', 'ww', 'vv', 'uu', 'tt']

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
        <div className="flex w-full p-4 justify-between">
            <div className="">
        <Input></Input>
        <div className="text-xl font-bold py-2">Topic</div>
        <div className="flex items-start overflow-y-auto max-h-[38vh] w-[180px]">
          <Accordion type="single" collapsible className="w-full">
            {topics.map((topic, index) => (
              <AccordionItem key={index} value={`item-${index + 1}`}>
                <AccordionTrigger className={`text-l ${selectedTopic === topic ? 'text-blue-500' : ''}`}
                  onClick={() => handleTopicSelect(topic)}>{topic}</AccordionTrigger>
                <AccordionContent>
                  {labels.map((label, index) => (
                    <Button key={index} className={`bg-white text-black w-[180px] hover:bg-gray-200` }
                    onClick={() => handleLableSelect(label)}>{label}</Button>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-xl font-bold py-2">Location</div>
        <div className="flex items-start overflow-y-auto max-h-[30vh] w-[180px]">
          <Accordion type="single" collapsible className="w-full">
            {locations.map((location, index) => (
              <AccordionItem key={index} value={`item-${index + 1}`}>
                <AccordionTrigger>{location}</AccordionTrigger>
                <AccordionContent>
                  Content for {location}.
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

      </div>
      
      <div className="flex-grow p-1 flex">
      <div className="text-xl font-bold mx-6">{selectedTopic ? `${selectedTopic}` : 'No Topic Selected'}</div>
      <div className="text-xl mx-6">{selectedLabel ? `>${selectedLabel}` : ''}</div>
      </div>
        </div>
    )
}