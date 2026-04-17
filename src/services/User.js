import axios from "axios"

// const baseUrl = "https://localhost:7087/api/users"
const baseUrl = "https://nwbackendjanna-b5cubgdvfufefsbd.swedencentral-01.azurewebsites.net/api/users"

let token = null

// Tokenin asettaminen, jotta sitä voidaan käyttää myöhemmin http-pyynnöissä
const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const config = {
        headers: { Authorization: token },
    }
    const request = axios.get(baseUrl, config)
    return request.then(response => response.data)
}

const create = newUser => {
    const config = {
        headers: { Authorization: token },
    }
    return axios.post(baseUrl, newUser, config)
}

const remove = id => {
    const config = {
        headers: { Authorization: token },
    }
    return axios.delete(`${baseUrl}/${id}`, config)

}

const update = (object) => {
    return axios.put(`${baseUrl}/${object.userId}`, object)
}

const UserService = {
   getAll,
   create,
   remove,
   update,
   setToken
}

export default UserService