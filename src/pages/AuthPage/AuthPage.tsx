import React, { FC, useCallback, useState } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import AuthPageLayout from './AuthPageLayout';
import Database from '../../data/database';

import { UseFormReturn, useForm } from 'react-hook-form';

const validationSchema = z.object({
  name: z.string().min(2, 'String must contain at list 2 characters'),
  email: z.string().email().transform((val) => val.trim()),
  password: z.string().min(6),
  repeatPassword: z.string().min(6)
}).superRefine(({ repeatPassword, password }, ctx) => {
  if (repeatPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match",
      path: ['repeatPassword']
    });
  }
});

type FormData = {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
  isAuthor: boolean;
}

const AuthPage: FC = () => {
  const [isSignin, setIsSignin] = useState<boolean>(true);

  const methods: UseFormReturn = useForm({
    resolver: zodResolver(validationSchema),
  });
  const { control, handleSubmit, formState: { errors } } = methods;

  const onSignIn = useCallback(async (data: any) => {
    // if(data.password !== data.repeatPassword) control.setError('repeatPassword', {message: 'uuuuu'});
    console.log(data)
    // try {
    //   const createdUser = await Database.createUser(data.email, data.password, data.name, data.isAuthor);
    // } catch (err: any) {
    //   if (err.response.status === 401) {

    //   }
    //   else if (err.response.status === 0) {

    //   }
    //   else {

    //   };
    // }
  }, [])

  const onSignUp = useCallback(async (data: any) => {
    console.log('Signup')
    // try {
    //   const user = await Database.signin(data.email, data.password);
    // } catch (err: any) {
    //   if (err.response.status === 401) {

    //   }
    //   else if (err.response.status === 0) {

    //   }
    //   else {

    //   };
    // }
  }, [])

  return (
    // <AuthPageLayout methods={methods} />
    <AuthPageLayout onSubmit={isSignin ? onSignIn : onSignUp} methods={methods} />
    // <AuthPageLayout onSubmit={isSignin ? onSignIn : onSignUp} control={control} formErrors={errors} />
  )
};

export default AuthPage;
