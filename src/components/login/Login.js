import React from 'react';   // rafce
import { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import './Login.css';
import { useNavigate } from 'react-router-dom';

export const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const disabledCondition = password === null || password.trim() === ''
      || username === null || username.trim() === '';

    const navigation = useNavigate();

    const handleLogin = () => {
      if (username === 'u' && password === 'p') {
        navigation.navigate('/');
      }
    }

  return (
    <div className='container'>
      <Typography variant="h4" className='title'>Furniture App Administration</Typography>
        <div className='form'>
            <TextField label='Введите username' required={true} style={{marginBottom: '20px'}}
                value={username} onChange={e => setUsername(e.target.value)} />
            <TextField label='Введите пароль' required={true} style={{marginBottom: '20px'}}
                value={password} onChange={e => setPassword(e.target.value)} />
        <Button className='button' type="submit" disabled={disabledCondition}
          variant="outlined" onClick={() => handleLogin}>
             Войти
        </Button>
    </div>
    
    </div>
  )
}
