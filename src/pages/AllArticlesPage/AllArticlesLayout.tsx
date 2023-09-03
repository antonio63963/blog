import { FC } from 'react';

import { Masonry } from "@mui/lab";
import { Avatar, Box, Button, Container, Paper, SxProps, Typography } from "@mui/material/";

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

      {/* <Masonry columns={3} spacing={2}>
        {articlesList.map((art, index) => (
          <Paper key={index} sx={{ ...classes.paper, height: getRandomHeight() }}>
            <Container sx={classes.titleRow}>
              <Avatar sx={{ bgcolor: '#26C6DA' }}>{art.authorName.slice(0, 2)}</Avatar>
              <Typography sx={classes.title} id="modal-modal-title" variant="h6" component="h2" color={'#eee'}>
                {art.authorName}
              </Typography>
            </Container>
            <Box component="div" textOverflow='ellepsis' overflow="hidden" sx={{ height: '100%', pl: 1, pr: 1, color: '#E0E0E0' }}>
              {art.text}
            </Box>
            <Button
              className="showButton-paper"
              onClick={() => goToArticle(art.id)}
              sx={{ alignSelf: 'flex-end' }}>
              Show
            </Button>
          </Paper>
        ))}
      </Masonry> */}
      {isAuthor && <Button
        onClick={onOpenForm}
        sx={classes.create}
        className="CreateArticle">Create an Article
      </Button>}

    </Container>
  )
};

export default AllArticlesLayout;
