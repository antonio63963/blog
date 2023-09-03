import { FC } from 'react';
import { Button, Card, Modal, SxProps, Typography } from '@mui/material';

import classes from './MyModal.styles';
import { TAlert } from './MyModar.types';



const Alert: FC<TAlert> = ({ isOpen, handleClose, title, message }) => {
  return (<Modal
    open={isOpen}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    sx={classes.root}
    >
    <Card sx={classes.body}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        {title}
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        {message}
      </Typography>
      <Button sx={classes.close} onClick={handleClose}>Close</Button>
    </Card>
  </Modal>)
};

export default Alert;
