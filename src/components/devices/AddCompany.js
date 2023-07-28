import React, { useState } from 'react';
import './Devices.css';
import { TextField, Button } from '@mui/material';
import axios from '../../security/axios';

export const AddCompany = ({setAddCompanyVisible}) => {

    const [company, setCompany] = useState('');
    
    const disabledCondition = company === null || company.trim() === '';

    const handleAddRow = async () => {
      const newCompany = {
        companyType: 'companyType',
        company: company
      }
      console.log('handleAddRow', newCompany)
      await axios.post('/Users/Company', newCompany)
      .then((res) => {
        console.log("getUsers", res.data);    
      })
      .catch( (e) => { console.log("getUsers error ", e) } );
      setAddCompanyVisible(false);
    }

  return (
    <div className='add-item'>
        <TextField className='add-input' label='Введите company' value={company} required={true} style={{marginBottom: '30px', width: '15%'}}
            onChange={e => setCompany(e.target.value)} />
        <Button className='add-button'disabled={disabledCondition}
            variant="outlined" onClick={() => handleAddRow()}>
            Save
        </Button>
    </div>
  )
}