import axios from "axios"

const baseUrl = "https://localhost:7087/api/customers"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newCustomer => {
    return axios.post(baseUrl, newCustomer)
}

const remove = id => {
    return axios.delete(`${baseUrl}/${id}`)

}

const update = (object) => {
    return axios.put(`${baseUrl}/${object.customerId}`, object)
}

export default { getAll, create, remove, update}

// sulkeiden sisällä oleva object voi olla nimeltään mikä vain, myöskään sulkuja ei välttämättä tarvita. Lisäksi metodin update voi nimetä kuinka haluaa, axios-kirjastosta tuleva put ei ole vapaasti määritettävissä

