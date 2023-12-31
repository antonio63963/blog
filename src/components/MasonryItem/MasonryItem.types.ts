type TMasonryItem = {
  artId: number;
  height: number;
  title: string;
  text: string;
  authorName: string; 
  goToArticle: (data: number) => void;
};

export type {
  TMasonryItem,
};
