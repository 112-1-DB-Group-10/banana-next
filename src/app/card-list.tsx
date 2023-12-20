'use client';

import {
  getCardsByLabel,
  getCardsByTopic,
  getPopularCards,
} from '@/actions/cardActions';
import { CardData } from '@/actions/types';
import SkillCard from '@/components/skill-card/skill-card';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import CardSkeleton from './card-skeleton';

const CardList = ({ isVerified }: { isVerified: boolean }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [cards, setCards] = useState<CardData[]>([]);
  const router = useRouter();
  const [location, setLocation] = useState<string>('');
  const [topic, setTopic] = useState<string>('');
  const [label, setLabel] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  // const loadMore = async () => {
  //   let newCards: CardData[];
  //   console.log(
  //     `Search for | topic=${topic} | label=${label} | page=${page} | location=${location} |`,
  //   );
  //   if (label !== '') {
  //     newCards = await getCardsByLabel(
  //       isVerified,
  //       label,
  //       location ? [location] : [],
  //       15,
  //       page,
  //     );
  //   } else if (topic !== '') {
  //     newCards = await getCardsByTopic(
  //       isVerified,
  //       topic,
  //       location ? [location] : [],
  //       15,
  //       page,
  //     );
  //     console.log(page);
  //     console.log(topic);
  //     console.log(page, newCards);
  //   } else {
  //     newCards = await getPopularCards(
  //       isVerified,
  //       location ? [location] : [],
  //       15,
  //       page,
  //     );
  //   }
  //   setPage(page + 1);
  //   setCards([...cards, ...newCards]);
  // };
  const loadMore = useCallback(async () => {
    let newCards: CardData[];
    console.log(
      `Search for | topic=${topic} | label=${label} | page=${page} | location=${location} |`,
    );
    if (label !== '') {
      newCards = await getCardsByLabel(
        isVerified,
        label,
        location ? [location] : [],
        15,
        page,
      );
    } else if (topic !== '') {
      newCards = await getCardsByTopic(
        isVerified,
        topic,
        location ? [location] : [],
        15,
        page,
      );
      console.log(page);
      console.log(topic);
      console.log(page, newCards);
    } else {
      newCards = await getPopularCards(
        isVerified,
        location ? [location] : [],
        15,
        page,
      );
    }
    setPage(page + 1);
    setCards([...cards, ...newCards]);
  }, [isVerified, label, location, page, cards, topic]);
  useEffect(() => {
    setCards([]);
    setPage(Number(searchParams.get('page') || 1));
    if (searchParams.get('topic')) {
      if (searchParams.get('topic') !== topic && label === '') {
        setTopic(searchParams.get('topic') as string);
        setPage(1);
      }
    } else {
      setTopic('');
    }
    if (searchParams.get('label')) {
      if (searchParams.get('label') !== label) {
        setLabel(searchParams.get('label') as string);
        setCards([]);
        setPage(1);
      }
    } else {
      setLabel('');
    }
    if (searchParams.get('location')) {
      if (searchParams.get('location') !== location) {
        setLocation(searchParams.get('location') as string);
        setCards([]);
        setPage(1);
      }
    } else {
      setLocation('');
    }
  }, [searchParams]);

  return (
    <div className="flex-1">
      <div className="no-scrollbar flex h-[45rem] w-fit flex-col overflow-y-auto p-4">
        {cards.map((card, index) => (
          <div key={`card-${index}`} className="py-2">
            <SkillCard card={card} />
          </div>
        ))}
        <CardSkeleton loadMore={loadMore} />
      </div>
    </div>
  );
};

export default CardList;
