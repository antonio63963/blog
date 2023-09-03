import { SxProps } from "@mui/material";

const classes: { [key: string]: SxProps } = {
  header: { width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 },
  userNameWrapper: { display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'flex-end' },
  headerUserName: { color: '#E0E0E0', mr: 6, ml: 2 },

  titleRow: { width: '100%', display: 'flex', alignItems: 'center', mb: 1, mt: 3 },
  art: { display: 'flex', flexDirection: 'column', mt: 6, mb: 2 },
  title: { color: '#BDBDBD', ml: 1 },
  paper: { display: 'flex', flexDirection: 'column', background: '#37474F', pt: 2, pb: 2 },
  create: { alignSelf: 'flex-end', mt: 4 },

  commentsBox: { mt: 6 },
  commentBoxTitle: { mb: 2, ml: 2, color: '#BDBDBD' },
  comment: { color: '#BDBDBD' },
};

export default classes;
