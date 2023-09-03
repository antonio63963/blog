type Article = {
  id: number;
  title: string;
  text: string;
  authorId: number;
  authorName: string;
}

type TMasonry = {
  articlesList: Article[];
  goToArticle: (artId: number) => void;
};

export type {
  Article,
  TMasonry,
};
