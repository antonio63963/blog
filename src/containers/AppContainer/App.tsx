import React, { FC, useCallback, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import routes from "../../routes";

import storage from '../../data/storage';


import { AppProps, UserInfo } from "./App.type";

import { AuthPage, AllPostsPage, NotFoundPage } from "../../pages";
import AuthContext from "../../AuthContext";


const App: FC<AppProps> = function App({history}) {

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [{ isAuthenticated, isAuthor }, setUser] = useState({
    isAuthenticated: !!storage.getToken(),
    isAuthor: false,
  });
  const [{ isModal, title: modalTitle, message: modalMessage }, setModal] =
    useState({ isModal: false, title: "", message: "" });

  const setIsAuthenticated = useCallback(
    (isAuthenticated: boolean, isAuthor: boolean, token?: string) => {
      if (token) {
        storage.saveToken(token);
      } else {
        storage.destroyToken();
      }

      setUser({
        isAuthenticated,
        isAuthor,
      });
    },
    []
  );

  useEffect(() => {
    if (!isAuthenticated) {
      history.push(routes.AUTH_SIGNIN);
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
    value={{
      isAuthenticated,
      isAuthor,
      setIsAuthenticated,
    }}
  >
      <Routes>
        <Route path={routes.AUTH_SIGNIN} element={<AuthPage />} />
        <Route path={routes.POSTS} element={<AllPostsPage />} />
        <Route path={routes.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
      </AuthContext.Provider>
  );
};

export default App;
