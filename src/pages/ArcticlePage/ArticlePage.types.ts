type UserComment = {
  id: number;
  user_id: number;
  text: string;
  user_name: string;
};

type Article = {
  id: number;
  title: string;
  text: string;
  authorId: number;
  authorName: string;
}

type TPage = {
  article?: Article;
  userName: string;
  comments: UserComment[];
  onLogout: () => void;
  openForm: () => void;
  isAuthor: boolean;
}

export type {
  UserComment,
  TPage,
};
