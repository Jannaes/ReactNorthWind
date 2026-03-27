import { useState } from 'react';
import './App.css';
import CustomerService from './services/Customer'

    // props on nimeltään customer
    const Customer = ({customer, editCustomer, setIsPositive, setMessage, setShowMessage, reload, reloadNow}) => {

    // Komponentin tilan määritys
    const [showDetails, setShowDetails] = useState(false)

    const deleteCustomer = (customer) => {
        let vastaus = window.confirm(`Remove Customer ${customer.companyName}`)

        if (vastaus === true) {
        CustomerService.remove(customer.customerId)
        .then(res => {
            if (res.status === 200) {
                setMessage(`Successfully removed customer ${customer.companyName}`)
                setIsPositive(true)
                setShowMessage(true)
                window.scrollBy(0, -10000) // scrollataan ylös jotta nähdään alert

                //ilmoituksen piilotus
                setTimeout(() => {
                setShowMessage(false)
                }, 5000)  // ilmoitus näkyy 5 sekuntia

                reloadNow(!reload)
            }
            })
                .catch(error => {
                setMessage(error.message)
                setIsPositive(false)
                setShowMessage(true)
                window.scrollBy(0, -10000)

                    setTimeout(() => {
                    setShowMessage(false)
                    }, 6000)  // ilmoitus näkyy 6 sekuntia
                })

            }
            //Jos poisto halutaankin perua
            else {
                setMessage(`Poisto peruttu onnistuneesti`)
                setIsPositive(true)
                setShowMessage(true)
                window.scrollBy(0, -10000)

                //ilmoituksen piilotus
                setTimeout(() => {
                setShowMessage(false)
                }, 5000)  // ilmoitus näkyy 5 sekuntia
        }
}
    
    //     const editCustomer = (customer) => {
    //     alert("Editing: " + customer.companyName)

    // 
    

  return (
    <div className='customerDiv'>
        <h4 
            onClick={() => setShowDetails(!showDetails)} 
            >{customer.companyName} 
        </h4> 

{/*  toinen vaihtoehto: onMouseEnter={() => setShowDetails(true)}
//onMouseLeave={() => setShowDetails(false)} */}

        {showDetails && <div className="customerDetails" >
                <h3>{customer.companyName}</h3>

                <button onClick={() => deleteCustomer(customer)}>Delete</button>
                <button onClick={() => editCustomer(customer)}>Edit</button>

                <table>
                    <thead>
                        <tr>
                            <th>Contact person</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>Country</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{customer.contactName}</td>
                            <td>{customer.phone}</td>
                            <td>{customer.address}</td>
                            <td>{customer.city}</td>
                            <td>{customer.country}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            }
    </div>

  );
}

export default Customer;