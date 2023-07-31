import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
import '../create-json/CreateJson.css';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios, { axiosPrivate } from '../../api/axios';


export const CreateJson = () => {

  const [userId, setUserId] = useState('');
  const [users, setUsers] = useState(null);
  const [json, setJson] = useState('');

  const disabledCondition = json === null || json.trim() === ''
    || userId === null || userId === '';

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    await axiosPrivate.get('/Users')
    .then((res) => {
      setUsers(res.data);      
    })
    .catch( (e) => { console.log("getUsers error ", e) } );
  }

  const handleSaveMaterialJson = async () => {
    console.log('handleSaveMaterialJson', json, userId);
    axiosPrivate.put(`/UserAdministration/Material/${userId}`, null, { params: {
      jsonMaterial: json
    }})
    .then((res) => {
      console.log('handleSaveMaterialJson', res.data);     
    })
    .catch(e => { 
      console.log('handleSaveMaterialJson error', e);
      alert(JSON.stringify(e.response.data.message))
    });
  }

  const handleSaveMenuJson = async () => {
    console.log('handleSaveMenuJson', json, userId);
    await axiosPrivate.put(`/UserAdministration/Menu/${userId}`, null, { params: {  jsonMenu: json } })
    .then((res) => {
      console.log('handleSaveMenuJson', res.data);     
    })
    .catch(e => { 
      console.log('handleSaveMenuJson error', e);
      alert(JSON.stringify(e.response.data.message))
    });
  }

  const handleSaveBundleJson = () => {
    console.log('handleSaveBundleJson', json, userId);
    axiosPrivate.put(`/UserAdministration/Bundle/${userId}`, null, { params: {
      jsonBundle: json
    }})
    .then((res) => {
      console.log('handleSaveBundleJson', res.data);
      alert('Sucess');
    })
    .catch(e => { 
        console.log('handleSaveBundleJson error', e);
        alert(JSON.stringify(e.response.data.message))
    });
  }

  return (
    <div className='json-container'>
      <div className='left-container'>
        <Link to='https://thisyogesh.github.io/jsonmaker/' className='website-link'>
          <Typography variant='h6'>
            Перейти на сайт для создания JSON
          </Typography>
        </Link>
        {users != null && <FormControl sx={{ m: 1, width: '20vw', marginLeft: 0}}>
          <InputLabel id="add-select">Выберите user *</InputLabel>
          <Select
            labelId="add-select"
            id="add-select"
            value={userId}
            onChange={e => setUserId(e.target.value)}
            label="Выберите user *"
            required={true}
          >
          {users != null && users.map((user) => 
            <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
          )}
          </Select>
        </FormControl> }
        <Button className='save-button' disabled={disabledCondition}
          variant="outlined" onClick={() => handleSaveMaterialJson()}>
          Отправить Material JSON
        </Button>
        <Button className='save-button' disabled={disabledCondition}
          variant="outlined" onClick={() => handleSaveMenuJson()}>
          Отправить Menu JSON
        </Button>
        <Button className='save-button' disabled={disabledCondition}
          variant="outlined" onClick={() => handleSaveBundleJson()}>
          Отправить Bundle JSON
        </Button>
      </div>
      <TextareaAutosize className='textarea' value={json} minRows={12}
        onChange={e => setJson(e.target.value)} />
    </div>
  )
}
