import { FC } from 'react';
import { Masonry } from '@mui/lab';

import { TMasonry } from './Masonry.types';
import MasonryItem from '../../components/MasonryItem/MasonryItem';

function getRandomHeight() {
  const heights = [
    150, 175, 200, 230, 250
  ]
  return heights[Math.floor(Math.random() * heights.length)];
};

const MasonryContainer: FC<TMasonry> = ({ articlesList, goToArticle }) => {
  return (
    <Masonry columns={3} spacing={2}>
      {articlesList.map((art, index) => (
        <MasonryItem
          key={index}
          artId={art.id}
          height={getRandomHeight()}
          title={art.title}
          text={art.text}
          authorName={art.authorName}
          goToArticle={goToArticle} />
      ))}
    </Masonry>
  );
};

export default MasonryContainer;
