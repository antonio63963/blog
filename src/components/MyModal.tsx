import { Box, Button, Card, Modal, SxProps, Typography } from '@mui/material';
import { FC } from 'react';

type TAlert = {
  isOpen: boolean;
  handleClose: () => void;
  title: string;
  message: string;
}

const classes: { [key: string]: SxProps } = {
  root: { display: 'flex', alignItems: 'center', justifyContent: 'center',},
  body: { display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', background: '#FFF', maxWidth: 400, p: 4, pb: 2},
  card: { display: 'flex', flexDirection: 'column', width: '100%', minWidth: 320, p: 4, height: '100%' },
  close: {
    mt: 2,
    alignSelf: 'flex-end', pt: 1, pb: 1, pl: 2, pr: 2, '&:hover': {
      background: '#80DEEA',
      color: '#fff',
    }
  },
}

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
