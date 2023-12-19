'use client';

import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getDefaultApplications, getDefaultUsers, queryApplications } from '@/actions/adminActions';
import { UserApplication, UserProfile } from '@/actions/types';
import UserSkeleton from './review-skeleton';
import ApplicationItem from './review-item';

const ReviewList = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [reviews, setReviews] = useState<UserApplication[]>([]);
  const router = useRouter();
  const loadMore = async () => {
    const newReviews = await getDefaultApplications(
      Number(searchParams.get('page')) || 1,
      20,
    );
    router.push(
      `${pathname}?page=${(Number(searchParams.get('page')) || 1) + 1}`,
    );
    setReviews([...reviews, ...newReviews]);
  };

  // useEffect(() => {
  //   (async () => {
  //     const newUsers = await getDefaultUsers(page, 15);
  //     console.log(newUsers);
  //     setUsers([...users, ...newUsers]);
  //     console.log(newUsers);
  //   })();
  // }, [page]);

  return (
    <div className="flex w-full flex-col gap-1 p-6">
      {reviews.map((review, index) => {
        return <ApplicationItem key={`review-item-${index}`} application={review} />;
      })}
      <UserSkeleton loadMore={loadMore} />
    </div>
  );
};

export default ReviewList;
