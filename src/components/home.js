import React, { Component } from 'react';
import ProductList from '../containers/product_list';
import CartContainer from '../containers/cart_container';
export default class Home extends Component {
    render() {
        return (
            <div>
                <ProductList/>
                <CartContainer/>
            </div>
        );
    }
}
