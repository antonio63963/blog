import React, { FC, useCallback, useState } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import AuthPageLayout from './AuthPageLayout';
import Database from '../../data/database';

import { UseFormReturn, useForm } from 'react-hook-form';

const validationSchemaSignUp = z.object({
  name: z.string().min(2, 'String must contain at list 2 characters'),
  email: z.string().email().transform((val) => val.trim()),
  password: z.string().min(6),
  repeatPassword: z.string().min(6),
  isAuthor: z.boolean()
}).superRefine(({ repeatPassword, password }, ctx) => {
  if (repeatPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match",
      path: ['repeatPassword']
    });
  }
});

const validationSchemaLogin = z.object({
  email: z.string().email().transform((val) => val.trim()),
  password: z.string().min(6)
});

const AuthPage: FC = () => {
  const [isSignin, setIsSignin] = useState<boolean>(true);

  const methods: UseFormReturn = useForm(isSignin ?
    { resolver: zodResolver(validationSchemaLogin) } :
    { resolver: zodResolver(validationSchemaSignUp) });

  const onSignIn = useCallback(async (data: any) => {
    try {
      const user = await Database.signin(data.email, data.password);
    } catch (err: any) {
      if (err.response.status === 401) {

      }
      else if (err.response.status === 0) {

      }
      else {

      };
    }
  }, [])

  const onSignUp = useCallback(async (data: any) => {
    console.log('SignUp', data)
    try {
      const createdUser = await Database.createUser(data.email, data.password, data.name, data.isAuthor);
    } catch (err: any) {
      if (err.response.status === 401) {

      }
      else if (err.response.status === 0) {

      }
      else {

      };
    }
  }, [])

  return (
    <AuthPageLayout onSubmit={
      isSignin ? onSignIn : onSignUp}
      methods={methods} isSignIn={isSignin}
      switchIsSignIn={() => setIsSignin(!isSignin)
      }
    />
  )
};

export default AuthPage;
