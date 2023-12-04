export type Story = {
  id: string;
  img: string;
  text: string;
};

export type Following = {
  name: string;
  img: string;
  id: string;
  lastMessage: string;
  time: string;
  stories: Story[];
};

export const followings: Following[] = [
  {
    id: '13b5c1e0-4b7a-11ec-8d3d-0242ac130003',
    name: 'Sofia Davis',
    img: 'https://github.com/shadcn.png',
    lastMessage:
      'Hello, world! 👋 This is a long message that will be truncated if it is longer than two lines.',
    time: '2:30 PM',
    stories: [
      {
        id: 'df553d94-df68-11eb-ba80-0242ac130004',
        img: 'https://i.pinimg.com/originals/31/4c/d7/314cd72c7839a88b0e7d58743508b558.jpg',
        text: 'What a beautiful day!',
      },
      {
        id: 'df553d94-df68-11eb-ba80-0242ac130005',
        img: 'https://i.pinimg.com/originals/31/4c/d7/314cd72c7839a88b0e7d58743508b558.jpg',
        text: 'What a next beautiful day!',
      },
      {
        id: 'df553d94-df68-11eb-ba80-0242ac130006',
        img: 'https://i.pinimg.com/originals/31/4c/d7/314cd72c7839a88b0e7d58743508b558.jpg',
        text: 'What a next next beautiful day!',
      },
    ],
  },
  {
    id: '13b5c1e0-4b7a-11ec-8d3d-0242ac130004',
    name: 'James Ku',
    img: 'https://scontent-tpe1-1.xx.fbcdn.net/v/t39.30808-1/391694531_7536704289679385_2405013128163451858_n.jpg?stp=dst-jpg_p100x100&_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=RsQGesDnwmwAX_Q6wV9&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent-tpe1-1.xx&oh=00_AfCRdajOyzuAc9e7z6yXjDaVzuqoXGkQNVzE6bVo_y1pow&oe=655F5DCE',
    lastMessage: 'Please check your email. 📧',
    time: '2:30 PM',
    stories: [
      {
        id: 'df553d94-df68-11eb-ba80-0242ac130007',
        img: 'https://i.pinimg.com/originals/31/4c/d7/314cd72c7839a88b0e7d58743508b558.jpg',
        text: "James Ku's story",
      },
    ],
  },
  {
    id: '13b5c1e0-4b7a-11ec-8d3d-0242ac130005',
    name: 'Max Chuang',
    img: 'https://scontent.xx.fbcdn.net/v/t39.30808-1/223357639_3860319094078986_3287036148590821737_n.jpg?stp=dst-jpg_p100x100&_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=M2KP8SyZo0QAX-HLsbx&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=00_AfBkijjGLoNQBhJZCUFlejLemRQlK6atj7ZeKQ7gbcXyGQ&oe=656089B5',
    lastMessage: '',
    time: '2:30 PM',
    stories: [],
  },
  {
    id: '13b5c1e0-4b7a-11ec-8d3d-0242ac130006',
    name: 'Mu-Te Joshua Lau',
    img: 'https://scontent.xx.fbcdn.net/v/t39.30808-1/279128936_2295112837294318_5235837985711513580_n.jpg?stp=dst-jpg_p100x100&_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=1IW6vmLJDtgAX-QuvVb&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=00_AfCA0xJ7-rdC8-sSWGF5d-HJlXXV2nJiLdVe0g3nSENrEQ&oe=655FA297',
    lastMessage: '',
    time: '2:30 PM',
    stories: [
      {
        id: 'df553d94-df68-11eb-ba80-0242ac130008',
        img: 'https://i.pinimg.com/originals/31/4c/d7/314cd72c7839a88b0e7d58743508b558.jpg',
        text: "Mu-Te Joshua Lau's story",
      },
    ],
  },
];
