import React from 'react'
import { Jumbotron, Container } from 'react-bootstrap'
import TeleperformanceImg from '../assets/images/teleperformance.png'

export default function Header() {
    return (
        <Jumbotron fluid style={{ backgroundColor: "#F7F7F7", padding: 0 }}>
            <Container>
                <img src={TeleperformanceImg} alt="teleperformance-img" className="img-responsive" width="25%" />
            </Container>
        </Jumbotron> 
    )
}
