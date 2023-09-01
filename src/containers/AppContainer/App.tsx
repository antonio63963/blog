import React, { FC, useCallback, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import routes from "../../routes";

import storage from '../../data/storage';


import { AppProps, UserInfo } from "./App.type";

import { AuthPage, AllPostsPage, NotFoundPage } from "../../pages";
import AuthContext from "../../context/AuthContext";
import AppContext from "../../context/AppContext";
import { Modal } from "@mui/material";
import MyModal from "../../components/MyModal";


const App: FC<AppProps> = function App({ history }) {
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
      <AppContext.Provider
        value={{
          isModal,
          setModal,
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
          <Route path={routes.NOT_FOUND} element={<NotFoundPage />} />
        </Routes>
      </AppContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
