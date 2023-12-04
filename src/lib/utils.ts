import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Following } from '@/data/fake';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getNextStory(
  followings: Following[],
  params: { uid: string; sid: string },
) {
  let foundUid = false;
  for (const user of followings) {
    if (foundUid || user.id === params.uid) {
      foundUid = true;
      const storyIndex = user.stories.findIndex(
        (story) => story.id === params.sid,
      );
      if (storyIndex !== -1 && storyIndex + 1 < user.stories.length) {
        // Next story of the same user
        return `/story/${user.id}/${user.stories[storyIndex + 1].id}`;
      } else if (storyIndex === -1) {
        // Check for the next user's first story
        if (user.stories.length > 0) {
          return `/story/${user.id}/${user.stories[0].id}`;
        }
      }
    }
  }
  return '/';
}
