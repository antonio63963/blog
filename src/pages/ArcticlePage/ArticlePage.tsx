import { FC, useCallback, useContext, useEffect, useState } from 'react';

import AppForm from '../../containers/AppFormContainer/AppForm';
import { Article } from '../../context/AppContext/AppContext.type';
import Database from '../../data/database';
import { Avatar, Box, Button, Card, Container, List, ListItem, ListItemAvatar, ListItemText, SxProps, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import storage from '../../data/storage';
import authContext from '../../context/AuthContext';
import routes from '../../routes';
import { UserComment } from './Article.types';

import classes from './Article.styles';

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
        addComment={(data: UserComment) => setComments((currenState) => [data, ...currenState])}
      />
      {/* Content */}

      <Container id="header-article" fixed sx={classes.header} disableGutters={true}>
        <Box className="user-name-warapper" sx={classes.userNameWrapper}>
          <Avatar sx={{ bgcolor: '#26C6DA' }}>{name.slice(0, 2)}</Avatar>
          <Typography className="user-name" sx={classes.headerUserName}>{name}</Typography>
          <Button onClick={onLogout}>Log Out</Button>
        </Box>
      </Container>

      <Container sx={classes.titleRow}>
        <Avatar sx={{ bgcolor: '#26C6DA' }}>{article?.authorName.slice(0, 2)}</Avatar>
        <Typography sx={classes.title} id="modal-modal-title" variant="h6" component="h2" color={'#eee'}>
          {article?.authorName}
        </Typography>
      </Container>

      <Container sx={classes.art}>
        <Typography sx={{ ...classes.title, mb: 3 }} id="title-art" variant="h4" component="h1" color={'#eee'}>
          {article?.title}
        </Typography>
        <Typography sx={classes.title} id="text-art" component="p" color={'#eee'}>
          {article?.text}
        </Typography>
        {!isAuthor && <Button
          onClick={() => setIsShownForm(true)}
          sx={classes.create}
          className="CreateArticle">Leave Comment
        </Button>}
      </Container>


      <Container>
        <Box className='comment-box' sx={classes.commentsBox}>
          <Typography sx={classes.commentBoxTitle}>
            Comments
          </Typography>
        </Box>
        <List>
          {comments.map((com, idx) => {
            return (
              <ListItem key={`${com.id}_${idx}`}>
                <ListItemAvatar>
                  <Avatar>
                    {com.user_name.slice(0, 2)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText>
                  <Typography sx={classes.comment}>
                  {com.text}
                  </Typography>
                </ListItemText>
              </ListItem>
            )
          })}
        </List>
      </Container>
    </>
  );
};

export default ArticlePage;
