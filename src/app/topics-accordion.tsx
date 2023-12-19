'use client';

import { Accordion } from '@radix-ui/react-accordion';
import { Topic } from '@/actions/types';
import TopicItem from './topic-item';

const TopicsAccordion = ({ topics }: { topics: Topic[] }) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {topics.map((topic, index) => (
        <TopicItem key={`topic-item-${index}`} topic={topic} />
      ))}
    </Accordion>
  );
};

export default TopicsAccordion;
