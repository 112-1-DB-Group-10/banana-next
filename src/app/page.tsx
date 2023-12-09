'use server';
// home
// import { getMessages } from '@/actions';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const topics = ['運動', '音樂', '學科', '生活', 'AA', 'BB', 'CC', 'DD', 'EE', 'FF', 'GG', 'HH', 'II', 'JJ']

export default async function HomePage() {
  // const messages = await getMessages();
  return (
    <div className="flex w-full p-4 h-[80vh]">
      <div className="flex items-start">
        <Accordion type="single" collapsible className="w-full">
          {topics.map((topic, index) => (
            <AccordionItem key={index} value={`item-${index + 1}`}>
              <AccordionTrigger>{topic}</AccordionTrigger>
              <AccordionContent>
                Content for {topic}.
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}