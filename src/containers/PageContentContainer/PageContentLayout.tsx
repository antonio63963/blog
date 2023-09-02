import {FC} from 'react';
import { Avatar, Box, Button, Container, SxProps, Typography } from '@mui/material';

import { TPage } from './PageContent.types';

const classes: { [key: string]: SxProps } = {
  root: { height: '100vh', display: 'flex', flexDirection: 'column' },
  header: { width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 },
  headerNameWrapper: { display: 'flex', },
  headerUserName: { color: '#E0E0E0' },
}

const PageContentLayout: FC<TPage> = ({name, onLogOut, children}) => {
  return (
    <Container sx={classes.root}>
      <Container fixed sx={classes.header}>
        <Typography id="modal-modal-title" variant="h6" component="h2" color='#E0E0E0'>
          All Posts
        </Typography>
        <Box className="user-name-warapper" sx={classes.headerNameWrapper}>
          <Avatar sx={{ bgcolor: '#26C6DA' }}>{name.slice(0, 2)}</Avatar>
          <Typography className="user-name" sx={classes.headerUserName}>{name}</Typography>
          <Button onClick={onLogOut}>Log Out</Button>
        </Box>
      </Container>

      
    </Container>
  )
};

export default PageContentLayout;
