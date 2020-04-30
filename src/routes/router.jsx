import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Product from '../pages/Product';
import VirtualSeller from '../pages/VirtualSeller';

export default function router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/product/:name' component={Product} />
                <Route path='/virtual' component={VirtualSeller} />
            </Switch>
        </BrowserRouter>
    )
}
