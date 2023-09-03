import { UseFormReturn } from "react-hook-form";

type TValues = {
  title: string;
  text: string;
}

type TUserForm = {
  title: string;
  onSubmit: (data: any) => void;
  methods: UseFormReturn;
  isOpen: boolean;
  onClose: () => void;
  setValue: (data: { [x: string]: any }) => void;
  values: TValues;
  isAuthor: boolean;
}

type UserComment = {
  id: number;
  user_id: number;
  text: string;
  user_name: string;
}

type Article = {
  id: number;
  title: string;
  text: string;
  authorId: number;
  authorName: string;
}

type TForm = {
  artId: number;
  isAuthor: boolean;
  isOpen: boolean;
  onClose: () => void;
  addItem: (data: any) => void;
}

export type {
  TValues,
  TUserForm,
  TForm,
};
