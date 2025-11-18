export type PostType = {
  _id: string;
  title: string;
  description: string;
  cloudinaryImageId: string;
  date: string;
  category: PostCategoryType[];
  isHome: boolean;
  updatedAt: string;
  createdAt: string;
  author: string;
};

export type HomePost = {
  title: string;
  description: string;
  cloudinaryImageId: string;
  date: string;
  category: PostCategoryType[];
};

export type PostTitle = {
  title: string;
};

export type CommentType = {
  _id: string;
  content: string;
  authorName: string;
  authorEmail: string;
  postId: string;
  parentCommentId: string | null;
  date: string;
  createdAt: string;
  updatedAt: string;
};

export type CategoryType = {
  _id: string;
  name: string;
  color: string;
};

export type PostCategoryType = {
  name: string;
};

export type InfoType = {
  _id: string;
  name: string;
  content: string;
};

export type OptionType = {
  label: string;
  value: string;
};

export type UserType = {
  _id: string;
  isim: string;
  email: string;
  password: string;
};

export type BlogMetadata = {
  title: string;
  description: string;
  keywords: string[];
  openGraph: {
    title: string;
    description: string;
    url: string;
    images: string;
    publishedTime: Date;
    type: string;
  };
  twitter: {
    card: string;
    title: string;
    images: string;
  };
};
