'use server';

import { v4 as uuidv4 } from 'uuid';
import { getUsersbySubstring } from '@/actions/adminActions';
import {
  getAllLabelsWithTopics, // getLabelsByTopic,
  getPopularCards,
  getNewestCards, // getCardById,
  getCardsBySubstring,
  getCardsByLabel,
  getCardsByTopic,
  getCardsPostedByUser,
  getCardsLikedOrCommentedByUser, //
  likeCard,
  commentOnCard,
  deleteCard,
  updateCard,
  getCommentsByCardId,
  getLabelsByTopic,
  getLocationsByCardId,
  getInstituteByUserId,
  getWantToLearnByCardId,
  getGoodAtByCardId,
  NewLike,
} from '@/actions/cardActions';
import { CardData } from '@/actions/types';

export default async function HomePage() {
  // const i = await getCardsByLabel(false, '曲棍球', ['線上'], 10, 1);
  // const i = await getUsersbySubstring(false, '', 10, 1);
  // console.log(i);
  // function testing
  //   const like :NewLike = {
  //     user_id: "75f96dc4-d06c-47d1-a5af-06b6c9060252",
  //     card_id: 'fb80296b-2a75-4631-b681-f11d8fc23331',
  //     time_stamp: new Date()
  // }

  // console.log(i);

  const cardPerPage = 10,
    page = 1;
  // const popularCards = await getPopularCards(true, [] ,cardPerPage, page);
  // const newestCards = await getNewestCards(true, [], cardPerPage, page);
  // const oneCard = await getCardById("bde171ab-9b44-4343-b794-3701a14ca4a3");
  // const searchedCards = await getCardsBySubstring(false, "好想", [], cardPerPage, page);
  // const filteredCardsByLabel = await getCardsByLabel(true, "天文學", ["台北", "彰化"], cardPerPage, page);
  // const filteredCardsByTopic = await getCardsByTopic(true, "體育", ["台北"], cardPerPage, page);
  // const cardsPostedByUser = await getCardsPostedByUser("9456173c-2dfd-4f98-9012-6573ab4f15e8", cardPerPage, page);
  // const cardsLikedOrCommentedByUser = await getCardsLikedOrCommentedByUser("ce9534bd-efe3-4187-b8a3-4b2d7da96018", cardPerPage, page);
  // await deleteCard("ada86234-12cb-40df-8ac4-b7057798da3d");
  // await updateCard("ada86234-12cb-40df-8ac4-b7057798da3d", new Date(), "I want to rest.");
  // const labels = await getAllLabelsWithTopics();
  // const comments = await getCommentsByCardId("24bee582-3f55-4cc7-9e67-d0e0e9c0f6d8");
  // const popularCards = await getPopularCards();
  return (
    <div>
      {/* {ret.map((row, index) => (
        <div key={index}>{row.card_id}: {row.count}</div>
      ))} */}
    </div>
  );
}
