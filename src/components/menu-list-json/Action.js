import React from 'react';
import { Button } from '@mui/material';

export const Action = ({ handleClick, type, className }) => {
  return (
    <Button className={className} variant="outlined"
        onClick={handleClick}>
        {type}
    </Button>
  )
}


