'use server';

import { 
  getHotCards, 
  getNewestCards, 
  searchCards,
  getCardsByLabel,
  getCardsByTopic,
  getCardsPostedByUser,
  getCardsLikedOrCommentedByUser,
  likeCard,
  commentOnCard,
  deleteCard,
  updateCard,
 } from "@/db/cardActions";


import {v4 as uuidv4} from 'uuid';


export default async function HomePage() {

  // functions testing

  // const hotCards = await getHotCards();
  // const newCards = await getNewestCardsPublic(10, 2);
  // const searchedCards = await searchCards(false, "好想", 10, 2);
  // const filteredCardsByLabel = await getCardsByLabel(true, "天文學");
  // const filteredCardsByTopic = await getCardsByTopic(true, "體育");
  // const cardsPostedByUser = await getCardsPostedByUser("9456173c-2dfd-4f98-9012-6573ab4f15e8");
  // const cardsLikedOrCommentedByUser = await getCardsLikedOrCommentedByUser("ce9534bd-efe3-4187-b8a3-4b2d7da96018");
  // await deleteCard("ada86234-12cb-40df-8ac4-b7057798da3d");
  await updateCard("ada86234-12cb-40df-8ac4-b7057798da3d", new Date(), "I want to rest.");


  return (
    <div>


      {/* {ret.map((row, index) => (
        <div key={index}>{row.card_id}: {row.count}</div>
      ))} */}
    </div>
  );
}
