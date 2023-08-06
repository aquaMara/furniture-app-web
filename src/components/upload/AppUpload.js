import React,{ useState } from 'react';
import { Button, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import useAxiosPrivate from '../../context/useAxiosPrivate';

export const AppUpload = () => {

  const axiosPrivate = useAxiosPrivate();
  const [message, setMessage] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("uploadFile", file);
    
    axiosPrivate.post('/UserAdministration/AppFiles', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
		    console.log(response, response.data,response.data.link);
        setMessage(response.data.link);
      })
      .catch(e => {
        alert(JSON.stringify(e.response.data.message));
      });
  };

  const Input = styled('input')({
    display: 'none',
  });

  return (
    <div style={{marginTop: '5vh', marginLeft: '5vw'}}>
      <label htmlFor="contained-button-file">
        <Input id="contained-button-file" multiple type='file' onChange={handleFileUpload} />
        <Button variant='outlined' component='span'>Upload A File</Button>
      </label>
      {message != '' && <Typography style={{marginTop: '2vh'}}>
        Ссылка для скачивания: {message}
      </Typography>}
    </div>
  )
}
