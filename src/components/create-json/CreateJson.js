import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, TextField } from '@mui/material';
import '../create-json/CreateJson.css';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import useAxiosPrivate from '../../context/useAxiosPrivate';


export const CreateJson = () => {

  const [userId, setUserId] = useState('');
  const [users, setUsers] = useState(null);
  const [licenseKey, setLicenseKey] = useState('');
  const [json, setJson] = useState('');
  const axiosPrivate = useAxiosPrivate();

  const getDisabledCondition = licenseKey === null || licenseKey.trim() === '';

  const updateDisabledCondition = json === null || json.trim() === ''
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

  const getMaterial = () => {
    axiosPrivate.get(`/UserAdministration/Catalog/${licenseKey}`)
    .then((res) => {
      setJson(JSON.stringify(res.data));
    })
    .catch(e => { 
      alert(JSON.stringify(e.response.data.message))
    });
  }

  const getMenu = () => {
    axiosPrivate.get(`/UserAdministration/Menu/${licenseKey}`)
    .then((res) => {
      setJson(JSON.stringify(res.data));
    })
    .catch(e => { 
      alert(JSON.stringify(e.response.data.message));
    });
  }

  const getBundle = () => {
    axiosPrivate.get(`/UserAdministration/Bundle/${licenseKey}`)
    .then((res) => {
      setJson(JSON.stringify(res.data));
    })
    .catch(e => { 
      alert(JSON.stringify(e.response.data.message))
    });
  }

  const handleSaveMaterialJson = async () => {
    axiosPrivate.put(`/UserAdministration/Material/${userId}`, null, { params: {
      jsonMaterial: json
    }})
    .then((res) => {
      alert('Sucess');    
    })
    .catch(e => { 
      alert(JSON.stringify(e.response.data.message))
    });
  }

  const handleSaveMenuJson = async () => {
    await axiosPrivate.put(`/UserAdministration/Menu/${userId}`, null, { params: {  jsonMenu: json } })
    .then((res) => {
      alert('Sucess');   
    })
    .catch(e => {
      alert(JSON.stringify(e.response.data.message))
    });
  }

  const handleSaveBundleJson = () => {
    axiosPrivate.put(`/UserAdministration/Bundle/${userId}`, null, { params: {
      jsonBundle: json
    }})
    .then((res) => {
      alert('Sucess');
    })
    .catch(e => { 
      alert(JSON.stringify(e.response.data.message))
    });
  }

  return (
    <div className='json-container'>
      <div className='left-container'>
        <TextField label='Введите licenseKey' value={licenseKey} required={true}
          style={{marginBottom: '20px', width: '20vw'}}
          onChange={e => setLicenseKey(e.target.value)} />
        <Button className='save-button' disabled={getDisabledCondition}
          variant="outlined" onClick={() => getMaterial()}>
          Получить Catalog JSON
        </Button>
        <Button className='save-button' disabled={getDisabledCondition}
          variant="outlined" onClick={() => getMenu()}>
          Получить MenuList JSON
        </Button>
        <Button className='save-button' disabled={getDisabledCondition}
          variant="outlined" onClick={() => getBundle()}>
          Получить Bundle JSON
        </Button>        
      </div>
      <TextareaAutosize className='textarea' value={json} minRows={12}
        onChange={e => setJson(e.target.value)} />
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
        <Button className='save-button' disabled={updateDisabledCondition}
          variant="outlined" onClick={() => handleSaveMaterialJson()}>
          Отправить Catalog JSON
        </Button>
        <Button className='save-button' disabled={updateDisabledCondition}
          variant="outlined" onClick={() => handleSaveMenuJson()}>
          Отправить MenuList JSON
        </Button>
        <Button className='save-button' disabled={updateDisabledCondition}
          variant="outlined" onClick={() => handleSaveBundleJson()}>
          Отправить Bundle JSON
        </Button>
      </div>
    </div>
  )
}
