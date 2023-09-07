import { FC } from 'react';
import { Avatar, Box, Button, Container, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';

import classes from './Article.styles';
import { TPage } from './ArticlePage.types';

const ArticlesLayout: FC<TPage> = ({ article, comments, userName, onLogout, openForm, isAuthor }) => {
  return (
    <>
      <Container id="header-article" fixed sx={classes.header} disableGutters={true}>
        <Box className="user-name-warapper" sx={classes.userNameWrapper}>
          <Avatar sx={{ bgcolor: '#26C6DA' }}>{userName.slice(0, 2)}</Avatar>
          <Typography className="user-name" sx={classes.headerUserName}>{userName}</Typography>
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
          onClick={openForm}
          sx={classes.create}
          className="CreateArticle">Leave Comment
        </Button>}
      </Container>


      <Container>
        <Box className='comment-box' sx={classes.commentsBox}>
          <Typography sx={classes.commentBoxTitle}>
            Comments:
          </Typography>
        </Box>
        {comments.length === 0 && <Typography sx={{ color: "#eee" }}>No comments yet.</Typography>}
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

export default ArticlesLayout;
