import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { Helmet } from "react-helmet";

const useStyle = makeStyles({
  dialogPaper: {
    backgroundColor: 'lightgoldenrodyellow'
  }
});

export default function Login({ setNickname, error, isLoading }: any) {

  const classes = useStyle();

  const [nickname, changeNickname] = useState('');

  const [open, setOpen] = useState(false);

  const onClose = () => {
    if (nickname) {
      setNickname(nickname.trim());
    } else {
      setOpen(false);
    }
  };


  return (
    <Box
      maxWidth="xs"
      display="flex"
      alignItems="center"
      flexDirection="column"
      height="100%"
    >
      <Helmet>
        <title>Login to public chat room</title>
      </Helmet>
      <Box height="15vh" />
      <img
        src={'/icon.png'}
        alt="logo"
        style={{ height: 180, maxWidth: 320 }}
      />
      <Typography component="div">
        <Box
          fontStyle="oblique"
          fontWeight={200}
          fontSize="h3.fontSize"
          textAlign="center"
          color="common.white"
        >
          Welcome to Public Chat Room
        </Box>
        <Box
          fontSize="h5.fontSize"
          textAlign="center"
          color="common.white"
        >
          Come up with a nickname and join the party
            </Box>
      </Typography>

      <Button
        autoFocus
        style={{ margin: 30, borderRadius: '40px' }}
        variant="contained"
        color="secondary"
        onClick={() => setOpen(true)}
      >
        Try it out!
      </Button>

      <Dialog classes={{
        paper: classes.dialogPaper
      }} open={open} onClose={onClose}>
        <DialogTitle>
          Your nickname?
        </DialogTitle>

        <form onSubmit={e => e.preventDefault()}>
          <DialogContent>
            <TextField
              placeholder="Enter temporary nickname"
              variant="outlined"
              value={nickname}
              style={{
                width: '300px'
              }}
              autoFocus
              onChange={({ target: { value } }) => changeNickname(value)}
              error={!!error}
              helperText={error}
            />
          </DialogContent>

          <DialogActions>
            <Button
              type="submit"
              color="primary"
              onClick={onClose}
            >
              Enter
          </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}