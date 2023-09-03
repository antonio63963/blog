import React, { FC } from "react";
import { Box, Button, Card, Checkbox, Container, FilledInput, FormControlLabel, IconButton, InputAdornment, TextField } from "@mui/material/";
import { Controller } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { ShowZodError } from "../../components";
import { AuthT } from "./Auth.types";
import classes from "./Auth.styles";

const AuthLayout: FC<AuthT> = ({ onSubmit, switchIsSignIn, isSignIn, methods, values, setValue }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const { control, handleSubmit, formState: { errors } } = methods;

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Container sx={classes.root}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card sx={classes.card}>
          <Box sx={classes.titleRow}>
            <h1 className="title">{isSignIn ? 'Sign In' : 'Sign Up'}</h1>
            <Button
              sx={classes.switchMode}
              onClick={switchIsSignIn}
            >
              {isSignIn ? 'Sign Up' : 'Sign In'}
            </Button>
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
                    setValue({ name: e.target.value });
                    onChange(e);
                  }}
                  variant="filled"
                  label="Name"
                />
              )}
            />
            {errors.name && <ShowZodError errMessage={errors.name.message as string} />}
          </>}

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
                  setValue({ email: e.target.value });
                  onChange(e);
                }}
                variant="filled"
                label="Email"
              />
            )}
          />
          {errors.email && <ShowZodError errMessage={errors.email.message as string} />}

          <Controller
            name="password"
            control={control}
            render={({ field: { onChange } }) => (
              <FilledInput
                sx={classes.input}
                required
                value={values.password}
                onChange={(e) => {
                  setValue({ password: e.target.value });
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
          {errors.password && <ShowZodError errMessage={errors.password.message as string} />}

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
                    setValue({ repeatPassword: e.target.value });
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
            {errors.repeatPassword && <ShowZodError errMessage={errors.repeatPassword.message as string} />}

            <FormControlLabel label='Are you author?' control={
              <Controller
                name="isAuthor"
                control={control}
                render={({ field: { onChange } }) => (
                  <Checkbox
                    value={values.isAuthor}
                    onChange={(e: { target: { value: any; }; }) => {
                      setValue({ isAuthor: e.target.value });
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
    </Container>
  )
};

export default AuthLayout;
