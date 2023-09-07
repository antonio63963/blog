import React, { FC } from "react";
import { Box, Button, Card, Modal, TextField, Typography } from "@mui/material/";
import { Controller } from "react-hook-form";

import { TUserForm } from "./Form.types";
import {ShowZodError} from "../../components";
import classes from "./Form.styles";

const InputForm: FC<TUserForm> = ({ isOpen, onClose, title, onSubmit, methods, setValue, values, isAuthor }) => {
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

          {isAuthor && (
            <>
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
            </>
          )}

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
                label={isAuthor ? "article" : "comment"}
                multiline
                maxRows={4}
              />
            )}
          />
          {errors.name && <ShowZodError errMessage={errors.name.message as string} />}


          <Button sx={classes.submit} type="submit">Submit</Button>
        </Card>
      </form>
    </Modal >
  )
};

export default InputForm;
