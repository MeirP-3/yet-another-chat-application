import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { Helmet } from "react-helmet";

const useStyle = makeStyles({
  dialogPaper: {
    // backgroundColor: 'lightgoldenrodyellow'
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
        style={{ height: 120, maxWidth: 320 }}
      />
      <Typography component="div">
        <Box
          fontWeight={200}
          fontSize="h3.fontSize"
          textAlign="center"
          marginTop={3}
          marginBottom={2}
          >
          Welcome
        </Box>
        <Box
          fontSize="h5.fontSize"
          fontWeight={100}
          textAlign="center"
          fontStyle="oblique"
        >
          Public Chat Room
            </Box>
      </Typography>

      <Button
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
        <DialogTitle style={{paddingBottom: '0'}}>
          <Typography color="primary" variant="h5">
            Your nickname?
          </Typography>
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
              color="primary"
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