'use client';

import { Topic } from '@/actions/types';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const TopicItem = ({ topic }: { topic: Topic }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleTopicSelect = (topic: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('topic', topic);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleLableSelect = (label: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('label', label);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <AccordionItem value={`item-${topic.topic_name}`}>
      <AccordionTrigger
        className={cn('text-l', 
          searchParams.get('topic') === topic.topic_name && 'text-blue-500'
  )}
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
  );
};

export default TopicItem;
