import { FC, useCallback, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UseFormReturn, useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import AppContext from '../../context/AppContext';

import errorMessage from '../../services/errorMessage';
import storage from '../../data/storage';
import routes from '../../routes';

import AuthPageLayout from './AuthLayout';
import Database from '../../data/database';

const validationSchemaSignUp = z.object({
  name: z.string().min(2, 'String must contain at list 2 characters'),
  email: z.string().email().transform((val) => val.trim()),
  password: z.string().min(6),
  repeatPassword: z.string().min(6),
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

let initValues = {
  name: '',
  email: '',
  password: '',
  repeatPassword: '',
  isAuthor: false
};

const AuthPage: FC = () => {
  const { setModal } = useContext(AppContext);
  const navigator = useNavigate();
  const [isSignin, setIsSignin] = useState<boolean>(true);
  const [values, setValues] = useState(initValues);

  const methods: UseFormReturn = useForm(isSignin ?
    { resolver: zodResolver(validationSchemaLogin) } :
    { resolver: zodResolver(validationSchemaSignUp) });

    //SIGN IN
  const onSignIn = useCallback(async (data: any) => {
    try {
      const user = await Database.signin(data.email, data.password);
     if(user.session) {
      storage.saveToken(user.session.access_token);
      storage.saveUserInfo({id: user.user.id, name: user.user.user_metadata.name, isAuthor: user.user.user_metadata.isAuthor});
      navigator(routes.POSTS);
     }
    } catch (err: any) {
      console.log(err.Error)
      setModal({ isModal: true, ...errorMessage.SIGNIN_FAILED });
    }
  }, [navigator, setModal])
// SIGN UP
  const onSignUp = useCallback(async (data: any) => {
    console.log('SignUp', values)
    try {
      const createdUser = await Database.createUser(values.email, values.password, values.name, values.isAuthor);
      if (createdUser.user) {
        setModal({ isModal: true, title: 'Sign up was succeed!', message: 'Check up your email to confirm access.' });
        setValues(initValues);
      }

    } catch (err: any) {
      if (err.response.status === 0) {
        setModal({ isModal: true, ...errorMessage.NO_INTERNET });
      }
      else {
        setModal({ isModal: true, ...errorMessage.generateGenericError(err) });
      };
    }
  }, [values, setModal])

  return (
    <AuthPageLayout onSubmit={
      isSignin ? onSignIn : onSignUp}
      methods={methods} isSignIn={isSignin}
      switchIsSignIn={() => setIsSignin(!isSignin)}
      values={values}
      setValue={(data) => setValues((currentState) => ({ ...currentState, ...data }))}
    />
  )
};

export default AuthPage;
