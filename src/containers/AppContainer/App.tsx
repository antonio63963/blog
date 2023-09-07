import React, { FC, useCallback, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import routes from "../../routes";

import storage from '../../data/storage';


import { AppProps } from "./App.type";

import { AuthPage, AllPostsPage } from "../../pages";
import AuthContext from "../../context/AuthContext";
import AppContext from "../../context/AppContext";

import MyModal from "../../components/MyModal/MyModal";
import { Article } from "../../context/AppContext/AppContext.type";
import ArticlePage from "../../pages/ArcticlePage/ArticlePage";


const App: FC<AppProps> = function App({ history }) {
  const [{ isAuthenticated, isAuthor }, setUser] = useState({
    isAuthenticated: !!storage.getToken(),
    isAuthor: false,
  });

  const [{ isModal, title: modalTitle, message: modalMessage }, setModal] =
    useState({ isModal: false, title: "", message: "" });

  const [articlesList, setArticlesList] = useState<Article[]>([]);
  
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
    console.log(isAuthenticated)
    if (!isAuthenticated) {
      history.push(routes.AUTH_SIGNIN);
    } else {
      history.push(routes.POSTS);
    }
  }, [isAuthenticated, history]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isAuthor,
        setIsAuthenticated,
      }}
    >
      <AppContext.Provider
        value={{
          isModal,
          setModal,
          articlesList,
          setArticlesList
        }}
      >
        <MyModal
          title={modalTitle}
          message={modalMessage}
          isOpen={isModal}
          handleClose={() => setModal({ isModal: false, title: "", message: "" })}
        />
        <Routes>
          <Route path={routes.AUTH_SIGNIN} element={<AuthPage />} />
          <Route path={routes.POSTS} element={<AllPostsPage />} />
          <Route path={routes.POST_SHOW} element={<ArticlePage />} />
        </Routes>
      </AppContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
