import axios from 'axios'

// const baseUrl = "https://localhost:7087/api/authentication"
const baseUrl = "https://nwbackendjanna-b5cubgdvfufefsbd.swedencentral-01.azurewebsites.net/api/authentication"

const authenticate = (userForAuth) => {
    const request = axios.post(baseUrl, userForAuth)
    return request.then(response => response)
}

export default { authenticate }