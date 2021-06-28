import React, { Fragment, useState } from 'react'
import { Form, Row, Button, Col, Spinner } from 'react-bootstrap'
import { isEmpty } from 'lodash'
import { useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom"

import { getCompany } from '../../utils/actions'
import { loginRequest } from '../../redux/actions'

export default function MainForm() {

    const [NIT, setNIT] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [error, setError] = useState(false)
    const [loading, setloading] = useState(false)

    const dispatch = useDispatch()
    const history = useHistory()

    const validForm = () => {
        let isValid = true
        setError(false)
    
        if (isEmpty(NIT)) {
            setErrorMessage("Debes ingresar el número de identificación de la empresa")
            setError(true)
            isValid = false;
        }
    
        return isValid
    }

    const validCompanyID = async (e) => {
        e.preventDefault()
        setloading(true)
        if (!validForm()) {
            setloading(false)
            return
        }

        const response = await getCompany(NIT)

        if (!response.statusResponse) {

            setErrorMessage(response.error[0].detail)
            setError(true)
            setloading(false)
            return
        }

        dispatch(loginRequest(response.company))
        setloading(false)
        history.push('/company-information', { from: "MainForm" })
    }

    return (
        <Fragment>
            <h1>Inscripción al servicio</h1>
            <hr />
            <p>
                Ingrese el NIT de la persona natural o jurídica para la que realizará el trámite, 
                sin incluir el dígito de verificación. Luego selecione <strong>Continuar </strong>
                para completar su solicitud.
            </p>

            <Form onSubmit={validCompanyID}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="companyId">
                        <Form.Label>NIT</Form.Label>
                        <Form.Control 
                            type="number" 
                            placeholder="Ingresa aquí el NIT de la empresa" 
                            onChange={(e) => setNIT(e.target.value)}
                            value={NIT}
                            isInvalid={error}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errorMessage}
                        </Form.Control.Feedback>
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
                                Cargando..
                            </Fragment>
                        ) : (
                            <span>Continuar</span>
                        )
                    }
                </Button>
            </Form> 
        </Fragment>
    )
}
