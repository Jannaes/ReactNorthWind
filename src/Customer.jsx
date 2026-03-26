import { useState } from 'react';
import './App.css';



    // props on nimeltään customer
    const Customer = ({customer}) => {

    // Komponentin tilan määritys
    const [showDetails, setShowDetails] = useState(false)

  return (
    <div className='customerDiv'>
        <h4 
            onClick={() => setShowDetails(!showDetails)} 
            >{customer.companyName}
        </h4> 

{/* // toinen vaihtoehto: onMouseEnter={() => setShowDetails(true)}
//onMouseLeave={() => setShowDetails(false)} */}

        {showDetails && <div className="customerDetails" >
                <h3>{customer.companyName}</h3>
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