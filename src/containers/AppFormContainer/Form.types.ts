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
