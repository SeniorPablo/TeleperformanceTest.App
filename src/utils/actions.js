import axios from 'axios'

import { connection } from './connection'
import { security } from './helpers'

export const getValidToken = async () => {
    const result = { statusResponse: true, error: null, token: null }
    await axios.post(`${connection}/token`, security)
    .then(response => {
        result.token = response.data.token
    })
    .catch(error => {
        result.statusResponse = false
        result.error = error.response.data.errors
    })

    return result
}

export const getCompany = async (NIT) => {
    const result = { statusResponse: true, error: null, company: null }
    const responseToken = await getValidToken()
    await axios.get(`${connection}/companies/${NIT}`, { headers: {"Authorization" : `Bearer ${responseToken.token}`} })
    .then(response => {
        result.company = response.data
    })
    .catch(error => {
        result.statusResponse = false
        result.error = error.response.data.errors
    })

    return result
}

export const getIdTypes = async () => {
    const result = { statusResponse: true, error: null, idTypes: [] }
    const responseToken = await getValidToken()
    await axios.get(`${connection}/identificationtypes`, { headers: {"Authorization" : `Bearer ${responseToken.token}`} })
    .then(response => {
        result.idTypes = response.data
    })
    .catch(error => {
        result.statusResponse = false
        result.error = error.response.data.errors
    })

    return result
}

export const updateCompanyData = async (id, company) => {
    const result = { statusResponse: false, error: null }
    console.log(id)
    const responseToken = await getValidToken()
    await axios.put(`${connection}/companies/${id}`, company, { headers: {"Authorization" : `Bearer ${responseToken.token}` } })
    .then(response => {
        result.statusResponse = true
    })
    .catch(error => {
        result.error = error.response.data.errors
    })

    return result
}

