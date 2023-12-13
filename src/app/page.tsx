'use server';
// home
// import { getMessages } from '@/actions';
import {Input} from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button";
import MainPage from "./mainpage";

const topics = ['運動', '音樂', '學科', '生活', 'AA', 'BB', 'CC', 'DD', 'EE', 'FF', 'GG', 'HH', 'II', 'JJ']
const locations = ['線上', '台北', '新北', '桃園', 'aa', 'bb', 'cc', 'dd', 'ee', 'ff', 'gg']
const labels = ['zz', 'yy', 'xx', 'ww', 'vv', 'uu', 'tt']

export default async function HomePage() {
  
  return (
    // <div className="w-full h-full bg-blue-500"></div>
    <div className="flex w-full p-4 justify-between flex-1">
      <MainPage/>
    </div>
  );
}