'use server';

import CommentSection from './comment-section';
import Control from './control';

const Footer = async ({
  numLikes,
  numComments,
}: {
  numLikes: number;
  numComments: number;
}) => {
  return (
    <div>
      <Control numLikes={numLikes} numComments={numComments} />
      <CommentSection />
    </div>
  );
};

export default Footer;
