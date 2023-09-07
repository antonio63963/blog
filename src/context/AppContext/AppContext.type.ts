
type Modal = {
  isModal: boolean;
  title: string;
  message: string;
}

type Article = {
  id: number;
  title: string;
  text: string;
  authorId: number;
  authorName: string;
}

type TAppContext = {
  isModal: boolean;
  setModal: (data: Modal) => void;
  articlesList: Article[];
  setArticlesList: (data: Article[]) => void;
};

export type {
  TAppContext,
  Article,
};
