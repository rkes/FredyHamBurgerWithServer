import React from 'react';
import {Route,IndexRoute} from 'react-router';
import App from './components/app';
import Home from './components/home';

import CheckOut from './containers/check_out';

export default(
    <Route path="/" component={App}>
         <IndexRoute components={Home}/>
         <Route path="checkout/cart" component={CheckOut}/>
    </Route>
);