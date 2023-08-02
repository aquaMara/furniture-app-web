import React, { useState } from 'react';
import './Devices.css';
import { TextField, Button } from '@mui/material';
import useAxiosPrivate from '../../context/useAxiosPrivate';

export const AddCompany = ({setAddCompanyVisible}) => {

    const [company, setCompany] = useState('');
    const axiosPrivate = useAxiosPrivate();
    
    const disabledCondition = company === null || company.trim() === '';

    const handleAddRow = async () => {
      const newCompany = {
        companyType: 'companyType',
        company: company
      }
      await axiosPrivate.post('/Users/Company', newCompany)
      .then((res) => {
        // console.log("getUsers", res.data);    
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
