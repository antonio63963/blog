import { FC, useCallback, useContext, useState } from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import AppContext from '../../context/AppContext';

import errorMessage from '../../services/errorMessage';
import storage from '../../data/storage';

import Database from '../../data/database';
import FormLayout from './FormLayout';
import { TForm } from './Form.types';
import { Article } from '../../context/AppContext/AppContext.type';

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

const AppForm: FC<TForm> = ({ artId, isAuthor, isOpen, onClose, addItem }) => {
  const { setModal } = useContext(AppContext);

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
        addItem({ authorId: id, title: data.title, text: data.text, authorName: name } as Article);
        onClose();
      }
    } catch (err: any) {
      setModal({ isModal: true, ...errorMessage.SIGNIN_FAILED });
    }
  }, [addItem, id, name, onClose, setModal])

  //COMMENT
  const onComment = useCallback(async (data: any) => {
    console.log('Comment', artId, data.text, id, name)
    try {
      const error = await Database.insertComment(artId, data.text, id, name);
      if (!error) {
        addItem({ id: artId, text: data.text, user_id: id, user_name: name });
        setValues(initialValues);
        onClose();
      } else {
        throw new Error('Something has gone worng... Try later.')
      }

    } catch (err: any) {
      setModal({ isModal: true, ...errorMessage.generateGenericError(err) });
    }
  }, [addItem, artId, id, name, onClose, setModal])

  return (
    <FormLayout
      isOpen={isOpen}
      methods={methods}
      onClose={() => {
        onClose();
        setValues(initialValues);
      }
      }
      onSubmit={isAuthor ? onArticle : onComment}
      setValue={(data: { [x: string]: any; }) => setValues((currentState) => ({ ...currentState, ...data }))}
      title={isAuthor ? 'New Article' : 'New Comment'}
      isAuthor={isAuthor}
      values={values}
    />
  )
};

export default AppForm;
