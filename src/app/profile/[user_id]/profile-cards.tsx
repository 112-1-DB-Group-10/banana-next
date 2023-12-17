'use server'

import * as React from 'react';
import SkillCard from '@/components/skill-card';


import { getCardsPostedByUser, getCardsLikedOrCommentedByUser } from '@/actions/cardActionsV2';
import { UUID } from 'crypto';

const ProfileCards = async ({user_id, posted}: {user_id: UUID, posted: boolean}) => {

    const cardsPosted = await getCardsPostedByUser(user_id, 10000, 1);
    const cardsLikedOrCommented = await getCardsLikedOrCommentedByUser(user_id, 10000, 1);

    return (
        <div>
            {posted ?
            <div className="no-scrollbar flex max-h-[300px] flex-col overflow-y-auto px-4">
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
            :
            <div className="no-scrollbar flex max-h-[300px] flex-col overflow-y-auto px-4">
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
        // <div>test</div>
            }
            
        </div>
    )
}

export default ProfileCards