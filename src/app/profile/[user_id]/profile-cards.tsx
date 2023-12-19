'use server';

import {
  getCardsLikedOrCommentedByUser,
  getCardsPostedByUser,
} from '@/actions/cardActions';
import SkillCard from '@/components/skill-card';
import { getUserSession } from '@/lib/session';

const ProfileCards = async ({ posted }: { posted: boolean }) => {
  const session = await getUserSession();
  const cardsPosted = await getCardsPostedByUser(session.user_id, 10000, 1);
  const cardsLikedOrCommented = await getCardsLikedOrCommentedByUser(
    session.user_id,
    10000,
    1,
  );

  return posted ? (
    <div className="no-scrollbar flex h-[20rem] flex-col px-4">
      {cardsPosted.length > 0 ? (
        cardsPosted.map((card, index) => (
          <div key={`card-${index}`} className="py-2">
            <SkillCard cardData={card}></SkillCard>
          </div>
        ))
      ) : (
        <div className="p-2">還沒有發布過的卡片</div>
      )}
    </div>
  ) : (
    <div className="no-scrollbar flex h-[20rem] flex-col px-4">
      {cardsLikedOrCommented.length > 0 ? (
        cardsLikedOrCommented.map((card, index) => (
          <div key={`card-${index}`} className="py-2">
            <SkillCard cardData={card}></SkillCard>
          </div>
        ))
      ) : (
        <div className="p-2">還沒有互動過的卡片</div>
      )}
    </div>
  );
};

export default ProfileCards;
