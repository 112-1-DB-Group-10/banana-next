'use client';

import { TabsList, TabsTrigger } from '@radix-ui/react-tabs';

const ApplicationTabList = () => {
  return (
    <TabsList className="flex w-full">
      <TabsTrigger value="pending" className="h-[35px] w-[30rem]">
        pending
      </TabsTrigger>
      <TabsTrigger value="fail" className="h-[35px] w-[30rem]">
        fail
      </TabsTrigger>
      <TabsTrigger value="pass" className="h-[35px] w-[30rem]">
        pass
      </TabsTrigger>
    </TabsList>
  );
};

export default ApplicationTabList;
