import { useState } from 'react';
import './App.css';
import CustomerService from './services/Customer'


const CustomerEdit = ({setMuokkaustila, setIsPositive, setMessage, setShowMessage, muokattavaCustomer}) => {

    // Komponentin tilan määritys

    const [newCustomerId] = useState(muokattavaCustomer.customerId)
    const [newCompanyName, setNewCompanyName] = useState(muokattavaCustomer.companyName)
    const [newContactName, setNewContactName] = useState(muokattavaCustomer.contactName)
    const [newContactTitle, setNewContactTitle] = useState(muokattavaCustomer.contactTitle)

    const [newCountry, setNewCountry] = useState(muokattavaCustomer.country)
    const [newAddress, setNewAddress] = useState(muokattavaCustomer.address)
    const [newCity, setNewCity] = useState(muokattavaCustomer.city)


    const [newPostalCode, setNewPostalCode] = useState(muokattavaCustomer.postalCode)
    const [newPhone, setNewPhone] = useState(muokattavaCustomer.phone)
    const [newFax, setNewFax] = useState(muokattavaCustomer.fax)
    

    //onSubmit tapahtumankäsittelijä funktio

const handleSubmit = (event) => {
    event.preventDefault()
    var newCustomer = {
        customerId: newCustomerId,
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

    CustomerService.update(newCustomer)
    .then(response => {
        if (response.status === 200) {
            setMessage("Edited Customer: " + newCustomer.companyName)
            setIsPositive(true)
            setShowMessage(true)

                setTimeout(() => {
                    setShowMessage(false)
                }, 5000)  // ilmoitus näkyy 5 sekuntia

            setMuokkaustila(false)
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
    <div id="edit">
        <h2>Customer Edit</h2>

        <form onSubmit={handleSubmit}>
            <div className='form-row'>
                <label>Customer ID</label>
                <input type='text' value={newCustomerId} disabled />
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

            <button type="submit">Save</button>
            <button type="button" onClick={() => setMuokkaustila(false)} >Back</button>

        </form>

    </div>
  );
}

export default CustomerEdit;
