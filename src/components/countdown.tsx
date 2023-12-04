'use client';

import { useEffect, useState } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { followings } from '@/data/fake';
import { getNextStory } from '@/lib/utils';

export default function Countdown() {
  const [percentage, setPercentage] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams() as { uid: string; sid: string };
  const following = followings.find((following) => following.id === params.uid);
  const storyIndex = following?.stories.findIndex(
    (story) => story.id === params.sid,
  );

  // Start the countdown when the story starts
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setPercentage((prev) => {
          const newPercentage = prev + 2;
          if (newPercentage > 100) return 0;
          return newPercentage;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // Set percentage to 0 when the story changes
  useEffect(() => {
    setIsRunning(!pathname.includes('/new'));
    setPercentage(0);
  }, [params.sid]);

  // Pause the countdown when the space bar is pressed
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') setIsRunning((prev) => !prev);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // Pause the countdown when pressing the screen
  useEffect(() => {
    const onTouchStart = () => setIsRunning(false);
    const onTouchEnd = () => setIsRunning(true);
    window.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchend', onTouchEnd);
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  // Pause the countdown when anything is focused
  useEffect(() => {
    const onFocus = () => setIsRunning(false);
    const onBlur = () => setIsRunning(true);
    window.addEventListener('focusin', onFocus);
    window.addEventListener('focusout', onBlur);
    return () => {
      window.removeEventListener('focusin', onFocus);
      window.removeEventListener('focusout', onBlur);
    };
  }, []);

  // Go to the next story when the countdown is finished
  useEffect(() => {
    if (percentage === 100) {
      const nextStory = getNextStory(followings, params);
      router.push(nextStory);
    }
  }, [percentage]);

  if (pathname.includes('/new')) return null;
  if (!following || storyIndex === undefined || storyIndex === -1) return null;

  return (
    <>
      {following.stories.map((story, index) => (
        <div
          key={`story-${index}`}
          className="h-1 w-full rounded-full bg-white bg-opacity-50"
        >
          <div
            className="h-full rounded-full bg-white transition-all duration-100 ease-linear"
            style={{
              width: `${
                index < storyIndex ? 100 : index > storyIndex ? 0 : percentage
              }%`,
            }}
          />
        </div>
      ))}
    </>
  );
}
