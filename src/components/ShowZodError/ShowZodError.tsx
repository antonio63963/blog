import { Typography } from '@mui/material';
import { FC } from 'react';

const ShowZodError: FC<{ errMessage: string }> = ({ errMessage }) => {
  return <Typography sx={{ color: '#EF5350', fontSize: 12 }}>{errMessage}</Typography>
};

export default ShowZodError;