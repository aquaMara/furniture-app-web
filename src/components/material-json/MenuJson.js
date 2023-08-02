import { Button, TextField, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import '../create-json/CreateJson.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import useAxiosPrivate from '../../context/useAxiosPrivate';

export const MenuJson = () => {

  const [menuLists, setMenuLists] = useState([
    {
        buttonName: '',
        id: '',
        menuList: []
    }
  ]);

  const [userId, setUserId] = useState('');
  const [users, setUsers] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  const disabledCondition = userId === null || userId === '';

  const handleInputChange = (e, index)=>{
      const {name, value}= e.target;
      const list = [...menuLists];
      list[index][name]= value;
      list[index]['id'] = index;
      setMenuLists(list);
  }

  const handleAdd = (index, id) => {
    menuLists[index].menuList = [
      {
          buttonName: '',
          id: '',
          menuList: []
      }
    ];
  }

  const showLists = () => {
    return (
      menuLists != null && (
        menuLists.map((ml, index) => {
          return (
          <div key={index} className='json-outer'>
              <div>
                  <div>
                      <Typography>MenuList: {index}</Typography>
                  </div>
                  <div style={{display: 'flex', flexDirection: 'column'}}>
                      <TextField id="standard-basic" variant="standard" className='json-input' name='buttonName' label='Введите buttonName' required={true}
                      onChange={e => handleInputChange(e, index)} value={ml.buttonName} />
                  </div>
              </div>
                  <Button className='submit-button' style={{marginTop: '20px', marginLeft: '40px', marginBottom: '10px', width: '20vw'}}
                      variant="outlined" onClick={() => handleAdd(index, ml.id)}>
                      Добавить list
                  </Button>
          </div>
          )
       })
      )
    )
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

  const handleSaveMaterialJson = async () => {
      var newObj = {  };
      var json = JSON.stringify(newObj);
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

  return (
    <div className='json-generation-container'>
     <div className='json-left-container'>
     {menuLists.map((ml, index) => {
        return (
        <div key={index} className='json-outer'>
            <div>
                <div>
                    <Typography>MenuList: {index}</Typography>
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <TextField id="standard-basic" variant="standard" className='json-input' name='buttonName' label='Введите buttonName' required={true}
                    onChange={e => handleInputChange(e, index)} value={ml.buttonName} />
                </div>
            </div>
            {ml.menuList != null && showLists()}
                <Button className='submit-button' style={{marginTop: '20px', marginLeft: '40px', marginBottom: '10px', width: '20vw'}}
                    variant="outlined" onClick={() => handleAdd(index, ml.id)}>
                    Добавить list
                </Button>
        </div>
        )
     })}
     </div>
     <div className='button-container'>
        <Button className='save-button' style={{marginTop: '20px'}}
            variant="outlined" onClick={() => handleAdd()}>
            Добавить catalog
        </Button>
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
     </div>
    </div>
  )
}
