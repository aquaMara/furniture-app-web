import React, { useEffect, useState } from 'react';
import './Devices.css';
import { TextField, Button } from '@mui/material';
import useAxiosPrivate from '../../context/useAxiosPrivate';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export const AddUser = ({setAddUserVisible, getUsers}) => {

    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [description, setDescription] = useState('');
    const [deviceToken, setDeviceToken] = useState('');
    const axiosPrivate = useAxiosPrivate();

    const [companies, setCompanies] = useState(null);

    const disabledCondition = name === null || name.trim() === ''
      || company === null || company === '';

    useEffect(() => {
      getCompanies();
    }, []);

    const getCompanies = async () => {
      await axiosPrivate.get('/Users/Company')
      .then((res) => {
        setCompanies(res.data);      
      })
      .catch( (e) => { console.log("getCompanies error ", e) } );
    }
    
    const handleAddRow = async () => {
      const addUser = {
        email: 'email', gender: 2, password: 'password',
        name: name, companyName: company,
        description: description, deviceToken: deviceToken};
      await axiosPrivate.post('/Users', addUser)
      .then((res) => {
        setAddUserVisible(false);
        getUsers();   
      })
      .catch(e => {
        alert(JSON.stringify(e.response.data.message));
      });
    }

  return (
    <div className='add-item'>
        <TextField className='add-input' label='Введите name' value={name} required={true} style={{marginBottom: '20px', width: '15%'}}
          onChange={e => setName(e.target.value)} />
        <TextField className='add-input' label='Введите licenseKey' value={deviceToken} style={{marginBottom: '20px', width: '15%'}}
          onChange={e => setDeviceToken(e.target.value)} />
        <TextField className='add-input' label='Введите description' value={description} style={{marginBottom: '20px', width: '15%'}}
          onChange={e => setDescription(e.target.value)} />
        <FormControl sx={{ width: '15%'}}>
          <InputLabel id="add-select">Выберите company *</InputLabel>
          <Select
            labelId="add-select"
            id="add-select"
            value={company}
            onChange={e => setCompany(e.target.value)}
            label="Выберите company *"
            required={true}
          >
          {companies != null && companies.map((item) => 
            <MenuItem key={item.id} value={item.company}>{item.company}</MenuItem>
          )}
          </Select>
        </FormControl>
        <Button className='add-button'disabled={disabledCondition}
          variant="outlined" onClick={() => handleAddRow()}>
          Save
        </Button>
    </div>
  )
}
