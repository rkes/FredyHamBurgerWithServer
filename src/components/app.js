import React, { Component } from 'react';
import ProductList from '../containers/product_list';
import CartContainer from '../containers/cart_container';
export default class App extends Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}
