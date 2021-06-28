import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Layout from '../components/Layout'
import Home from '../views/Home'
import Company from '../views/Company'

export default function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/company-information" component={Company} />
                </Switch>
            </Layout>
        </BrowserRouter>
    )
}

