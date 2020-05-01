import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// import Product from '../pages/Product';
import Client from './client.route';
import VirtualSeller from '../pages/VirtualSeller';

export default function router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/virtual' component={VirtualSeller} />
                <Route path='/' component={Client} />
            </Switch>
        </BrowserRouter>
    )
}
