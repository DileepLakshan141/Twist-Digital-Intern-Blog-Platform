export type user = {
  _id: string;
  username: string;
  email: string;
  profile_pic: string;
  createdAt: Date;
};

export type user_update = {
  username: string;
  email: string;
  profile_pic: string;
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

export type comment = {
  _id: string;
  comment: string;
  user_id: {
    username: string;
    profile_pic: string;
    createdAt: Date;
  };
  blog_id: {
    title: string;
    cover_image: string;
  };
  createdAt: Date;
};

export type liked_blogs = {
  _id: string;
  createdAt: Date;
  blog_id: {
    title: string;
    _id: string;
  };
};

export type CloudinaryResult = {
  secure_url: string;
};
