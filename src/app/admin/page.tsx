'use client';

import { Separator } from '@/components/ui/separator';
import Avatar from '@/components/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getTimeSinceByDate } from '@/lib/utils';

const reviewing = () => {
  return (
    <Tabs defaultValue="account">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="fail">fail</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
      <Card className="bg-blueGray-50 w-[45rem] pt-4">
            <div className="flex justify-between px-4">
            <div className="flex">
                <div className="relative p-4">
                <Avatar image={'https://github.com/shadcn.png'} />
                </div>
                <div className="flex flex-col p-4">
                <div className="flex">
                    <div className="pr-2 text-lg font-bold">username</div>
                    <Separator orientation="vertical" />
                    <div className="pl-2">男</div>
                    <div className="pl-2">institute</div>
                </div>
                <div className="py-2">abcdefg2222@gmail.com</div>
                </div>
            </div>
            </div>
        </Card>
        <Card className="bg-blueGray-50 w-[45rem] pt-4">
            <div className="flex justify-between px-4">
            <div className="flex">
                <div className="relative p-4">
                    <Avatar image={'https://github.com/shadcn.png'} />
                </div>
                <div className="flex flex-col p-4">
                <div className="flex">
                    <div className="pr-2 text-lg font-bold">username</div>
                    <Separator orientation="vertical" />
                    <div className="pl-2">男</div>
                    <div className="pl-2">institute</div>
                </div>
                <div className="py-2">abcdefg2222@gmail.com</div>
                </div>
            </div>
            </div>
        </Card>
        <Card className="bg-blueGray-50 w-[45rem] pt-4">
            <div className="flex justify-between px-4">
            <div className="flex">
                <div className="relative p-4">
                <Avatar image={'https://github.com/shadcn.png'} />
                </div>
                <div className="flex flex-col p-4">
                <div className="flex">
                    <div className="pr-2 text-lg font-bold">username</div>
                    <Separator orientation="vertical" />
                    <div className="pl-2">男</div>
                    <div className="pl-2">institute</div>
                </div>
                <div className="py-2">abcdefg2222@gmail.com</div>
                </div>
            </div>
            </div>
        </Card>
        <Card className="bg-blueGray-50 w-[45rem] pt-4">
            <div className="flex justify-between px-4">
            <div className="flex">
                <div className="relative p-4">
                <Avatar image={'https://github.com/shadcn.png'} />
                </div>
                <div className="flex flex-col p-4">
                <div className="flex">
                    <div className="pr-2 text-lg font-bold">username</div>
                    <Separator orientation="vertical" />
                    <div className="pl-2">男</div>
                    <div className="pl-2">institute</div>
                </div>
                <div className="py-2">abcdefg2222@gmail.com</div>
                </div>
            </div>
            </div>
        </Card>
      </TabsContent>
      <TabsContent value="password">
      <Card className="bg-blueGray-50 w-[45rem] pt-4">
            <div className="flex justify-between px-4">
            <div className="flex">
                <div className="relative p-4">
                <Avatar image={'https://github.com/shadcn.png'} />
                </div>
                <div className="flex flex-col p-4">
                <div className="flex">
                    <div className="pr-2 text-lg font-bold">username</div>
                    <Separator orientation="vertical" />
                    <div className="pl-2">男</div>
                    <div className="pl-2">institute</div>
                </div>
                <div className="py-2">abcdefg2222@gmail.com</div>
                </div>
            </div>
            </div>
        </Card>
        <Card className="bg-blueGray-50 w-[45rem] pt-4">
            <div className="flex justify-between px-4">
            <div className="flex">
                <div className="relative p-4">
                <Avatar image={'https://github.com/shadcn.png'} />
                </div>
                <div className="flex flex-col p-4">
                <div className="flex">
                    <div className="pr-2 text-lg font-bold">username</div>
                    <Separator orientation="vertical" />
                    <div className="pl-2">男</div>
                    <div className="pl-2">institute</div>
                </div>
                <div className="py-2">abcdefg2222@gmail.com</div>
                </div>
            </div>
            </div>
        </Card>
        <Card className="bg-blueGray-50 w-[45rem] pt-4">
            <div className="flex justify-between px-4">
            <div className="flex">
                <div className="relative p-4">
                <Avatar image={'https://github.com/shadcn.png'} />
                </div>
                <div className="flex flex-col p-4">
                <div className="flex">
                    <div className="pr-2 text-lg font-bold">username</div>
                    <Separator orientation="vertical" />
                    <div className="pl-2">男</div>
                    <div className="pl-2">institute</div>
                </div>
                <div className="py-2">abcdefg2222@gmail.com</div>
                </div>
            </div>
            </div>
        </Card>
      </TabsContent>
      <TabsContent value="fail">
      <Card className="bg-blueGray-50 w-[45rem] pt-4">
            <div className="flex justify-between px-4">
            <div className="flex">
                <div className="relative p-4">
                <Avatar image={'https://github.com/shadcn.png'} />
                </div>
                <div className="flex flex-col p-4">
                <div className="flex">
                    <div className="pr-2 text-lg font-bold">username</div>
                    <Separator orientation="vertical" />
                    <div className="pl-2">男</div>
                    <div className="pl-2">institute</div>
                </div>
                <div className="py-2">abcdefg2222@gmail.com</div>
                </div>
            </div>
            </div>
        </Card>
        <Card className="bg-blueGray-50 w-[45rem] pt-4">
            <div className="flex justify-between px-4">
            <div className="flex">
                <div className="relative p-4">
                <Avatar image={'https://github.com/shadcn.png'} />
                </div>
                <div className="flex flex-col p-4">
                <div className="flex">
                    <div className="pr-2 text-lg font-bold">username</div>
                    <Separator orientation="vertical" />
                    <div className="pl-2">男</div>
                    <div className="pl-2">institute</div>
                </div>
                <div className="py-2">abcdefg2222@gmail.com</div>
                </div>
            </div>
            </div>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default reviewing;



    {/* 
    點下左邊那團展開的樣子
    <Card className="space-around h-fit w-[40rem] flex-col">
    <CardHeader className="flex-row items-center justify-between">
    <div className="flex items-center gap-5">
        <Avatar image={"https://github.com/shadcn.png"}/>
        <CardTitle className="">
        <div>username</div>
        <CardDescription>institute</CardDescription>
        <div className="text-xs font-light">
            2023-12-25
        </div>
        </CardTitle>
    </div>
    </CardHeader>
    <CardContent>
    <form>
        <div className="grid w-full items-center gap-4">
        <div className="flex h-5 items-center space-x-4">
            <div className="font-bold">地點</div>
            <Separator orientation="vertical" />
            <Badge variant="outline">台北</Badge>
        </div>

        <div className="flex h-5 items-center space-x-4">
            <div className="font-bold">想學的技能</div>
            <Separator orientation="vertical" />
            <Badge variant="outline">跟你媽做愛</Badge>
        </div>

        <div className="flex h-5 items-center space-x-4">
            <div className="font-bold">擅長的技能</div>
            <Separator orientation="vertical" />
            <Badge variant="outline">抽插你爸</Badge>
        </div>

        <div className="flex flex-col space-y-1.5 font-bold">
            其他想說的話
        </div>
        <div>幹你娘機掰</div>
        </div>
    </form>
    </CardContent>
    <CardFooter className="flex">
    <Button variant="outline" className="mx-2">
        讚 69
    </Button>
    <Button variant="outline" className="mx-2">
        私訊
    </Button>
    </CardFooter>
</Card> */}