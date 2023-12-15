import { Message, User } from '@/db/types';

export interface CommentData {
  card_id: string;
  user_id: string;
  avatar: string;
  username: string;
  time_stamp: Date;
  contents: string;
}

export interface CardData {
  visibility: string;
  suspended: boolean;
  comments: CommentData[];
  card_id: string;
  user_id: string;
  avatar: string;
  username: string;
  institute: string;
  time_stamp: Date;
  location: string;
  want_to_learn: string;
  good_at: string;
  contents: string;
  likes: number;
}

export interface Topic {
  topic_name: string;
  labels: string[];
}

export interface Conversation {
  lastMessage: Message;
  partner: User;
}
