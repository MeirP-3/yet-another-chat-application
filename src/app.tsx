import { Box, Fab, LinearProgress, CircularProgress } from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import io from 'socket.io-client';
import { apiConfig } from './backend/backend.config';
import Chat from './chat/chat';
import Login from './login';
import { theme } from './theme';


const useStyles = makeStyles(theme => {
  console.log(theme);

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
      backgroundImage: 'url(/bg-grey.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    },
    root: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: theme.breakpoints.values['sm'],
      [theme.breakpoints.up('sm')]: {
        width: theme.breakpoints.values['md']
      },
      [theme.breakpoints.up('md')]: {
        width: theme.breakpoints.values['lg']
      },
    },
    fab: {
      position: 'absolute',
      top: theme.spacing(4),
      right: theme.spacing(4),
      zIndex: 1
    },
    exitIcon: {
      marginRight: theme.spacing(1)
    },
    main: {
      flexGrow: 1,
      overflow: 'auto',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      paddingTop: theme.spacing(1)
    },
    circularProgress: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
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
      if (typeof error !== 'string') {
        throw new Error('Received non string error from socket');
      }

      console.log('socket error:', error)

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
    <ThemeProvider theme={theme}>

      <Helmet>
        <meta name="theme-color" content={theme.palette.primary.dark} />
      </Helmet>
      
      <Box className={classes.bg}>
        <Box className={classes.root}>
          {
            isLoggedIn
            &&
            <Fab color="secondary" variant="extended" className={classes.fab} onClick={logOut}>
              <ExitToAppIcon className={classes.exitIcon}/>
              Exit
            </Fab>
          }

          {isLoading && <CircularProgress className={classes.circularProgress}/>}

          <Box className={classes.main}>
            {
              isLoggedIn && socket ?
                <Chat nickname={nickname} socket={socket} />
                :
                <Login setNickname={setNickname} isLoading={isLoading} error={error} />
            }
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
