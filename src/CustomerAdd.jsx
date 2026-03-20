import { useState } from 'react';
import './App.css';
import CustomerService from './services/Customer'


const CustomerAdd = () => {

    // Komponentin tilan määritys
    
const handleSubmit = () => {
    alert('Formi submitoitu')
}

  return (
    <div id="addNew">
        <h2>Customer add</h2>

        <form onSubmit={() => handleSubmit()}>
            <input type='text' placeholder='Customer ID'/>
            <input type='text' placeholder='Company Name'/>
            <input type='text' placeholder='Contact Name'/>
            <input type='text' placeholder='Contact Title'/>
            <input type='text' placeholder='Address'/>
            <input type='text' placeholder='City'/>
            <input type='text' placeholder='Region'/>
            <input type='text' placeholder='Postal Code'/>
            <input type='text' placeholder='Country'/>
            <input type='text' placeholder='Phone'/>
            <input type='text' placeholder='Fax'/>

            <input type='submit' value='save' />

        </form>

    </div>
  );
}

export default CustomerAdd;