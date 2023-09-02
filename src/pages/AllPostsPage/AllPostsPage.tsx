import { FC, useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Masonry } from "@mui/lab";
import { Avatar, Box, Button, Container, Paper, SxProps, Typography } from "@mui/material/";


import storage from '../../data/storage';
import AuthContext from "../../context/AuthContext";
import routes from "../../routes";
import MyModal from "../../components/MyModal";
import AppForm from "../../containers/AppFormContainer/AppForm";
import Database from "../../data/database";
import { Article } from "../../context/AppContext/AppContext.type";

const classes: { [key: string]: SxProps } = {
  root: { height: '100vh', display: 'flex', flexDirection: 'column' },
  header: { width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 },
  headerNameWrapper: { display: 'flex', },
  headerUserName: { color: '#E0E0E0' },
  titleRow: { width: '100%', display: 'flex', alignItems: 'center', mb: 1 },
  title: { color: '#BDBDBD', ml: 1 },
  paper: { display: 'flex', flexDirection: 'column', background: '#37474F', pt: 2, pb: 2 },
  create: { alignSelf: 'flex-end' },
}

function getRandomHeight() {
  const heights = [
    150, 175, 200, 230, 250
  ]
  return heights[Math.floor(Math.random() * heights.length)];
}
const AllPostsPage: FC = () => {
  const [artList, setArtList] = useState<Article[]>([]);
  const [isShownForm, setIsShownForm] = useState<boolean>(false);

  const { isAuthor, name, id } = storage.getUserInfo();
  const navigator = useNavigate();


  const getArticlesList = useCallback(async () => {
    const resp: Article[] | null = await Database.getArticlesList();
    if (resp) {
      setArtList(resp);
    }
  }, [])

  useEffect(() => {
    if (!name) {
      navigator(routes.AUTH_SIGNIN);
    }
  }, [name, navigator]);

  useEffect(() => {
    getArticlesList();
  }, [name, navigator]);

  function onLogOut() {
    storage.clearStorage();
    navigator(routes.AUTH_SIGNIN);
  }

  return <>
    <AppForm
      isAuthor={isAuthor}
      isOpen={isShownForm}
      onClose={() => setIsShownForm(false)}
    />

    <Container sx={classes.root}>
      <Container fixed sx={classes.header}>
        <Typography id="modal-modal-title" variant="h6" component="h2" color='#E0E0E0'>
          All Posts
        </Typography>
        <Box className="user-name-warapper" sx={classes.headerNameWrapper}>
          <Avatar sx={{ bgcolor: '#26C6DA' }}>{name?.slice(0, 2) ?? 'XXX'}</Avatar>
          <Typography className="user-name" sx={classes.headerUserName}>{name ?? 'XXX'}</Typography>
          <Button onClick={onLogOut}>Log Out</Button>
        </Box>
      </Container>

      <Masonry columns={3} spacing={2}>
        {artList.map((art, index) => (
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
            <Button className="showButton-paper" onClick={() => navigator(`/post/${art.authorId}`, { state: { artId: art.id } })} sx={{ alignSelf: 'flex-end' }}>Show</Button>
          </Paper>
        ))}
      </Masonry>
      {isAuthor && <Button
        onClick={() => setIsShownForm(true)}
        sx={classes.create}
        className="CreateArticle">Create an Article
      </Button>}
      {/* <Button onClick={() => Database.getArticleById(id)} sx={classes.create} className="CreateArticle">test</Button> */}
    </Container>
  </>
};

export default AllPostsPage;