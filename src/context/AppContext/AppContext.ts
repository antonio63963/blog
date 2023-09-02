import { createContext } from 'react';

import { TAppContext } from './AppContext.type';

const appContext = createContext<TAppContext>({
  isModal: false,
  setModal: () => { },
  articlesList: [],
  setArticlesList: () => {},
});

export default appContext;
