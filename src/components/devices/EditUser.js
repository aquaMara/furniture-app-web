import React, { useEffect, useState } from 'react';
import './Devices.css';
import { TextField, Button, Typography, Modal, Box } from '@mui/material';
import useAxiosPrivate from '../../context/useAxiosPrivate';

export const EditUser = ({editUserVisible, setEditUserVisible, row, setEditableItem, getUsers}) => {

  const [newDescription, setNewDescription] = useState('');
  const [newDeviceToken, setNewDeviceToken] = useState('');
  const [numberOfLicenseDays, setNumberOfLicenseDays] = useState('');
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    setNewDescription(row.description);
    setNewDeviceToken(row.deviceToken);
  }, [])

  const handleEditRow = async () => {
    const editUser = {
    id: row.id, email: 'email',
    description: newDescription,
    deviceToken: newDeviceToken === '' ? null : newDeviceToken,
    numberOfLicenseDays: +numberOfLicenseDays};
    await axiosPrivate.put(`/Users/${row.id}`, editUser)
    .then((res) => {
      handleClose();
      getUsers();
    })
    .catch(e => {
      alert(JSON.stringify(e.response.data.message));
    });
  }

  const handleClose = () => {
    setEditUserVisible(false);
    setEditableItem(null);
  }

  const createDate = (date1) => {
    let date = new Date(date1);    
    return date.getFullYear() + '-'+ (date.getMonth() + 1) +'-' + date.getDate();
  }

  return (
    row != null && (
      <Modal
      open={editUserVisible}
      onClose={() => handleClose()}
      sx={{ '& .MuiBackdrop-root': { backgroundColor: 'rgba(0,0,0,0.1)' } }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box className='modal-outside'>
        <Typography id="modal-modal-title" style={{marginLeft: '15px', marginTop: '10px'}} variant="h6" component="h2">
          Редактирование элемента с Id: {row.id}
        </Typography>
        <Box className='modal-inside'>
          <Box className='modal-inside-line'>
            <TextField disabled className='add-input' variant="standard" label='name' value={row.name} style={{marginBottom: '20px', width: '15%'}}
              InputProps={{readOnly: true}} />
            <TextField disabled className='add-input' variant="standard" label='company' value={row.company} style={{marginBottom: '20px', width: '15%'}}
              InputProps={{readOnly: true}} />
            <TextField disabled className='add-input' variant="standard" label='dateCreatedUtc' value={createDate(row.dateCreatedUtc)} style={{marginBottom: '20px', width: '15%'}}
            InputProps={{readOnly: true}} />
            <TextField disabled className='add-input' variant="standard" label='dateStartUtc' value={createDate(row.dateStartUtc)} style={{marginBottom: '20px', width: '15%'}}
              InputProps={{readOnly: true}} />
            <TextField disabled className='add-input' variant="standard" label='dateEndUtc' value={createDate(row.dateEndUtc)} style={{marginBottom: '20px', width: '15%'}}
              InputProps={{readOnly: true}} />
            <TextField disabled className='add-input' variant="standard" label='role' value={row.role} style={{marginBottom: '20px', width: '15%'}}
              InputProps={{readOnly: true}} />
          </Box>
          <Box className='modal-inside-line'>
            <TextField className='add-input' label='Введите description' value={newDescription} style={{marginBottom: '20px', width: '15%'}}
              onChange={e => setNewDescription(e.target.value)} />
            <TextField className='add-input' label='Введите licenseKey' value={newDeviceToken} style={{marginBottom: '20px', width: '15%'}}
              onChange={(e) => setNewDeviceToken(e.target.value)} />
            <TextField className='add-input' label='Введите numberOfLicenseDays' value={numberOfLicenseDays} style={{marginBottom: '20px', width: '15%'}}
              onChange={(e) => setNumberOfLicenseDays(e.target.value)} type='number'/>
            <Button className='add-button' onClick={() => handleEditRow()} variant="outlined">
              Save
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
    )
    
  )
}
