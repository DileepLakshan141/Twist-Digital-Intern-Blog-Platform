export type user = {
  _id: string;
  username: string;
  email: string;
  profile_pic: string;
  createdAt: Date;
};

export type blog = {
  _id: string;
  title: string;
  content: string;
  author: user;
  cover_image: string;
  likes: number;
  createdAt: Date;
};
