import React, { FC } from "react";
import { Button, Card, Container, FilledInput, IconButton, InputAdornment, InputLabel, SxProps, TextField } from "@mui/material/";
import { Controller, FieldValues, FormProvider, useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";


const classes: { [key: string]: SxProps } = {
  input: { mt: 2, mb: 2 },
  card: { display: 'flex', flexDirection: 'column', width: 500, pl: 4, pr: 4, height: 500 }
}

const AuthPageLayout: FC = () => {
  const methods = useForm();
  const [showPassword, setShowPassword] = React.useState(false);
  const { control, handleSubmit } = methods;

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const onSave = (data: FieldValues) => {
    console.log(data);
  }
  return (
    <Container sx={{ height: '100vh', display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
      <FormProvider {...methods}>
        <Card sx={classes.card}>
          <h1 className="title">Sign Up</h1>
          <Controller
            name="name"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextField
                sx={classes.input}
                required
                value={value}
                onChange={onChange}
                variant="filled"
                label="Name"
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextField
                sx={classes.input}
                type="email"
                required
                value={value}
                onChange={onChange}
                variant="filled"
                label="Email"
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field: { value, onChange } }) => (
              <>
                <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                <FilledInput
                  sx={classes.input}
                  required
                  value={value}
                  onChange={onChange}
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
              </>
            )}
          />
          <Controller
            name="repeatPassword"
            control={control}
            render={({ field: { value, onChange } }) => (
              <FilledInput
                sx={classes.input}
                required
                value={value}
                onChange={onChange}
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
          <Button onClick={handleSubmit(onSave)}>Сохранить</Button>
        </Card>
      </FormProvider>
    </Container>
  )
};

export default AuthPageLayout;
