import { isEmpty } from 'lodash'
import React, { useState, Fragment, useEffect } from 'react'
import { Form, Row, Col, Button, Spinner } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Swal from "sweetalert2"
import { useHistory } from "react-router-dom"

import { getIdTypes, updateCompanyData } from '../../utils/actions'
import { validateEmail } from '../../utils/helpers'

export default function RegisterForm() {

    const { 
        id, 
        identificationTypeId, 
        companyName, 
        identificationNumber, 
        firstName, 
        secondName, 
        firstLastName,  
        secondLastName, 
        email, 
        allowCellphoneMessages, 
        allowEmailMessages 
    } = useSelector((state) => state.company)

    const history = useHistory()

    const [loading, setloading] = useState(false)
    const [errorCompanyName, setErrorCompanyName] = useState(false)
    const [errorFirstName, setErrorFirstName] = useState(false)
    const [errorSecondName, setErrorSecondName] = useState(false)
    const [errorFirstLastName, setErrorFirstLastName] = useState(false)
    const [errorSecondLastName, setErrorSecondLastName] = useState(false)
    const [errorEmail, setErrorEmail] = useState(false)
    const [idTypes, setIdTypes] = useState([])
    const [company, setCompany] = useState({
        id,
        identificationTypeId,
        companyName,
        identificationNumber,
        firstName,
        secondName,
        firstLastName,
        secondLastName,
        email,
        allowCellphoneMessages,
        allowEmailMessages,
    })

    const handleChange = e => {
        const { name, value } = e.target;
        setCompany({
            ...company,
            [name]: value
        })
    }

    const checkBoxhandleChange = e => {
        const { name, checked } = e.target;
        setCompany({
            ...company,
            [name]: checked
        })
    }

    useEffect(() => {
        (async () => {
            const responseIDTypes = await getIdTypes()
            if(responseIDTypes.statusResponse) {
                setIdTypes(responseIDTypes.idTypes)
            }
        })()
    }, [])
    
    const validNoNumbers = (string) => {
        let validate = false
        const pattern = new RegExp('^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$')
        if (pattern.test(string)){
            validate = true
        }

        return validate
    }

    const validForm = () => {
        let isValid = true
        setErrorCompanyName(false)
        setErrorFirstName(false)
        setErrorSecondName(false)
        setErrorFirstLastName(false)
        setErrorSecondLastName(false)
        setErrorEmail(false)

        if(!validateEmail(company.email)) {
            setErrorEmail(true)
            isValid = false
        }

        if(isEmpty(company.email)) {
            setErrorEmail(true)
            isValid = false
        }

        if(isEmpty(company.companyName) && Number(company.identificationTypeId) !== 2) {
            setErrorCompanyName(true)
            isValid = false
        }

        if(isEmpty(company.firstName) && Number(company.identificationTypeId) === 2) {
            setErrorFirstName(true)
            isValid = false
        }

        if(isEmpty(company.secondName) && Number(company.identificationTypeId) === 2) {
            setErrorSecondName(true)
            isValid = false
        }

        if(isEmpty(company.firstLastName) && Number(company.identificationTypeId) === 2) {
            setErrorFirstLastName(true)
            isValid = false
        }

        if(isEmpty(company.secondLastName) && Number(company.identificationTypeId) === 2) {
            setErrorSecondLastName(true)
            isValid = false
        }

        if(!validNoNumbers(company.companyName) && Number(company.identificationTypeId) !== 2) {
            setErrorCompanyName(true)
            isValid = false
        }

        if(!validNoNumbers(company.firstName) && Number(company.identificationTypeId) === 2) {
            setErrorFirstName(true)
            isValid = false
        }

        if(!validNoNumbers(company.secondName) && Number(company.identificationTypeId) === 2) {
            setErrorSecondName(true)
            isValid = false
        }

        if(!validNoNumbers(company.firstLastName) && Number(company.identificationTypeId) === 2) {
            setErrorFirstLastName(true)
            isValid = false
        }

        if(!validNoNumbers(company.secondLastName) && Number(company.identificationTypeId) === 2) {
            setErrorSecondLastName(true)
            isValid = false
        }

        return isValid
    }

    const saveCompanyData = async (e) => {
        e.preventDefault()
        setloading(true)
        if (!validForm()) {
            setloading(false)
            return
        }

        const responseSaveCompanyData = await updateCompanyData(company.id, company)
        setloading(false)
        if(responseSaveCompanyData.statusResponse) {
            Swal.fire(
                "Notificación",
                "Información actualizada",
                "success"
            )
        } else {
            Swal.fire(
                "¡Upssss!",
                `${responseSaveCompanyData.error[0].detail}`,
                "error"
            )
        }
    }

    return (
        <Form onSubmit={saveCompanyData}>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="identificationNumber">
                    <Form.Label>Número de identificación</Form.Label>
                    <Form.Control 
                        type="number" 
                        value={company.identificationNumber} 
                        name="identificationNumber" 
                        disabled
                    />
                </Form.Group>

                <div className="form-group col-md-4">
                    <label htmlFor="identificationType">Tipo de identificación</label>
                    <select 
                        id="identificationType" 
                        className="form-control" 
                        onChange={handleChange}
                        name="identificationTypeId"
                    >
                        {
                            idTypes.map(type => (
                                type.id === Number(company.identificationTypeId) ? (
                                    <option 
                                        selected 
                                        value={type.id} 
                                        key={type.id}
                                    >
                                        {type.name}
                                    </option>
                                ) : (
                                    <option 
                                        value={type.id} 
                                        key={type.id}
                                    >
                                        {type.name}
                                    </option>
                                )
                            ))
                        }                       
                    </select>
                </div>
            </Row>

            {
                Number(company.identificationTypeId) !== 2 ? (
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="companyName">
                            <Form.Label>Razón social</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={company.companyName} 
                                name="companyName"
                                onChange={handleChange} 
                                required={Number(company.identificationTypeId) !== 2 ? true : false} 
                                isInvalid={errorCompanyName}
                            />
                        </Form.Group>
                    </Row>
                ) : (
                    <Fragment>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="firstName">
                                <Form.Label>Primer nombre</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    value={company.firstName} 
                                    name="firstName"
                                    onChange={handleChange} 
                                    required={Number(company.identificationTypeId) !== 2 ? false : true}  
                                    isInvalid={errorFirstName}
                                />
                                <small className="text-muted">Este campo es alfabético, no puedes ingresar números.</small>
                            </Form.Group>

                            <Form.Group as={Col} controlId="secondName">
                                <Form.Label>Segundo nombre</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    value={company.secondName} 
                                    name="secondName" 
                                    onChange={handleChange} 
                                    required={Number(company.identificationTypeId) !== 2 ? false : true}
                                    isInvalid={errorSecondName} 
                                />
                                <small className="text-muted">Este campo es alfabético, no puedes ingresar números.</small>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="firstLastName">
                                <Form.Label>Primer apellido</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    value={company.firstLastName} 
                                    name="firstLastName" 
                                    onChange={handleChange} 
                                    required={Number(company.identificationTypeId) !== 2 ? false : true} 
                                    isInvalid={errorFirstLastName}
                                />
                                <small className="text-muted">Este campo es alfabético, no puedes ingresar números.</small>
                            </Form.Group>

                            <Form.Group as={Col} controlId="secondLastName">
                                <Form.Label>Segundo apellido</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    value={company.secondLastName} 
                                    name="secondLastName" 
                                    onChange={handleChange} 
                                    required={Number(company.identificationTypeId) !== 2 ? false : true} 
                                    isInvalid={errorSecondLastName}
                                />
                                <small className="text-muted">Este campo es alfabético, no puedes ingresar números.</small>
                            </Form.Group>
                        </Row>
                    </Fragment>
                )
            }

            <Row className="mb-3">
                <Form.Group as={Col} controlId="email">
                    <Form.Label>Correo electrónico</Form.Label>
                    <Form.Control 
                        type="text" 
                        value={company.email} 
                        name="email"
                        onChange={handleChange} 
                        required 
                        isInvalid={errorEmail}
                    />
                    <small className="text-muted">Ingresa un correo electrónico válido.</small>
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="allowCellphoneMessages">
                    <Form.Check
                        name="allowCellphoneMessages"
                        label="Autorizo ​​el envío de mensajes al celular provisto."
                        id="allowCellphoneMessages"
                        onChange={checkBoxhandleChange}
                        checked={company.allowCellphoneMessages}
                    />
                </Form.Group>
                <Form.Group as={Col} controlId="allowEmailMessages">
                    <Form.Check
                        name="allowEmailMessages"
                        label="Autorizo ​​el envío de mensajes a la siguiente dirección de correo electrónico."
                        id="allowEmailMessages"
                        onChange={checkBoxhandleChange}   
                        checked={company.allowEmailMessages}                 
                    />
                </Form.Group>
            </Row>

            <Button variant="primary" type="submit" disabled={loading ? true : false}>
                {
                    loading ? (
                        <Fragment>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                className="mr-2"
                            />
                            Cargando...
                        </Fragment>
                    ) : (
                        <span>Actualizar</span>
                    )
                }
            </Button>
            <Button variant="secondary" onClick={() => history.goBack()} className="ml-2">
                Regresar
            </Button>
        </Form>
    )
}
