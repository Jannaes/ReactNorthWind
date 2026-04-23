import './App.css';
import ProductService from './services/Product'

    // props on nimeltään customer
    const Product = ({product, editProduct, setIsPositive, setMessage, setShowMessage, reload, reloadNow}) => {

    // Komponentin tilan määritys
    // const [showDetails, setShowDetails] = useState(false)

    const deleteProduct = (product) => {
        let vastaus = window.confirm(`Remove Product ${product.productName} `)

        if (vastaus === true) {
        ProductService.remove(product.productId)
        .then(res => {
            if (res.status === 200) {
                setMessage(`Successfully removed product ${product.productName}`)
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


  return (

            <tr>
                <td>{product.productId}</td>
                <td>{product.productName}</td>
                <td>{product.supplierId}</td>
                <td>{product.categoryId}</td>
                <td>{product.categoryName}</td>
                <td>{product.quantityPerUnit}</td>
                <td>{product.unitPrice}</td>
                <td>{product.unitsInStock}</td>
                <td>{product.unitsOnOrder}</td>
                <td>{product.reorderLevel}</td>
                <td>{product.discontinued ? "Yes" : "No"}</td>


                <td>
                    <button className="nappi" onClick={() => editProduct(product)}>Edit</button>
                    <button className="nappi" onClick={() => deleteProduct(product)}>Delete</button>
                </td>
            </tr>
  )
}

export default Product;