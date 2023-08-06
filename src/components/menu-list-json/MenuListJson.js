import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import useNode from '../../hooks/useNode';
import { MenuList } from './MenuList';
import '../create-json/CreateJson.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import useAxiosPrivate from '../../context/useAxiosPrivate';

const menuList = {
  id: 1,
  menuList: []
}

export const MenuListJson = () => {

  const [menuListData, setMenuListData] = useState(menuList);
  const [userId, setUserId] = useState('');
  const [users, setUsers] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  const disabledCondition = userId === null || userId === '';

  const { insertNode, editNode, deleteNode, getTopNode } = useNode();

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

  const handleGetTopNode = () => {
    getTopNode(menuListData);
  }

  const handleInsertNode = (folderId, item) => {
    const finalStructure = insertNode(menuListData, folderId, item);
    setMenuListData(finalStructure);
  }

  const handleEditNode = (folderId, value) => {
    const finalStructure = editNode(menuListData, folderId, value);
    setMenuListData(finalStructure);
  }

  const handleDeleteNode = (folderId) => {
    const finalStructure = deleteNode(menuListData, folderId);
    const temp = { ...finalStructure };
    setMenuListData(temp);
  }

  const preview = () => {
    const structure = getTopNode(menuListData);
    var json = JSON.stringify(structure);
    alert(json);
  }

  const handleSaveMenuJson = async () => {
    const structure = getTopNode(menuListData);
    var json = JSON.stringify(structure);
    axiosPrivate.put(`/UserAdministration/Menu/${userId}`, null, { params: {
      jsonMenu: json
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
      <div style={{marginTop: '10px', marginLeft: '20px'}}>
      <MenuList menuList={menuListData}
        handleGetTopNode={handleGetTopNode}
        handleInsertNode={handleInsertNode}
        handleEditNode={handleEditNode}
        handleDeleteNode={handleDeleteNode} />
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
          variant="outlined" onClick={() => handleSaveMenuJson()}>
          Отправить JSON
        </Button>
     </div>
    </div>
  )
}
