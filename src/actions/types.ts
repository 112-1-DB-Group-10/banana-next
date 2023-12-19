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
  location: string;
  institute: string;
  created_time: Date;
  updated_time: Date;
  visibility: 'public' | 'verified';
  suspended: boolean;
  deleted: boolean;
  want_to_learn: string[];
  good_at: string[];
  num_likes: number;
  num_comments: number;
}

export interface Topic {
  topic_name: string;
  labels: string[];
}

export interface Conversation {
  avatar: string;
  username: string;
  last_time_stamp: Date;
  contents: string;
  partner_id: string;
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
  institute: string | null;
}

export interface UserApplication {
  username: string;
  sex: string;
  age: number;
  email: string;
  role: string;
  suspended: boolean;
  user_id: string;
  avatar: string;
  institute: string | null;
  enrollYear: number,
  userEnglishName: string,
  document_url: string,
}
