import { SxProps } from "@mui/material";

const classes: { [key: string]: SxProps } = {
  root: { height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  titleRow: { width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 0 },
  switchMode: { background: 'none', p: 0, fontSize: 12, '&:hover': { background: 'none', color: '#80DEEA' } },
  input: { mt: 2, mb: 2 },
  card: { display: 'flex', flexDirection: 'column', width: '100%', minWidth: 320, p: 4, height: '100%' },
  submit: {
    alignSelf: 'flex-end', pt: 1, pb: 1, pl: 2, pr: 2, '&:hover': {
      background: '#80DEEA',
      color: '#fff',
    }
  },
};

export default classes;
