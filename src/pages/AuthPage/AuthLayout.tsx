import React, { FC, useState } from "react";
import { Box, Button, Card, Checkbox, Container, FilledInput, FormControlLabel, FormGroup, IconButton, InputAdornment, InputLabel, SxProps, TextField } from "@mui/material/";
import { Control, Controller, FieldValues, FormProvider, UseFormReturn, useForm } from "react-hook-form";
import { CheckBox, Label, Visibility, VisibilityOff } from "@mui/icons-material";

import styles from './AuthPage.module.css';
import cn from 'classnames';

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

type AuthT = {
  onSubmit: (data: any) => void;
  switchIsSignIn: () => void;
  isSignIn: boolean;
  // control: Control<FieldValues, any>;
  // // handleSubmit: (data: FieldValues) => void;
  // formErrors: {
  //   [x: string]: any;
  // };
  methods: UseFormReturn;
}

const AuthLayout: FC<AuthT> = ({ onSubmit, switchIsSignIn, isSignIn, methods }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const { control, handleSubmit, formState: { errors } } = methods;
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
    isAuthor: false
  }); // to avoid react swear on none control

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Container sx={classes.root}>
      {/* <FormProvider {...methods}> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card sx={classes.card}>
          <Box sx={classes.titleRow}>
            <h1 className="title">{isSignIn ? 'Sign In' : 'Sign Up'}</h1>
            <Button sx={classes.switchMode} onClick={switchIsSignIn}>{isSignIn ? 'Sign Up' : 'Sign In'}</Button>
          </Box>

          {!isSignIn && <>
            <Controller
              name="name"
              control={control}
              render={({ field: { onChange } }) => (
                <TextField
                  sx={classes.input}
                  required
                  value={values.name}
                  onChange={(e) => {
                    setValues((currentState) => ({ ...currentState, name: e.target.value }));
                    onChange(e);
                  }}
                  variant="filled"
                  label="Name"
                />
              )}
            />
            {errors.name && (
              <span className={cn(styles.errorNote)}>{errors.name.message as string}</span>
            )}</>}

          <Controller
            name="email"
            control={control}
            render={({ field: { onChange } }) => (
              <TextField
                sx={classes.input}
                type="email"
                required
                value={values.email}
                onChange={(e) => {
                  setValues((currentState) => ({ ...currentState, email: e.target.value }));
                  onChange(e);
                }}
                variant="filled"
                label="Email"
              />
            )}
          />
          {errors.email && (
            <span className={cn(styles.errorNote)}>{errors.email.message as string}</span>
          )}
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange } }) => (
              <FilledInput
                sx={classes.input}
                required
                value={values.password}
                onChange={(e) => {
                  setValues((currentState) => ({ ...currentState, password: e.target.value }));
                  onChange(e);
                }}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            )}
          />
          {errors.password && (
            <span className={cn(styles.errorNote)}>{errors.password.message as string}</span>
          )}

          {!isSignIn && <>
            <Controller
              name="repeatPassword"
              control={control}
              render={({ field: { onChange } }) => (
                <FilledInput
                  sx={classes.input}
                  required
                  value={values.repeatPassword}
                  onChange={(e) => {
                    setValues((currentState) => ({ ...currentState, repeatPassword: e.target.value }));
                    onChange(e);
                  }}
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              )}
            />
            {errors.repeatPassword && (
              <span className={cn(styles.errorNote)}>{errors.repeatPassword.message as string}</span>
            )}

            <FormControlLabel label='Are you author?' control={
              <Controller
                name="isAuthor"
                control={control}
                render={({ field: { onChange } }) => (
                  <Checkbox
                    value={values.isAuthor}
                    onChange={(e: { target: { value: any; }; }) => {
                      setValues((currentState) => ({ ...currentState, isAuthor: e.target.value }));
                      onChange(e);
                    }}
                  />
                )}
              />
            } />
            </>}


          <Button sx={classes.submit} type="submit">Submit</Button>

        </Card>
      </form>
      {/* </FormProvider> */}
    </Container> 
  )
};

export default AuthLayout;
