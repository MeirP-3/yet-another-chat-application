import { AppBar, Box, Container, CssBaseline, IconButton, LinearProgress, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { apiConfig } from './backend/backend.config';
import Chat from './chat/chat';
import Login from './login';


const useStyles = makeStyles(theme => {
  // console.log(theme);

  return {
    appBar: {
      boxShadow: 'none'
    },
    title: {
      flexGrow: 1
    },
    bg: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      backgroundColor: blueGrey['100'],
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      maxHeight: '900px'
    },
    main: {
      backgroundColor: theme.palette.grey[200],
      flexGrow: 1,
      overflow: 'auto',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      padding: theme.spacing(1, 0, 0, 2)
    }
  };
});


function App() {

  const classes = useStyles();

  const [
    nickname,
    setNickname
  ] = useState<string>('');

  const [
    socket,
    setSocket
  ] = useState<SocketIOClient.Socket>();

  const [
    isLoading,
    setIsLoading
  ] = useState(true);

  useEffect(() => {
    if (!nickname) {
      const nicknameFromStorage = sessionStorage.getItem('nickname');

      if (nicknameFromStorage === null) {
        setIsLoading(false);
        return;
      }

      setNickname(nicknameFromStorage);
    }

    setIsLoading(true);

    setSocket(
      io(apiConfig.BACKEND_HOST, { query: { nickname } })
    );
  }, [nickname]);

  const [
    error,
    setError
  ] = useState('');

  const [
    isLoggedIn,
    setIsLoggedIn
  ] = useState(false);

  const logOut = () => {
    sessionStorage.removeItem('nickname');
    setNickname('');
    setIsLoggedIn(false);
  }

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on('error', (error: string) => {
      logOut();
      setError(error);
      setIsLoading(false);
    });

    socket.on('ok', () => {
      setIsLoggedIn(true);
      setNickname(nickname);
      sessionStorage.setItem('nickname', nickname);
      setError('');
      setIsLoading(false);
    });

    socket.on('reconnect_attempt', () => {
      socket.io.opts.query = {
        nickname
      };
    });

    return () => {
      socket.disconnect();
    }
  }, [socket, nickname]);

  return (
    // <ThemeProvider theme={theme}>
    <Box className={classes.bg}>
    <CssBaseline />
    <Container className={classes.root} maxWidth="md">
      <AppBar position="relative" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Chat app
          </Typography>
          <IconButton color="inherit" onClick={logOut}>
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {isLoading && <LinearProgress />}

      <Box className={classes.main}>
        {
          !isLoading
          &&
          (isLoggedIn && socket ?
            <Chat nickname={nickname} socket={socket} />
            :
            <Login setNickname={setNickname} error={error} />)
        }
      </Box>
    </Container>
    </Box>
    // </ThemeProvider>
  );
}

export default App;
