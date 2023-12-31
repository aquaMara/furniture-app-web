import { Button, TextField, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import '../create-json/CreateJson.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import useAxiosPrivate from '../../context/useAxiosPrivate';

export const MaterialJson = () => {

    const [catalogs, setCatalogs] = useState([
        {
            FactoryId: '',
            ModelName: '',
            PathToModelSprite: '',
            list: [
                {
                    SpritePath: '',
                    Width: '',
                    Length: '',
                    ModelName: '',
                    ModelPath: '',
                    Id: ''
                }
            ]
        }
    ]);

    const [userId, setUserId] = useState('');
    const [users, setUsers] = useState(null);
    const axiosPrivate = useAxiosPrivate();

    const disabledCondition = userId === null || userId === '';

    const handleCatalogInputChange = (e, index)=>{
        const {name, value}= e.target;
        const list = [...catalogs];
        list[index][name]= value;
        setCatalogs(list);
    }

    const handleListInputChange = (e, index, id) => {
        const {name, value}= e.target;
        const arr = [...catalogs];
        arr[index].list[id][name] = value;
        setCatalogs(arr);
    }
     
    const handleRemove = (index) => {
        const list=[...catalogs];
        list.splice(index, 1);
        setCatalogs(list);
    }
    
    const handleCatalogAdd = () => { 
        setCatalogs([...catalogs, { FactoryId: '', ModelName: '', PathToModelSprite: '', list: [
            {
                SpritePath: '',
                Width: '',
                Length: '',
                ModelName: '',
                ModelPath: '',
                Id: ''
            }
        ]}]);
    }

    const handleListAdd = (index) => {
        const arr = [...catalogs];
        const arr2 = arr[index].list;
        arr2.push({
            SpritePath: '',
            Width: '',
            Length: '',
            ModelName: '',
            ModelPath: '',
            Id: ''
        });
        setCatalogs(arr);
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
        const structure = { catalogs };
        var json = JSON.stringify(structure);
        alert(json);
    }
    
    const handleSaveMaterialJson = async () => {
        var newObj = { catalogs };
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
     {catalogs.map((catalog, index) => {
        return (
        <div key={index} className='json-outer'>
            <div>
                <div>
                    <Typography>Catalog: {index}</Typography>
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <TextField id="standard-basic" variant="standard" className='json-input' name='FactoryId' label='Введите FactoryId' required={true}
                    onChange={e => handleCatalogInputChange(e, index)} value={catalog.FactoryId} />
                    <TextField id="standard-basic" variant="standard" className='json-input' name='ModelName' label='Введите ModelName' required={true}
                        onChange={e => handleCatalogInputChange(e, index)} value={catalog.ModelName} />
                    <TextField id="standard-basic" variant="standard" className='json-input' name='PathToModelSprite' label='Введите PathToModelSprite' required={true}
                        onChange={e => handleCatalogInputChange(e, index)} value={catalog.PathToModelSprite} />
                </div>
            </div>
                {catalog.list.map((item, id) => {
                    return (
                        <div key={id} className='json-inner'>
                            <Typography>List: {id}</Typography>
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <TextField id="standard-basic" variant="standard" className='json-input' name='Id' label='Введите Id' required={true}
                                    onChange={e => handleListInputChange(e, index, id)} value={item.Id} />
                                <TextField id="standard-basic" variant="standard" className='json-input' name='SpritePath' label='Введите SpritePath' required={true}
                                    onChange={e => handleListInputChange(e, index, id)} value={item.SpritePath} />
                                <TextField id="standard-basic" variant="standard" className='json-input' name='Width' label='Введите Width' required={true}
                                    onChange={e => handleListInputChange(e, index, id)} value={item.Width} />
                                <TextField id="standard-basic" variant="standard" className='json-input' name='Length' label='Введите Length' required={true}
                                    onChange={e => handleListInputChange(e, index, id)} value={item.Length} />
                                <TextField id="standard-basic" variant="standard" className='json-input' name='ModelName' label='Введите ModelName' required={true}
                                    onChange={e => handleListInputChange(e, index, id)} value={item.ModelName} />
                                <TextField id="standard-basic" variant="standard" className='json-input' name='ModelPath' label='Введите ModelPath' required={true}
                                    onChange={e => handleListInputChange(e, index, id)} value={item.ModelPath} />
                            </div>
                        </div>
                    )
                })}
                <Button className='submit-button' style={{marginTop: '20px', marginLeft: '40px', marginBottom: '10px', width: '20vw'}}
                    variant="outlined" onClick={() => handleListAdd(index)}>
                    Добавить list
                </Button>
        </div>
        )
     })}
     </div>
     <div className='button-container'>
        <Button className='save-button' style={{marginTop: '20px'}}
            variant="outlined" onClick={() => handleCatalogAdd()}>
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
        <Button className='save-button'
          variant="outlined" onClick={() => preview()}>
          Превью JSON
        </Button>
        <Button className='save-button' disabled={disabledCondition}
          variant="outlined" onClick={() => handleSaveMaterialJson()}>
          Отправить JSON
        </Button>
     </div>
    </div>
  )
}
