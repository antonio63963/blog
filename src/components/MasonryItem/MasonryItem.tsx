import { FC } from 'react';
import { Avatar, Box, Button, Container, Paper, Typography } from "@mui/material/";

import { TMasonryItem } from './MasonryItem.types';
import classes from './MasonryItem.styles';

const MasonryItem: FC<TMasonryItem> = ({
  key,
  artId,
  height,
  title,
  text,
  authorName,
  goToArticle
}) => {
  return (
    <Paper key={key} sx={{ ...classes.paper, height: height }}>
      <Container sx={classes.titleRow}>
        <Avatar sx={{ bgcolor: '#26C6DA' }}>{authorName.slice(0, 2)}</Avatar>
        <Typography sx={classes.title} id="modal-modal-title" variant="h6" component="h2" color={'#eee'}>
          {authorName}
        </Typography>
      </Container>
      <Box component="div" textOverflow='ellepsis' overflow='hidden' sx={{flexShrink: 2, pl: 1, pr: 1, color: '#E0E0E0' }}>
        <Typography>{text}</Typography>
      </Box>
      <Button
        className="showButton-paper"
        onClick={() => goToArticle(artId)}
        sx={{ alignSelf: 'flex-end' }}>
        Show
      </Button>
    </Paper>
  )
};

export default MasonryItem;
