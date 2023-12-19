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
  // const timeSinceString: string = time_stamp.toISOString();
  if (!(time_stamp instanceof Date)) {
    // Handle the case where time_stamp is not a Date object
    return 'Invalid Date';
  }

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

export function hex2a(hexx: string) {
  var hex = hexx.toString(); //force conversion
  var str = '';
  for (var i = 0; i < hex.length; i += 2)
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  console.log(str);
  return str;
}

export function hextoASCII(ascii: string) {
  let string = '';
  for (let i = 0; i < ascii.length; i += 2) {
    const merge = parseInt(ascii[i] + ascii[i + 1], 16);
    string = string + String.fromCharCode(merge);
  }
  return string;
}
