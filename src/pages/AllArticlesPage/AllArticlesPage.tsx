import { FC, useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import storage from '../../data/storage';
import routes from "../../routes";
import AppForm from "../../containers/AppFormContainer/AppForm";
import Database from "../../data/database";
import { Article } from "../../context/AppContext/AppContext.type";
import AppContext from "../../context/AppContext";
import AllArticlesLayout from "./AllArticlesLayout";

const AllArticlesPage
  : FC = () => {
    const { articlesList, setArticlesList } = useContext(AppContext);
    const [isShownForm, setIsShownForm] = useState<boolean>(false);

    const { isAuthor, name } = storage.getUserInfo();
    const navigator = useNavigate();


    const getArticlesList = useCallback(async () => {
      const resp: Article[] | null = await Database.getArticlesList();
      if (resp) {
        setArticlesList(resp);
      }
    }, [setArticlesList]);

    const addArticle = (data: Article): Article[] => [data, ...articlesList];

    useEffect(() => {
      if (!name) {
        navigator(routes.AUTH_SIGNIN);
      }
    }, [name, navigator]);

    useEffect(() => {
      getArticlesList();
    }, [getArticlesList, name, navigator]);

    const onLogout = useCallback(() => {
      storage.clearStorage();
      navigator(routes.AUTH_SIGNIN);
    }, [navigator]);

    const goToArticle = useCallback((artId: number) => {
      navigator(`/post/${artId}`, { state: { artId } });
    }, [navigator]);

    return <>
      {/* Form new article */}
      <AppForm
        isAuthor={isAuthor}
        isOpen={isShownForm}
        onClose={() => setIsShownForm(false)}
        artId={0}
        addItem={(data: Article) => setArticlesList(addArticle(data))}
      />
      <AllArticlesLayout
        articlesList={articlesList}
        isAuthor={isAuthor}
        onLogout={onLogout}
        onOpenForm={() => setIsShownForm(true)}
        goToArticle={goToArticle}
        userName={name}
      />
    </>
  };

export default AllArticlesPage;