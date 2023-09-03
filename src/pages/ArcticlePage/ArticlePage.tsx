import { FC, useCallback, useContext, useEffect, useState } from 'react';

import AppForm from '../../containers/AppFormContainer/AppForm';
import { Article } from '../../context/AppContext/AppContext.type';
import Database from '../../data/database';
import { useLocation, useNavigate } from 'react-router-dom';
import storage from '../../data/storage';
import authContext from '../../context/AuthContext';
import routes from '../../routes';
import { UserComment } from './ArticlePage.types';

import ArticlesLayout from './ArticlesLayout';

const ArticlePage: FC = () => {
  const navigator = useNavigate();
  const location: any = useLocation();
  const { setIsAuthenticated } = useContext(authContext);
  const { name, id, isAuthor } = storage.getUserInfo();
  const [article, setAtricle] = useState<Article>();
  const [comments, setComments] = useState<UserComment[]>([]);
  const [isShownForm, setIsShownForm] = useState<boolean>(false);

  const getArticle = useCallback(async () => {
    const data = await Database.getArticleById(location?.state.artId);
    const { comments, ...article } = data[0];
    setAtricle(article);
    setComments(comments);
  }, []);

  const onLogout = useCallback(() => {
    storage.clearStorage();
    setIsAuthenticated(false, false);
    navigator(routes.AUTH_SIGNIN);
  }, []);

  useEffect(() => {
    getArticle();
  }, []);

  return (
    <>
      {/* Form leave comment */}
      <AppForm
        isAuthor={isAuthor}
        isOpen={isShownForm}
        onClose={() => setIsShownForm(false)}
        artId={location?.state.artId}
        addItem={(data: UserComment) => setComments((currenState) => [data, ...currenState])}
      />
      {/* Content */}
      <ArticlesLayout
        article={article}
        userName={name}
        comments={comments}
        onLogout={onLogout}
        openForm={() => setIsShownForm(true)}
        isAuthor={isAuthor}
      />
    </>
  );
};

export default ArticlePage;
