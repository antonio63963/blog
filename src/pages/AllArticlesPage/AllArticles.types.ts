type Article = {
  id: number;
  title: string;
  text: string;
  authorId: number;
  authorName: string;
}

type TArticles = {
  userName: string;
  onLogout: () => void;
  articlesList: Article[];
  goToArticle: (artId: number) => void;
  isAuthor: boolean;
  onOpenForm: () => void;
};

export type {
  Article,
  TArticles,
};
