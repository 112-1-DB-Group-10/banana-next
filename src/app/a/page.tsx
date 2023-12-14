'use server';

import { 
  getLabelsByTopic,

  getPopularCards,
  getNewestCards,

  getCardById,
  getCardsBySubstring,
  getCardsByLabel,
  getCardsByTopic,
  getCardsPostedByUser,
  getCardsLikedOrCommentedByUser,

  likeCard,
  commentOnCard,
  deleteCard,
  updateCard,
} from "@/actions/cardActions";


import {v4 as uuidv4} from 'uuid';


export default async function HomePage() {

  // function testing

  const cardPerPage = 10, page = 1;
  // const popularCards = await getPopularCards(true, [] ,cardPerPage, page);
  // const newestCards = await getNewestCards(true, [], cardPerPage, page);
  // const oneCard = await getCardById("bde171ab-9b44-4343-b794-3701a14ca4a3");
  // const searchedCards = await getCardsBySubstring(false, "好想", [], cardPerPage, page);
  // const filteredCardsByLabel = await getCardsByLabel(true, "天文學", ["台北", "彰化"], cardPerPage, page);
  // const filteredCardsByTopic = await getCardsByTopic(true, "體育", ["台北"], cardPerPage, page);
  // const cardsPostedByUser = await getCardsPostedByUser("9456173c-2dfd-4f98-9012-6573ab4f15e8", cardPerPage, page);
  const cardsLikedOrCommentedByUser = await getCardsLikedOrCommentedByUser("ce9534bd-efe3-4187-b8a3-4b2d7da96018", cardPerPage, page);
  // await deleteCard("ada86234-12cb-40df-8ac4-b7057798da3d");
  // await updateCard("ada86234-12cb-40df-8ac4-b7057798da3d", new Date(), "I want to rest.");
  // const labels = await getLabelsByTopic("體育");

  // const popularCards = await getPopularCards();
  return (
    <div>
      {/* {ret.map((row, index) => (
        <div key={index}>{row.card_id}: {row.count}</div>
      ))} */}
    </div>
  );
}
