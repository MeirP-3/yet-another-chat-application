import React from 'react';
import { IMessage } from './chat.types';
import { Box, Paper, Typography, makeStyles } from '@material-ui/core';
import TimeFromNow from '../shared/time-from-now';


const useStyles = makeStyles(theme => ({
  notification: {
    padding: theme.spacing(0, 1),
    backgroundColor: theme.palette.grey[300],
    display: 'flex',
    flexDirection: 'column'
  }
}));


const ConnectionMessage = ({ type, time, name, nickname }: IMessage & { nickname: string }) => {
  const classes = useStyles();

  let verb;
  switch (type) {
    case 'user connected':
      verb = 'connected';
      break;
    case 'user disconnected':
      verb = 'disconnected';
      break;
    
    default:
      throw new Error(`got wrong type ${type} for this component`);
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" marginBottom={2}>
      <Paper className={classes.notification}>
        <Typography variant="body1">
          {nickname === name ? 'you' : name} {verb}
        </Typography>
      </Paper>
      <Typography variant="caption" color="textSecondary">
        <TimeFromNow time={time}/>
      </Typography>
    </Box>
  );
};

export default ConnectionMessage;