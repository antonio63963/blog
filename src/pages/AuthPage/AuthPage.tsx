import React, { FC, useCallback, useState } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import AuthPageLayout from './AuthPageLayout';
import Database from '../../data/database';
import { Alert, Box, Card, Dialog, Modal, Typography } from '@mui/material';

const validationSchema = z.object({
  name: z.string(),
  email: z.string().email().transform((val) => val.trim()),
  password: z.string(),
});

type FormData = {
  name: string;
  email: string;
  password: string;
  isAuthor: boolean;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const AuthPage: FC = () => {
  const [isSignin, setIsSignin] = useState<boolean>(true);

  const onSignIn = useCallback(async (data: FormData) => {
    try {
      const createdUser = await Database.createUser(data.email, data.password, data.name, data.isAuthor);
    } catch (err: any) {
      if(err.response.status === 401) {
     
      }
      else if(err.response.status === 0) {
   
      }
      else {
   
      }; 
    }
  }, [])
  
  const onSignUp = useCallback(async (data: FormData) => {
    try {
      const createdUser = await Database.createUser(data.email, data.password, data.name, data.isAuthor);
    } catch (err: any) {
      if(err.response.status === 401) {
     
      }
      else if(err.response.status === 0) {
   
      }
      else {
   
      }; 
    }
  }, [])

  return (
    <AuthPageLayout />
  )
};

export default AuthPage;
