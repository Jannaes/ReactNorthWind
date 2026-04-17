import axios from "axios"

// const baseUrl = "https://localhost:7087/api/customers"
const baseUrl = "https://nwbackendjanna-b5cubgdvfufefsbd.swedencentral-01.azurewebsites.net/api/customers"


let token = null

// Tokenin asettaminen, jotta sitä voidaan käyttää myöhemmin http-pyynnöissä
const setToken = newToken => {
    token = `bearer ${newToken}`
}


//
const getAll = () => {
    // Tokenin lisääminen http-pyyntöön Authorization-headeriin
    const config = {
        headers: { Authorization: token },
    }
    const request = axios.get(baseUrl, config)
    return request.then(response => response.data)
}

const create = newCustomer => {
        const config = {
        headers: { Authorization: token },
    }
    return axios.post(baseUrl, newCustomer, config)
}

const remove = id => {
        const config = {
        headers: { Authorization: token },
    }
    return axios.delete(`${baseUrl}/${id}`, config)

}

const update = (object) => {
        const config = {
        headers: { Authorization: token },
    }
    return axios.put(`${baseUrl}/${object.customerId}`, object, config)
}

const CustomerService = {
    setToken,
    getAll,
    create,
    remove,
    update
}

export default CustomerService

// sulkeiden sisällä oleva object voi olla nimeltään mikä vain, myöskään sulkuja ei välttämättä tarvita. Lisäksi metodin update voi nimetä kuinka haluaa, axios-kirjastosta tuleva put ei ole vapaasti määritettävissä

