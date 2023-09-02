import { FC, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Masonry } from "@mui/lab";
import { Avatar, Box, Button, Container, Paper, SxProps, Typography } from "@mui/material/";


import storage from '../../data/storage';
import AuthContext from "../../context/AuthContext";
import routes from "../../routes";
import MyModal from "../../components/MyModal";
import AppForm from "../../containers/AppForm/AppForm";

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

const articles = [
  {
    id: '1',
    authorId: '1',
    name: 'Frank',
    title: 'Supabase',
    text: 'Masonry maintains a list of content blocks with a consistent width but different height. The contents are ordered by row. If a row is already filled with the specified number of columns, the next item starts another row, and it is added to the shortest column in order to optimize the use of space.',
    comments: [

    ]
  },
  {
    id: '2',
    authorId: '2',
    name: 'Dave',
    title: 'Supabase',
    text: `Image masonry This example demonstrates the use of Masonry for images. Masonry orders its children by row. If you'd like to order images by column, check out ImageList.`,
    comments: [

    ]
  },
  {
    id: '3',
    authorId: '1',
    name: 'Frank',
    title: 'Supabase',
    text: 'Masonry maintains a list of content blocks with a consistent width but different height. The contents are ordered by row. If a row is already filled with the specified number of columns, the next item starts another row, and it is added to the shortest column in order to optimize the use of space.',
    comments: [

    ]
  },
  {
    id: '4',
    authorId: '3',
    name: 'Ann',
    title: 'Supabase',
    text: 'Masonry lays out contents of varying dimensions as blocks of the same width and different height with configurable gaps.',
    comments: [

    ]
  },
  {
    id: '5',
    authorId: '2',
    name: 'Dave',
    title: 'Supabase',
    text: 'Masonry maintains a list of content blocks with a consistent width but different height. The contents are ordered by row. If a row is already filled with the specified number of columns, the next item starts another row, and it is added to the shortest column in order to optimize the use of space.',
    comments: [

    ]
  },
  {
    id: '6',
    authorId: '1',
    name: 'Frank',
    title: 'Supabase',
    text: 'Masonry maintains a list of content blocks with a consistent width but different height. The contents are ordered by row. If a row is already filled with the specified number of columns, the next item starts another row, and it is added to the shortest column in order to optimize the use of space.',
    comments: [

    ]
  },
];

function getRandomHeight() {
  const heights = [
    150, 175, 200, 230, 250
  ]
  return heights[Math.floor(Math.random() * heights.length)];
}
const AllPostsPage: FC = () => {
  const { isAuthor, name } = storage.getUserInfo();
  const navigator = useNavigate();
  const [isShownForm, setIsShownForm] = useState<boolean>(false);
  // const user: { [x: string]: string } = storage.getUserInfo();

  useEffect(() => {
    if(!name) {
      navigator(routes.AUTH_SIGNIN);
    }
  }, [])
  console.log(name, isAuthor);

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
        {articles.map((art, index) => (
          <Paper key={index} sx={{ ...classes.paper, height: getRandomHeight() }}>
            <Container sx={classes.titleRow}>
              <Avatar sx={{ bgcolor: '#26C6DA' }}>{art.name.slice(0, 2)}</Avatar>
              <Typography sx={classes.title} id="modal-modal-title" variant="h6" component="h2" color={'#eee'}>
                {art.name}
              </Typography>
            </Container>
            <Box component="div" textOverflow='ellepsis' overflow="hidden" sx={{ height: '100%', pl: 1, pr: 1, color: '#E0E0E0' }}>
              {art.text}
            </Box>
            <Button className="showButton-paper" sx={{ alignSelf: 'flex-end' }}>Show</Button>
          </Paper>
        ))}
      </Masonry>
      <Button onClick={() => setIsShownForm(true)} sx={classes.create} className="CreateArticle">Create an Article</Button>
    </Container>
  </>
};

export default AllPostsPage;