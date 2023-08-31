import React, { FC, useState } from "react";
import { Button, Card, Container, FilledInput, IconButton, InputAdornment, InputLabel, SxProps, TextField } from "@mui/material/";
import { Control, Controller, FieldValues, FormProvider, UseFormReturn, useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";


const classes: { [key: string]: SxProps } = {
  input: { mt: 2, mb: 2 },
  card: { display: 'flex', flexDirection: 'column', width: 500, pl: 4, pr: 4, height: 500 }
}

type AuthT = {
  onSubmit: (data: any) => void;
  // control: Control<FieldValues, any>;
  // // handleSubmit: (data: FieldValues) => void;
  // formErrors: {
  //   [x: string]: any;
  // };
  methods: UseFormReturn;
}

const AuthPageLayout: FC<AuthT> = ({ onSubmit, methods }) => {
  // const methods = useForm();
  const [showPassword, setShowPassword] = React.useState(false);
  const { control, handleSubmit, formState: { errors } } = methods;
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: ''
  }); // to avoid react swear on none control

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Container sx={{ height: '100vh', display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
      {/* <FormProvider {...methods}> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card sx={classes.card}>
          <h1 className="title">Sign Up</h1>
          <Controller
            name="name"
            control={control}
            render={({ field: { value, onChange } }) => (
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
            <span>{errors.name.message as string}</span>
          )}
          <Controller
            name="email"
            control={control}
            render={({ field: { value, onChange } }) => (
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
            <span>{errors.email.message as string}</span>
          )}
          <Controller
            name="password"
            control={control}
            render={({ field: { value, onChange } }) => (
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
            <span>{errors.password.message as string}</span>
          )}
          <Controller
            name="repeatPassword"
            control={control}
            render={({ field: { value, onChange } }) => (
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
            <span>{errors.repeatPassword.message as string}</span>
          )}
          <Button type="submit">Submit</Button>
        </Card>
      </form>
      {/* </FormProvider> */}
    </Container>
  )
};

export default AuthPageLayout;
