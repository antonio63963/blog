import React, { FC } from "react";
import { Box, Button, Card, Modal, SxProps, TextField, Typography } from "@mui/material/";
import { Controller, FormProvider } from "react-hook-form";


// import styles from './AuthPage.module.css';
import cn from 'classnames';
import { TUserForm } from "./Form.types";
import ShowZodError from "../../components/ShowZodError";

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
}


const InputForm: FC<TUserForm> = ({ isOpen, onClose, title, onSubmit, methods, setValue, values }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const { control, handleSubmit, formState: { errors } } = methods;

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={classes.root}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card sx={classes.card}>
          <Box sx={classes.titleRow}>
            <Typography id="modal-modal-title" variant="h6" component="h2">{title}</Typography>
          </Box>

          <Controller
            name="title"
            control={control}
            render={({ field: { onChange } }) => (
              <TextField
                sx={classes.input}
                required
                value={values.title}
                onChange={(e: any) => {
                  setValue({ title: e.target.value });
                  onChange(e);
                }}
                variant="filled"
                label="title"
              />
            )}
          />
          {errors.name &&
            <ShowZodError errMessage={errors.name.message as string} />
          }
          <Controller
            name="text"
            control={control}
            render={({ field: { onChange } }) => (
              <TextField
                sx={classes.input}
                required
                value={values.text}
                onChange={(e: any) => {
                  setValue({ text: e.target.value });
                  onChange(e);
                }}
                variant="filled"
                label="article"
              />
            )}
          />
          {errors.name && <ShowZodError errMessage={errors.name.message as string} />}

          <Button sx={classes.submit} type="submit">Submit</Button>
        </Card>
      </form>
    </Modal>
  )
};

export default InputForm;
