import React from 'react';   // rafce
import { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import axios from '../../api/axios';

export const Login = () => {

    const { auth, setAuth } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const disabledCondition = password === null || password.trim() === ''
      || username === null || username.trim() === '';

    const navigate = useNavigate();

    const handleLogin = async () => {
      const user = {name: username, password};
      setErrorMessage(null);

      await axios.post('/Users/authenticate', user)
        .then((res) => {
          setAuth(res.data);
          navigate('/');
        })
        .catch(e => {
          // console.log('handleLogin error', e.message, e.response.data.message);
          setErrorMessage(e.response.data.message);
        });
    }

  return (
    <div className='container'>
      <Typography variant="h4" className='title'>Furniture App Administration</Typography>
        <div className='form'>
            <TextField label='Введите username' required={true} style={{marginBottom: '20px'}}
                value={username} onChange={e => {setUsername(e.target.value); setErrorMessage(null);}} />
            <TextField label='Введите пароль' required={true} style={{marginBottom: '20px'}}
                value={password} onChange={e => {setPassword(e.target.value); setErrorMessage(null);}} />
        <Button className='button' type="submit" disabled={disabledCondition}
          variant="outlined" onClick={() => handleLogin()}>
             Войти
        </Button>
        { errorMessage &&
        <Typography style={{alignSelf: 'center', color: 'red'}}>
          {errorMessage}
        </Typography> }
    </div>
    
    </div>
  )
}
