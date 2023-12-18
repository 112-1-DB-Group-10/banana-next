'use client';

import { TabsList, TabsTrigger } from '@radix-ui/react-tabs';

const UserTabList = () => {
  return (
    <TabsList className="flex w-full">
      <TabsTrigger value="default" className="h-[35px] w-[30rem]">
        一般用戶
      </TabsTrigger>
      <TabsTrigger value="suspended" className="h-[35px] w-[30rem]">
        已停權用戶
      </TabsTrigger>
    </TabsList>
  );
};

export default UserTabList;
