import { UseFormReturn } from "react-hook-form";

type TValues = {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
  isAuthor: boolean;
};

type AuthT = {
  onSubmit: (data: any) => void;
  switchIsSignIn: () => void;
  isSignIn: boolean;
  values: TValues
  setValue: (data: { [x: string]: any }) => void;
  methods: UseFormReturn;
};

export type {
  TValues,
  AuthT,
};
