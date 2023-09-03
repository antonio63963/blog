import { SxProps } from "@mui/material";

const classes: { [key: string]: SxProps } = {
  root: { height: '100vh', display: 'flex', flexDirection: 'column' },
  header: { width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 },
  userNameWrapper: { display: 'flex', alignItems: 'center', justifyContent: 'flex-end' },
  headerUserName: { color: '#E0E0E0', mr: 6, ml: 2 },

  titleRow: { width: '100%', display: 'flex', alignItems: 'center', mb: 1 },
  title: { color: '#BDBDBD', ml: 1 },
  paper: { display: 'flex', flexDirection: 'column', background: '#37474F', pt: 2, pb: 2 },
  create: { alignSelf: 'flex-end' },
};

export default classes;
