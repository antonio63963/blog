import { FC } from 'react';

import { Avatar, Box, Button, Container, Typography } from "@mui/material/";

import classes from './AllArticles.styles';
import { TArticles } from './AllArticles.types';
import MasonryContainer from '../../containers/MasonryContainer/MasonryContainer';

const AllArticlesLayout: FC<TArticles> = ({ userName, onLogout, articlesList, goToArticle, isAuthor, onOpenForm }) => {
  return (
    <Container sx={classes.root}>
      <Container fixed sx={classes.header}>
        <Typography id="modal-modal-title" variant="h6" component="h2" color='#E0E0E0'>
          All Posts
        </Typography>
        <Box className="user-name-warapper" sx={classes.userNameWrapper}>
          <Avatar sx={{ bgcolor: '#26C6DA' }}>{userName?.slice(0, 2) ?? 'XXX'}</Avatar>
          <Typography className="user-name" sx={classes.headerUserName}>{userName ?? 'XXX'}</Typography>
          <Button onClick={onLogout}>Log Out</Button>
        </Box>
      </Container>

      <MasonryContainer articlesList={articlesList} goToArticle={goToArticle} />

      {isAuthor && <Button
        onClick={onOpenForm}
        sx={classes.create}
        className="CreateArticle">Create an Article
      </Button>}

    </Container>
  )
};

export default AllArticlesLayout;
