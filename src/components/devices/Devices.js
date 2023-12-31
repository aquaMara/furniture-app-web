import React, { useEffect, useState } from 'react';
import './Devices.css';
import { Button, Typography, IconButton } from '@mui/material';
import { AddUser } from './AddUser';
import { EditUser } from './EditUser';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import RefreshIcon from '@mui/icons-material/Refresh';
import { AddCompany } from './AddCompany';
import useAxiosPrivate from '../../context/useAxiosPrivate';

export const Devices = () => {

  const [rows, setRows] = useState(null);
  const [addUserVisible, setAddUserVisible] = useState(false);
  const [addCompanyVisible, setAddCompanyVisible] = useState(false);
  const [editUserVisible, setEditUserVisible] = useState(false);
  const [editableItem, setEditableItem] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    getUsers();
  }, []);

  const handleDeleteRow = async (id) => {
    await axiosPrivate.delete(`/Users/${id}`)
    .then((res) => {
      getUsers();
    })
    .catch(e => {
      alert(JSON.stringify(e.response.data.message));
    });
  }

  const handleEditUserVisible = (row) => {
    setEditableItem(row);
    setEditUserVisible(true);
  }

  const getUsers = async () => {
    await axiosPrivate.get('/Users')
    .then((res) => {
      setRows(res.data);
      console.log(res.data)     
    })
    .catch( (e) => { console.log("getUsers error ", e) } );
  }

  const createDate = (date1) => {

    let date = new Date(date1);    
    return date.getFullYear() + '-'+ (date.getMonth() + 1) +'-' + date.getDate();
  }

  const sortInc = (field) => {
    const nextList = [...rows];
    nextList.sort((a,b) => (a[field] > b[field]) ? 1 : ((b[field] > a[field]) ? -1 : 0))
    setRows(nextList);
  }

  const sortDec = (field) => {
    const nextList = [...rows];
    nextList.sort((a,b) => (a[field] < b[field]) ? 1 : ((b[field] < a[field]) ? -1 : 0))
    setRows(nextList);
  }

  return (
    <div className='devices-container'>
      <Button variant="outlined" onClick={() => setAddUserVisible(!addUserVisible)}>
        <Typography variant="h8">Добавить пользователя</Typography>
      </Button>
      {addUserVisible && <AddUser setAddUserVisible={setAddUserVisible} getUsers={getUsers} />}
      <Button variant="outlined" onClick={() => setAddCompanyVisible(!addCompanyVisible)}>
        <Typography variant="h8">Добавить компанию</Typography>
      </Button>
      {addCompanyVisible && <AddCompany setAddCompanyVisible={setAddCompanyVisible} />}
      <table>
        <thead>
          <tr>
              <th>Id</th>
              <th>
                <Typography variant="h8" fontStyle={{textTransform: 'lowercase'}}>name</Typography>
                <IconButton aria-label="sort ascending" onClick={() => sortInc('name')}>
                  <ArrowUpwardIcon />
                </IconButton>
                <IconButton aria-label="sort descending" onClick={() => sortDec('name')}>
                  <ArrowDownwardIcon />
                </IconButton>
              </th>
              <th>
                <Typography variant="h8" fontStyle={{textTransform: 'lowercase'}}>description</Typography>
                <IconButton aria-label="sort ascending" onClick={() => sortInc('description')}>
                  <ArrowUpwardIcon />
                </IconButton>
                <IconButton aria-label="sort descending" onClick={() => sortDec('description')}>
                  <ArrowDownwardIcon />
                </IconButton>
              </th>
              <th>
                <Typography variant="h8" fontStyle={{textTransform: 'lowercase'}}>licenseKey</Typography>
                <IconButton aria-label="sort ascending" onClick={() => sortInc('deviceToken')}>
                  <ArrowUpwardIcon />
                </IconButton>
                <IconButton aria-label="sort descending" onClick={() => sortDec('deviceToken')}>
                  <ArrowDownwardIcon />
                </IconButton>
              </th>
              <th>
                <Typography variant="h8" fontStyle={{textTransform: 'lowercase'}}>dateCreatedUtc</Typography>
                <IconButton aria-label="sort ascending" onClick={() => sortInc('dateCreatedUtc')}>
                  <ArrowUpwardIcon />
                </IconButton>
                <IconButton aria-label="sort descending" onClick={() => sortDec('dateCreatedUtc')}>
                  <ArrowDownwardIcon />
                </IconButton>
              </th>
              <th>
                <Typography variant="h8" fontStyle={{textTransform: 'lowercase'}}>dateStartUtc</Typography>
                <IconButton aria-label="sort ascending" onClick={() => sortInc('dateStartUtc')}>
                  <ArrowUpwardIcon />
                </IconButton>
                <IconButton aria-label="sort descending" onClick={() => sortDec('dateStartUtc')}>
                  <ArrowDownwardIcon />
                </IconButton>
              </th>
              <th>
                <Typography variant="h8" fontStyle={{textTransform: 'lowercase'}}>dateEndUtc</Typography>
                <IconButton aria-label="sort ascending" onClick={() => sortInc('dateEndUtc')}>
                  <ArrowUpwardIcon />
                </IconButton>
                <IconButton aria-label="sort descending" onClick={() => sortDec('dateEndUtc')}>
                  <ArrowDownwardIcon />
                </IconButton>
              </th>
              <th>
                <Typography variant="h8" fontStyle={{textTransform: 'lowercase'}}>role</Typography>
                <IconButton aria-label="sort ascending" onClick={() => sortInc('role')}>
                  <ArrowUpwardIcon />
                </IconButton>
                <IconButton aria-label="sort descending" onClick={() => sortDec('role')}>
                  <ArrowDownwardIcon />
                </IconButton>
              </th>
              <th>
              <Typography variant="h8" fontStyle={{textTransform: 'lowercase'}}>company</Typography>
                <IconButton aria-label="sort ascending" onClick={() => sortInc('company')}>
                  <ArrowUpwardIcon />
                </IconButton>
                <IconButton aria-label="sort descending" onClick={() => sortDec('company')}>
                  <ArrowDownwardIcon />
                </IconButton>
              </th>
              <th>
                <IconButton aria-label="refresh" onClick={() => getUsers()}>
                  <RefreshIcon />
                </IconButton>
              </th>
              <th></th>
          </tr>
        </thead>
        <tbody>
          {rows != null && rows.map((row) => 
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.name}</td>
            <td>{row.description}</td>
            <td>{row.deviceToken}</td>
            <td>{createDate(row.dateCreatedUtc)}</td>
            <td>{createDate(row.dateStartUtc)}</td>
            <td>{createDate(row.dateEndUtc)}</td>
            <td>{row.role}</td>
            <td>{row.company}</td>
            <td>
              <IconButton aria-label="delete"  onClick={() => handleDeleteRow(row.id)}>
                <DeleteIcon />
              </IconButton>
            </td>
            <td>
              <IconButton aria-label="edit"  onClick={() => handleEditUserVisible(row)}>
                <DriveFileRenameOutlineIcon />
              </IconButton>
            </td>
        </tr>
        )}
        </tbody>       
    </table>
    {editableItem != null && <EditUser editUserVisible={editUserVisible} setEditUserVisible={setEditUserVisible}
      row={editableItem} setEditableItem={setEditableItem} getUsers={getUsers} />}
    </div>
  )
}
