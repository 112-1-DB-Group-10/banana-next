'use server';

import { getHotCards, getNewestCards, searchCards, getCardsByLabel } from "@/db/cardQueries";



export default async function HomePage() {

  // functions testing

  // const hotCards = await getHotCards();
  // const newCards = await getNewestCardsPublic(10, 2);
  // const searchedCards = await searchCards(false, "好想", 10, 2);
  const filteredCardsByLabel = await getCardsByLabel(true, "天文學");

  return (
    <div>
      {/* {ret.map((row, index) => (
        <div key={index}>{row.card_id}: {row.count}</div>
      ))} */}
    </div>
  );
}
