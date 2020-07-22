import { Box, IconButton, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Send as IconSend } from '@material-ui/icons';
import React, { useState } from 'react';
import { INewMessageProps } from './chat.types';

const useStyles = makeStyles(theme => ({
  iconButton: {
    width: '3rem',
    height: '3rem'
  },
  form: {
    opacity: 0.8,
    padding: theme.spacing(0, 1),
    borderRadius: theme.spacing(1)
  }
}));

const NewMessage = ({ sendMessage }: INewMessageProps) => {

  const classes = useStyles();

  const [newMessage, setNewMessage] = useState('');

  const send = () => {
    sendMessage(newMessage);
    setNewMessage('');
  };

  return (
    <Box
      component="form"
      onSubmit={e => e.preventDefault()}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      bgcolor="white"
      className={classes.form}
    >
      <TextField
        placeholder="Type a message"
        variant="outlined"
        
        autoFocus
        fullWidth
        multiline
        rowsMax={10}
        value={newMessage}
        onChange={
          ({ target: { value } }) => setNewMessage(value)
        }
        onKeyPress={
          e =>
            e.key === 'Enter'
            &&
            (
              e.preventDefault(),
              !!newMessage
              &&
              send()
            )
        }
      />

      <IconButton
        type="submit"
        color="primary"

        onClick={() => !!newMessage && send()}
      >
        <IconSend className={classes.iconButton} />
      </IconButton>
    </Box>
  );
};

export default NewMessage;