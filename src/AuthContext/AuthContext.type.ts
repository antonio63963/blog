type TAuthContext = {
  isAuthenticated: boolean;
  isAuthor?: boolean;
  setIsAuthenticated: (isAuthenticated: boolean, isAuthor: boolean, token?: string) => void;
}

export type {
  TAuthContext,
};
