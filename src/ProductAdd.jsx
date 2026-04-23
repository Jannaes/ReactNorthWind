import { useState } from 'react';
import './App.css';
import ProductService from './services/Product'


const ProductAdd = ({setLisäystila, setIsPositive, setMessage, setShowMessage}) => {

    // Komponentin tilan määritys

    const [newProductName, setNewProductName] = useState('')
    const [newSupplierId, setNewSupplierId] = useState('')
    const [newCategoryId, setNewCategoryId] = useState('')
    const [newQuantityPerUnit, setNewQuantityPerUnit] = useState('')
    const [newUnitPrice, setNewUnitPrice] = useState('')
    const [newUnitsInStock, setNewUnitsInStock] = useState('')
    const [newUnitsOnOrder, setNewUnitsOnOrder] = useState('')
    const [newReorderLevel, setNewReorderLevel] = useState('')
    const [newDiscontinued, setNewDiscontinued] = useState(false)
    

    //onSubmit tapahtumankäsittelijä funktio

const handleSubmit = (event) => {
    event.preventDefault()
    var newProduct = {
        productName: newProductName,
        supplierId: Number(newSupplierId),
        categoryId: Number(newCategoryId),
        quantityPerUnit: newQuantityPerUnit,
        unitPrice: Number(newUnitPrice),
        unitsInStock: Number(newUnitsInStock),
        unitsOnOrder: Number(newUnitsOnOrder),
        reorderLevel: Number(newReorderLevel),
        discontinued: newDiscontinued
    }
    
    // const token = localStorage.getItem('token')
    //     CustomerService
    //     .setToken(token)

    ProductService.create(newProduct)
    .then(response => {
        if (response.status === 200) {
            setMessage("Added new Product: " + newProduct.productName)
            setIsPositive(true)
            setShowMessage(true)

                setTimeout(() => {
                    setShowMessage(false)
                }, 5000)  // ilmoitus näkyy 5 sekuntia

            setLisäystila(false)
    }
        })
        .catch(error => {
            console.log(error.response)
            setMessage(error.response?.data || error.message)
            setIsPositive(false)
            setShowMessage(true)
                setTimeout(() => {
                    setShowMessage(false)
                }, 6000)  // ilmoitus näkyy 6 sekuntia

        })
    }

  return (
    <div id="addNew">
        <h2>Add Product</h2>

        <form onSubmit={handleSubmit}>
            <div className='form-row'>
                <label>Product Name</label>
                <input type='text' value={newProductName} onChange={({target}) =>setNewProductName(target.value)} required
                placeholder='Product Name'/>
            </div>
            <div className='form-row'>
                <label>Supplier ID</label>
                <input type='text' value={newSupplierId} onChange={({target}) =>setNewSupplierId(target.value)} required
                placeholder='Supplier ID'/>
            </div>
            <div className='form-row'>
                <label>Category ID</label>
                <input type='text' value={newCategoryId} onChange={({target}) =>setNewCategoryId(target.value)} required
                placeholder='Category ID'/>
            </div>
            <div className='form-row'>
                <label>Unit Price</label>
                <input type='text' value={newUnitPrice} onChange={({target}) =>setNewUnitPrice(target.value)}
                placeholder='Unit Price'/>
            </div>
            <div className='form-row'>
                <label>Quantity Per Unit</label>
                <input type='text' value={newQuantityPerUnit} onChange={({target}) =>setNewQuantityPerUnit(target.value)}
                placeholder='Quantity Per Unit'/>
            </div>
            <div className='form-row'>
                <label>Units In Stock</label>
                <input type='text' value={newUnitsInStock} onChange={({target}) =>setNewUnitsInStock(target.value)}
                placeholder='Units In Stock'/>
            </div>
            <div className='form-row'>
                <label>Units On Order</label>
                <input type='text' value={newUnitsOnOrder} onChange={({target}) =>setNewUnitsOnOrder(target.value)}
                placeholder='Units On Order'/>
            </div>
            <div className='form-row'>
                <label>Reorder Level</label>
                <input type='text' value={newReorderLevel} onChange={({target}) =>setNewReorderLevel(target.value)}
                placeholder='Reorder Level'/>
            </div>
            <div className='form-row'>
                <label>Discontinued</label>
                <input type='checkbox' checked={newDiscontinued} onChange={({target}) =>setNewDiscontinued(target.checked)}
                placeholder='Discontinued'/>
            </div>

            <button className="nappi" type="submit">Save</button>
            <button className="nappi" type="button" onClick={() => setLisäystila(false)} >Back</button>

        </form>

    </div>
  );
}

export default ProductAdd;