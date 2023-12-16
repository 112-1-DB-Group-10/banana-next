export interface CommentData {
  card_id: string;
  user_id: string;
  avatar: string;
  username: string;
  time_stamp: Date;
  contents: string;
}

export interface CardData {
  card_id: string;
  user_id: string;
  username: string;
  avatar: string;
  contents: string;
  locations: string;
  institute: string;
  created_time: Date;
  updated_time: Date;
  visibility: string;
  suspended: boolean;
  deleted: boolean;
  want_to_learn: string;
  good_at: string;
  likes: number;
  comments: CommentData[];
}

export interface Topic {
  topic_name: string;
  labels: string[];
}

export interface Conversation {
  avatar: string;
  username: string;
  time_stamp: Date;
  contents: string;
  user_id: string;
}

export interface UserProfile {
  username: string;
  sex: string;
  age: number;
  email: string;
  role: string;
  suspended: boolean;
  user_id: string;
  avatar: string;
  institute: string;
  posted_card: CardData[];
  engaged_card: CardData[];
}
