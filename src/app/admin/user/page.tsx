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
import users_data from '@/actions/users.json'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card';
  import { isURL } from '@/lib/utils';
  import Image from 'next/image';

export default function UserPage() {
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

  return (
    <div className="border-blueGray-200 mt-5 flex flex-col border-t px-2 py-5 items-center">
      <Input className='pl-4'></Input>

      <Tabs defaultValue="default" className="w-[60rem] px-4 py-4">
        <TabsList>
          <TabsTrigger value="default" className="h-[35px] w-[30rem]">
            一般用戶
          </TabsTrigger>
          <TabsTrigger value="suspended" className="h-[35px] w-[30rem]">
            已停權用戶
          </TabsTrigger>
        </TabsList>
        <TabsContent value="default">
            <Card className=''>
                {users_data.map((user, index) => (
                    <div className='flex flex-row h-[4rem] justify-between items-center'>
                    <div className='flex flex-row'>
                      <Image
                        src={
                            isURL(user.avatar)
                            ? user.avatar
                            : `data:image/png;base64,${user.avatar}`
                        }
                        alt="User Avatar"
                        width={50}
                        height={50}
                    />
                      <div className='p-4 font-bold w-[10rem]'>{user.username}</div>
                      <div className='p-4'>{user.sex == 'female' ? '女' : '男'}</div>
                      <div className='p-4 w-[3rem]'>{user.age}</div>
                      <div className='p-4 w-[14rem]'>{user.email}</div>
                      <div className='p-4 w-[10rem]'>{user.institute}</div>
                      <div className='p-4 w-[8rem]'>{user.suspended ? '已停權' : '一般用戶'}</div>
                    </div>
                    <div className='p-4'>
                        <Button>停權此用戶</Button>
                    </div>
                    
                </div>
                ))}
                
            </Card>
        </TabsContent>
        <TabsContent value="suspended">
          <div>test2</div>
        </TabsContent>
      </Tabs>
    </div>
  );
}