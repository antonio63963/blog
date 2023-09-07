import { FC, ReactNode, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import storage from '../../data/storage';
import routes from '../../routes';
import authContext from '../../context/AuthContext/AuthContext';

import PageContentLayout from './PageContentLayout';

const PageContentContainer: FC<{ children: ReactNode }> = ({ children }) => {
  const { setIsAuthenticated } = useContext(authContext);
  const { name } = storage.getUserInfo();
  const navigator = useNavigate();

  const onLogout = useCallback(() => {
    storage.clearStorage();
    setIsAuthenticated(false, false);
    navigator(routes.AUTH_SIGNIN);
  }, [navigator, setIsAuthenticated]);

  return <PageContentLayout
    name={name ?? 'XXX'}
    onLogOut={() => onLogout}
  >
    {children}
  </PageContentLayout>
};


export default PageContentContainer;
