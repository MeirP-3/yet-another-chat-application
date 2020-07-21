import React, { useState } from 'react';
import { Container, TextField, Button, Box } from '@material-ui/core';

export default function Login({ setNickname, error }: any) {
  const [nickname, changeNickname] = useState('');

  const onClick = () => {
    setNickname(nickname.trim());
  };

  return (
    <Container maxWidth="xs">
      <Box height="30vh" />
      <form
        onSubmit={e => e.preventDefault()}
      >
        <TextField
          placeholder="Enter temporary nickname"
          variant="outlined"
          value={nickname}
          fullWidth
          onChange={({ target: { value }}) => changeNickname(value)}
          style={{marginBottom: '10px'}}
          error={!!error}
          helperText={error}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          onClick={onClick}
        >
          Login
        </Button>
      </form>
    </Container>
  );
}