import type { createBrowserHistory } from 'history';

type AppProps = {
  history: ReturnType<typeof createBrowserHistory>
};

// type Token = {
//   accessToken: string;
// };

type UserInfo = {
  id: string;
  name: string;
  email: string;
};

export type { AppProps, UserInfo, };
