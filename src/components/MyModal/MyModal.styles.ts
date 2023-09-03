import { SxProps } from "@mui/material";

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
};

export default classes;
