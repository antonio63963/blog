import { ReactNode } from "react";

type TPage = {
  name: string;
  onLogOut: () => void;
  children: ReactNode;
};

export type {
  TPage,
};
