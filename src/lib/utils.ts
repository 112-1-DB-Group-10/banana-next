import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const isURL = (text: string) => {
  const urlPattern =
    /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}([-a-zA-Z0-9@:%_\+.~#?&//=]*)?$/;

  return urlPattern.test(text);
};

export const getTimeSinceByDate = (time_stamp: Date) => {
  const timeSinceString: string = time_stamp.toISOString();
  // var seconds = Math.floor((new Date() - time_stamp) / 1000);
  // var interval = seconds / 31536000;
  // if (interval > 1) {
  //   return Math.floor(interval) + " years";
  // }
  // interval = seconds / 2592000;
  // if (interval > 1) {
  //   return Math.floor(interval) + " months";
  // }
  // interval = seconds / 86400;
  // if (interval > 1) {
  //   return Math.floor(interval) + " days";
  // }
  // interval = seconds / 3600;
  // if (interval > 1) {
  //   return Math.floor(interval) + " hours";
  // }
  // interval = seconds / 60;
  // if (interval > 1) {
  //   return Math.floor(interval) + " minutes";
  // }
  // return Math.floor(seconds) + " seconds";
  return timeSinceString;
};
