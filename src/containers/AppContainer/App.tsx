import React, { FC, useCallback, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import routes from "../../routes";

import storage from '../../data/storage';


import { AppProps, Tokens, UserInfo } from "./App.type";

import { AuthPage, AllPostsPage, NotFoundPage } from "../../pages";


const App: FC<AppProps> = function App({history}) {

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [{ isModal, title: modalTitle, message: modalMessage }, setModal] =
    useState({ isModal: false, title: "", message: "" });
  const [isAuthenticated, setIsUserAuthenticated] = useState(
    !!storage.getTokens()
  );
  const [avatar, setAvatar] = useState<string>("");
  const [isAvatar, setIsAvatar] = useState<boolean>(true);

  const setIsAuthenticated = useCallback(
    (isAuthenticated: boolean, tokens?: Tokens) => {
      if (tokens) {
        // axiosService.setAuthorizationHeader(tokens);
        // storage.saveTokens(tokens);
      } else {
        // axiosService.setAuthorizationHeader();
        // storage.destroyTokens();
      }

      // setIsUserAuthenticated(isAuthenticated);
    },
    []
  );

  useEffect(() => {
    if (!isAuthenticated) {
      history.push(routes.AUTH_SIGNIN);
    }
  }, [isAuthenticated]);

  return (
    <>
      <Routes>
        <Route path={routes.AUTH_SIGNIN} element={<AuthPage />} />
        <Route path={routes.POSTS} element={<AllPostsPage />} />
        <Route path={routes.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
