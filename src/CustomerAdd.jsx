import { useState } from 'react';
import './App.css';
import CustomerService from './services/Customer'


const CustomerAdd = ({setLisäystila, setIsPositive, setMessage, setShowMessage}) => {

    // Komponentin tilan määritys

    const [newCustomerId, setNewCustomerId] = useState('')
    const [newCompanyName, setNewCompanyName] = useState('')
    const [newContactName, setNewContactName] = useState('')
    const [newContactTitle, setNewContactTitle] = useState('')

    const [newCountry, setNewCountry] = useState('')
    const [newAddress, setNewAddress] = useState('')
    const [newCity, setNewCity] = useState('')


    const [newPostalCode, setNewPostalCode] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [newFax, setNewFax] = useState('')
    

    //onSubmit tapahtumankäsittelijä funktio

const handleSubmit = (event) => {
    event.preventDefault()
    var newCustomer = {
        customerId: newCustomerId.toUpperCase(),
        companyName: newCompanyName,
        contactName: newContactName,
        contactTitle: newContactTitle,
        country: newCountry,
        address: newAddress,
        city: newCity,
        postalCode: newPostalCode,
        phone: newPhone,
        fax: newFax
    }
    
    // const token = localStorage.getItem('token')
    //     CustomerService
    //     .setToken(token)

    CustomerService.create(newCustomer)
    .then(response => {
        if (response.status === 200) {
            setMessage("Added new Customer: " + newCustomer.companyName)
            setIsPositive(true)
            setShowMessage(true)

                setTimeout(() => {
                    setShowMessage(false)
                }, 5000)  // ilmoitus näkyy 5 sekuntia

            setLisäystila(false)
    }
        })
        .catch(error => {
            setMessage(error.message)
            setIsPositive(false)
            setShowMessage(true)
                setTimeout(() => {
                    setShowMessage(false)
                }, 6000)  // ilmoitus näkyy 6 sekuntia

        })
    }

  return (
    <div id="addNew">
        <h2>Add Customer</h2>

        <form onSubmit={handleSubmit}>
            <div className='form-row'>
                <label>Customer ID</label>
                <input type='text' value={newCustomerId} onChange={({target}) =>setNewCustomerId(target.value)} required
                placeholder='ID with 5 capital letters' maxLength="5" minLength="5"/>
            </div>
            <div className='form-row'>
                <label>Company name</label>
                <input type='text' value={newCompanyName} onChange={({target}) =>setNewCompanyName(target.value)} required
                placeholder='Company Name'/>
            </div>
            <div className='form-row'>
                <label>Contact name</label>
            <input type='text' value={newContactName} onChange={({target}) =>setNewContactName(target.value)}
            placeholder='Contact Name'/>
            </div>
            <div className='form-row'>
                <label>Contact Title</label>
                <input type='text' value={newContactTitle} onChange={({target}) =>setNewContactTitle(target.value)}
                placeholder='Contact Title'/>
            </div>
            <div className='form-row'>
                <label>Address</label>
                <input type='text' value={newAddress} onChange={({target}) =>setNewAddress(target.value)}
                placeholder='Address'/>
            </div>
            <div className='form-row'>
                <label>City</label>
                <input type='text' value={newCity} onChange={({target}) =>setNewCity(target.value)}
                placeholder='City'/>
            </div>
            <div className='form-row'>
                <label>Postal Code</label>
                <input type='text' value={newPostalCode} onChange={({target}) =>setNewPostalCode(target.value)}
                placeholder='Postal Code'/>
            </div>
            <div className='form-row'>
                <label>Country</label>
                <input type='text' value={newCountry} onChange={({target}) =>setNewCountry(target.value)}
                placeholder='Country'/>
            </div>
            <div className='form-row'>
                <label>Phone</label>
                <input type='text' value={newPhone} onChange={({target}) =>setNewPhone(target.value)}
                placeholder='Phone'/>
            </div>
            <div className='form-row'>
                <label>Fax</label>
                <input type='text' value={newFax} onChange={({target}) =>setNewFax(target.value)}
                placeholder='Fax'/>
    </div>

            <button className="nappi" type="submit">Save</button>
            <button className="nappi" type="button" onClick={() => setLisäystila(false)} >Back</button>

        </form>

    </div>
  );
}

export default CustomerAdd;