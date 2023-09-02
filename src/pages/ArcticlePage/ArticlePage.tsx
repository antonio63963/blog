import { FC, useCallback, useContext, useEffect, useState } from 'react';

import { PageContentContainer } from '../../containers';
import { Article } from '../../context/AppContext/AppContext.type';
import Database from '../../data/database';
import { Avatar, Box, Button, Container, Divider, SxProps, TextField, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import storage from '../../data/storage';
import authContext from '../../context/AuthContext';
import routes from '../../routes';

const classes: { [key: string]: SxProps } = {
  root: { height: '100vh', display: 'flex', flexDirection: 'column' },
  header: { width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 },
  userNameWrapper: { display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'flex-end' },
  headerUserName: { color: '#E0E0E0', mr: 6, ml: 2 },

  titleRow: { width: '100%', display: 'flex', alignItems: 'center', mb: 1 },
  art: { display: 'flex', flexDirection: 'column', mt: 6, mb: 2 },
  title: { color: '#BDBDBD', ml: 1 },
  paper: { display: 'flex', flexDirection: 'column', background: '#37474F', pt: 2, pb: 2 },
  create: { alignSelf: 'flex-end' },

  commentBox: { width: '100%', mt: 4 },
  commentBoxTitle: { mb: 2, color: '#eee' },
  commentBoxInput: { mb: 2, color: '#eee', width: '100%' },
}

const ArticlePage: FC = () => {
  const navigator = useNavigate();
  const location: any = useLocation();
  const { setIsAuthenticated } = useContext(authContext);
  const { name, id, isAuthor } = storage.getUserInfo();
  const [article, setAtricle] = useState<Article>();
  const [isShownForm, setIsShownForm] = useState<boolean>(false);

  const getArticle = useCallback(async (id: string) => {
    const data = await Database.getArticleById(location?.state.artId);
    setAtricle(data[0]);
  }, []);

  const onLogout = useCallback(() => {
    storage.clearStorage();
    setIsAuthenticated(false, false);
    navigator(routes.AUTH_SIGNIN);
  }, []);

  useEffect(() => {
    getArticle(id);
  }, []);

  return (
    <>
      <Container sx={classes.root}>
        <Container fixed sx={classes.header}>
          <Container sx={classes.titleRow}>
            <Avatar sx={{ bgcolor: '#26C6DA' }}>{article?.authorName.slice(0, 2)}</Avatar>
            <Typography sx={classes.title} id="modal-modal-title" variant="h6" component="h2" color={'#eee'}>
              {article?.authorName}
            </Typography>
          </Container>
          <Box className="user-name-warapper" sx={classes.userNameWrapper}>
            <Avatar sx={{ bgcolor: '#26C6DA' }}>{name.slice(0, 2)}</Avatar>
            <Typography className="user-name" sx={classes.headerUserName}>{name}</Typography>
            <Button onClick={onLogout}>Log Out</Button>
          </Box>
        </Container>
      
        <Container sx={classes.art}>
          <Typography sx={classes.title} id="title-art" variant="h6" component="h2" color={'#eee'}>
            {article?.title}
          </Typography>
          <Typography sx={classes.title} id="text-art" component="p" color={'#eee'}>
            {article?.text}
          </Typography>
        </Container>
      
        {!isAuthor && <Button
          onClick={() => setIsShownForm(true)}
          sx={classes.create}
          className="CreateArticle">Leave Comment
        </Button>}
      
        {/* <Container className='comment-box' sx={classes.commentBox}>
          <Typography sx={classes.commentBoxTitle}>
            Leave your comment
          </Typography>
          <TextField
            sx={classes.commentBoxInput}
            id="filled-multiline-flexible"
            label="Multiline"
            multiline
            maxRows={4}
            variant="filled"
          />
        </Container> */}
      </Container>
    </>
  );
};

export default ArticlePage;
