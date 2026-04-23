import { useState, useEffect } from 'react';
import './App.css';
import ProductService from './services/Product'
import Product from './Product';
import ProductAdd from './ProductAdd';
import ProductEdit from './ProductEdit';


const ProductList = ({setIsPositive, setShowMessage, setMessage}) => {

    // Komponentin tilan määritys
    const [products, setProducts] = useState([])
    const [showProducts, setShowProducts] = useState(false)
    const [lisäystila, setLisäystila] = useState(false)
    const [muokkaustila, setMuokkaustila] = useState(false)
    const [reload, reloadNow] = useState(false)
    const [muokattavaProduct, setMuokattavaProduct] = useState("")
    const [search, setSearch] = useState("")
    

    // UseEffect ajetaan aina alussa kerran
    useEffect(() => {

        // Tokenin asetus CustomerServiceen, jotta sitä voidaan käyttää kaikissa CustomerServiceen liittyvissä metodeissa
        const token = localStorage.getItem('token')
            ProductService
            .setToken(token)

        ProductService.getAll()
        .then(data => {
            setProducts(data)
        })
    },[lisäystila, reload, muokkaustila]  // jos joku näistä muuttuu, useEffect -hook ajetaan
    )

    // Hakukentän onChange tapahtumankäsittelijä
    const handleSearchInputChange = (event) => {
        setShowProducts(true)
        setSearch(event.target.value.toLowerCase())
    }


    const editProduct = (product) => {
        setMuokattavaProduct(product)
        setMuokkaustila(true)
    }

    // ehdollinen renderöinti = {}

  return (
    <>
        <h1><nobr style={{ cursor: 'pointer'}}
            onClick={() => setShowProducts(!showProducts)}>Products</nobr> 

            {!lisäystila && <button className="nappi" onClick={() => setLisäystila(true)}>Add new</button>} </h1>

            {!lisäystila && !muokkaustila && 
                <input placeholder="Search by product name" value={search} onChange={handleSearchInputChange} />} 

            {lisäystila && <ProductAdd setLisäystila={setLisäystila} 
            setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
            />}

            {muokkaustila && <ProductEdit setMuokkaustila={setMuokkaustila} 
            setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
            muokattavaProduct={muokattavaProduct}
            />}

        {
            !lisäystila && !muokkaustila && showProducts && 
            <table id="productTable">
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Supplier ID</th>
                        <th>Category ID</th>
                        <th>Category</th>
                        <th>Quantity per unit</th>
                        <th>Unit price</th>
                        <th>Units in stock</th>
                        <th>Units on order</th>
                        <th>Reorder level</th>
                        <th>Discontinued</th>
                        <th>Actions</th>


                    </tr>
                </thead>
                    <tbody>
                        {products
                            .filter(p =>
                                p.productName.toLowerCase().includes(search)
                            )
                            .map(p => (
                                <Product
                                key={p.productId}
                                product={p}
                                reloadNow={reloadNow}
                                reload={reload}
                                setIsPositive={setIsPositive}
                                setMessage={setMessage}
                                setShowMessage={setShowMessage}
                                editProduct={editProduct}
                                />
                            ))}
                    </tbody>
            </table>
        }
        
    </>
  );
}

export default ProductList;