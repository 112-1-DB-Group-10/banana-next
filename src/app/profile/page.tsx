'use client';

import Image from 'next/image';
import { User } from '@/db/types';
import users from '@/db/users.json';
import { isURL } from '@/lib/utils';

const Profile = () => {
  const userId = 'xdd877';
  const user = users.filter((user) => user.user_id === userId).pop() as User;
  return (
    <section className="bg-blueGray-50 w-[50rem] pt-16">
      <div className="mx-auto w-full px-4">
        <div className="relative mb-6 mt-16 flex w-full min-w-0 flex-col break-words rounded-lg bg-white shadow-xl">
          <div className="px-6">
            <div className="flex flex-wrap justify-center">
              <div className="flex w-full justify-center px-4">
                <div className="relative">
                  <Image
                    src={
                      isURL(user.avatar)
                        ? user.avatar
                        : `data:image/png;base64,${user.avatar}`
                    }
                    alt="User Avatar"
                    width={100}
                    height={100}
                  />
                </div>
              </div>
            </div>
            <div className="mt-12 text-center">
              <h3 className="text-blueGray-700 mb-2 text-xl font-semibold leading-normal">
                Morris Chen
              </h3>
              <a className="font-normal text-blue-500">Edit</a>
              <div className="text-blueGray-400 mb-2 mt-0 text-sm font-bold uppercase leading-normal">
                <i className="fas fa-map-marker-alt text-blueGray-400 mr-2 text-lg"></i>
                National Taiwan University
              </div>
              <div className="text-blueGray-600 mb-2 mt-5">
                <i className="fas fa-briefcase text-blueGray-400 mr-2 text-lg"></i>
                spruce7777@gmail.com
              </div>
              <div className="text-blueGray-600 mb-2">
                <i className="fas fa-university text-blueGray-400 mr-2 text-lg"></i>
                Male
              </div>
            </div>
            <div className="border-blueGray-200 mt-10 border-t py-10 text-center">
              <div className="flex flex-wrap justify-center">
                <div className="mx-auto w-full max-w-5xl px-4">
                  <p className="text-blueGray-700 mb-4 text-lg leading-relaxed">
                    發過的卡片
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
