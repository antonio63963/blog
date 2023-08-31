import type { createBrowserHistory } from 'history';

type AppProps = {
  history: ReturnType<typeof createBrowserHistory>
};

type Tokens = {
  accessToken: string;
};

type UserInfo = {
  id: string;
  name: string;
  email: string;
};

export type { AppProps, Tokens, UserInfo, };
