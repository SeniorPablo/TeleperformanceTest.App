import React from 'react'

import Header from './Header'
import Footer from './Footer'
import '../styles/general.css'

export default function Layout({ children }) {
    return (
        <div className="App">
            <Header />
                {children}
            <Footer />
        </div>
    )
}
