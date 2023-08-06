import { Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import './Navigator.css';

export const Navigator = () => {
  return (
    <div className='navigator' variant="outlined" elevation={6}>
        <Link to='/' className='nav-link'>
          <Typography variant='h6'>
            Устройства и компании
          </Typography>
        </Link>
        <Link to='/material-json' className='nav-link'>
          <Typography variant='h6'>
            Добавить Catalog
          </Typography>
        </Link>
        <Link to='/menu-json' className='nav-link'>
          <Typography variant='h6'>
            Добавить MenuList
          </Typography>
        </Link>
        <Link to='/bundle-json' className='nav-link'>
          <Typography variant='h6'>
            Добавить Bundle
          </Typography>
        </Link>
        <Link to='/add-json' className='nav-link'>
          <Typography variant='h6'>
            Добавить произвольный JSON
          </Typography>
        </Link>
        <Link to='/upload-app' className='nav-link'>
          <Typography variant='h6'>
            Загрузить приложение
          </Typography>
        </Link>
    </div>
  )
}
