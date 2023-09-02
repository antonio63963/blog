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
  text: z.string().min(6)
});

let initialValues = {
  title: '',
  text: '',
};

const AppForm: FC<TForm> = ({ artId, isAuthor, isOpen, onClose }) => {
  const { setModal } = useContext(AppContext);
  const navigator = useNavigate();

  const [values, setValues] = useState(initialValues);

  const methods: UseFormReturn = useForm(
    isAuthor ?
      { resolver: zodResolver(validationSchemaArticle) } :
      { resolver: zodResolver(validationSchemaComment) }
  );

  const { id, name } = storage.getUserInfo();

  //ARTICLE
  const onArticle = useCallback(async (data: { title: string; text: string }) => {
    try {
      const error = await Database.insertArticle(data.title, data.text, id, name);
      if (!error) {
        onClose();
      }
    } catch (err: any) {
      setModal({ isModal: true, ...errorMessage.SIGNIN_FAILED });
    }
  }, [Database, setModal])

  //COMMENT
  const onComment = useCallback(async (data: any) => {
    console.log('SignUp', artId, values.text, id, name)
    try {
      const error = await Database.insertComment(artId, values.text, id, name);
      if (!error) {
        setValues(initialValues);
        onClose();
      }else {
        throw new Error('Something has gone worng... Try later.')
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
      onClose={() => {
        onClose();
        setValues(initialValues);
      }
      }
      // onSubmit={() => console.log('wowo')}
      onSubmit={isAuthor ? onArticle : onComment}
      setValue={(data: { [x: string]: any; }) => setValues((currentState) => ({ ...currentState, ...data }))}
      title={isAuthor ? 'New Article' : 'New Comment'}
      isAuthor={isAuthor}
      values={values}
    />
  )
};

export default AppForm;
