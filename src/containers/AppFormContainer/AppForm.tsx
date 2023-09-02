import React, { FC, useCallback, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UseFormReturn, useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import AppContext from '../../context/AppContext';

import errorMessage from '../../services/errorMessage';
import storage from '../../data/storage';
import routes from '../../routes';

import Database from '../../data/database';
import FormLayout from './FormLayout';
import { TForm } from './Form.types';

const validationSchemaArticle = z.object({
  title: z.string().min(3, 'String must contain at list 3 characters'),
  text: z.string().min(20, 'String must contain at list 20 characters'),
});

const validationSchemaComment = z.object({
  title: z.string().email().transform((val) => val.trim()),
  text: z.string().min(6)
});

let initValues = {
  title: '',
  text: '',
};

const AppForm: FC<TForm> = ({ isAuthor, isOpen, onClose }) => {
  const { setModal } = useContext(AppContext);
  const navigator = useNavigate();

  const [values, setValues] = useState(initValues);

  const methods: UseFormReturn = useForm(
    isAuthor ?
    { resolver: zodResolver(validationSchemaArticle) } :
    { resolver: zodResolver(validationSchemaComment) }
  );

  //ARTICLE
  const onArticle = useCallback(async (data: {title: string; text: string}) => {
    const {id, name} = storage.getUserInfo();
    console.log(data.title, data.text, id)
    try {
      const error = await Database.insertArticle(data.title, data.text, id, name);
      if(!error) {
        onClose();
      }
    } catch (err: any) {
      console.log(err.Error)
      setModal({ isModal: true, ...errorMessage.SIGNIN_FAILED });
    }
  }, [Database, setModal])
  //COMMENT
  const onComment = useCallback(async (data: any) => {
    console.log('SignUp', data)
    try {
      const createdUser = await Database.createUser(data.email, data.password, data.name, data.isAuthor);
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
  }, [setModal])

  return (
    <FormLayout
      isOpen={isOpen}
      methods={methods}
      onClose={onClose}
      // onSubmit={() => console.log('wowo')}
      onSubmit={isAuthor ? onArticle : onComment}
      setValue={(data: { [x: string]: any; }) => setValues((currentState) => ({ ...currentState, ...data }))}
      title={isAuthor ? 'New Article' : 'New Comment'}
      values={values}
    />
  )
};

export default AppForm;
