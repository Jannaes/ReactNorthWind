import { useState } from 'react';
import './App.css';
import ProductService from './services/Product'


const ProductEdit = ({setMuokkaustila, setIsPositive, setMessage, setShowMessage, muokattavaProduct}) => {

    // Komponentin tilan määritys

    const [newProductId] = useState(muokattavaProduct.productId)
    const [newProductName, setNewProductName] = useState(muokattavaProduct.productName)
    const [newSupplierId, setNewSupplierId] = useState(muokattavaProduct.supplierId)
    const [newCategoryId, setNewCategoryId] = useState(muokattavaProduct.categoryId)
    const [newQuantityPerUnit, setNewQuantityPerUnit] = useState(muokattavaProduct.quantityPerUnit)
    const [newUnitPrice, setNewUnitPrice] = useState(muokattavaProduct.unitPrice)
    const [newUnitsInStock, setNewUnitsInStock] = useState(muokattavaProduct.unitsInStock)
    const [newUnitsOnOrder, setNewUnitsOnOrder] = useState(muokattavaProduct.unitsOnOrder)
    const [newReorderLevel, setNewReorderLevel] = useState(muokattavaProduct.reorderLevel)
    const [newDiscontinued, setNewDiscontinued] = useState(muokattavaProduct.discontinued)
    

    //onSubmit tapahtumankäsittelijä funktio

const handleSubmit = (event) => {
    event.preventDefault()
    var newProduct = {
        productId: newProductId,
        productName: newProductName,
        supplierId: Number(newSupplierId),
        categoryId: Number(newCategoryId),
        quantityPerUnit: newQuantityPerUnit,
        unitPrice: newUnitPrice !== "" ? Number(newUnitPrice) : null, // jos kenttä on tyhjä, asetetaan null
        unitsInStock: Number(newUnitsInStock),
        unitsOnOrder: Number(newUnitsOnOrder),
        reorderLevel: Number(newReorderLevel),
        discontinued: newDiscontinued
    }

    ProductService.update(newProduct)
    .then(response => {
        if (response.status === 200) {
            setMessage("Edited Product: " + newProduct.productName)
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
        <h2>Product Edit</h2>

        <form onSubmit={handleSubmit}>
            <div className='form-row'>
                <label>Product ID</label>
                <input type='text' value={newProductId} disabled />
            </div>
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
                <label>Quantity Per Unit</label>
                <input type='text' value={newQuantityPerUnit} onChange={({target}) =>setNewQuantityPerUnit(target.value)}
                placeholder='Quantity Per Unit'/>
            </div>
            <div className='form-row'>
                <label>Unit Price</label>
                <input type='number' value={newUnitPrice} onChange={({target}) =>setNewUnitPrice(target.value)} step="0.01" min="0"
                placeholder='Unit Price'/>
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

            <button type="submit">Save</button>
            <button type="button" onClick={() => setMuokkaustila(false)} >Back</button>

        </form>

    </div>
  );
}

export default ProductEdit;
