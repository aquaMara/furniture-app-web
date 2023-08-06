import { Button, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import '../create-json/CreateJson.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import useAxiosPrivate from '../../context/useAxiosPrivate';

export const BundleJson = () => {

    const axiosPrivate = useAxiosPrivate();
    const [userId, setUserId] = useState('');
    const [users, setUsers] = useState(null);
    const [bundles, setBundles] = useState([
        {
            bundleName: '',
            bundleUrl: '',
            hashBundle: ''
        }
    ]);

    const disabledCondition = userId === null || userId === '';

    const handleBundleInputChange = (e)=>{
        const {name, value}= e.target;
        const list = [...bundles];
        list[0][name]= value;
        setBundles(list);
    }

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

    const preview = () => {
        const structure = { bundles };
        var json = JSON.stringify(structure);
        alert(json);
    }

    const handleSaveBundleJson = () => {
        var newObj = { bundles };
        var json = JSON.stringify(newObj);
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
    <div className='json-generation-container'>
     <div className='json-left-container'>
        <div className='json-outer'>
            <TextField id="standard-basic" variant="standard" className='json-input' style={{width: '50vw'}}
                name='bundleName' label='Введите bundleName' required={true}
                onChange={e => handleBundleInputChange(e)} value={bundles[0].bundleName} />
            <TextField id="standard-basic" variant="standard" className='json-input' style={{width: '50vw'}} 
                name='bundleUrl' label='Введите bundleUrl' required={true}
                onChange={e => handleBundleInputChange(e)} value={bundles[0].bundleUrl} />
            <TextField id="standard-basic" variant="standard" className='json-input' style={{width: '50vw'}}
                name='hashBundle' label='Введите hashBundle' required={true}
                onChange={e => handleBundleInputChange(e)} value={bundles[0].hashBundle} />
        </div>
     </div>
     <div className='button-container'>
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
        <Button className='save-button'
          variant="outlined" onClick={() => preview()}>
          Превью JSON
        </Button>
        <Button className='save-button' disabled={disabledCondition}
          variant="outlined" onClick={() => handleSaveBundleJson()}>
          Отправить JSON
        </Button>
     </div>
    </div>
  )
}
