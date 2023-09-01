import type { createBrowserHistory } from 'history';

type AppProps = {
  history: ReturnType<typeof createBrowserHistory>
};

type UserInfo = {
  id: string;
  name: string;
  email: string;
};

export type { AppProps, UserInfo, };
