import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import InfiniteGrid from 'react-infinite-grid';
import {removeProduct,ProductReducer,getCartProducts,getProducts,getCartValue} from '../actions/index';
import {Link} from 'react-router';
import RecycleBin from './../images/minus.jpg';
import Cart from './../images/cart.jpg';

import ReactDOM from 'react-dom';

class CartContainer extends  Component {

    constructor(props){
        super(props);
        console.log(props);
        this.props.getCartProducts();
        this.state={totalSum:0};
        this.count=0;
        this.renderCart=this.renderCart.bind(this);
        this.renderProducts=this.renderProducts.bind(this);
        this.removeProductFromCart=this.removeProductFromCart.bind(this);
        this.compare=this.compare.bind(this);
        this.getSum=this.getSum.bind(this);
    }
    componentWillMount(){
            var prods=  this.props.getCartProducts();
            var products = this.props;
            console.log(products);
            this.state.products = products;
    }
    removeProductFromCart(event){
        const prodName=event.target.getAttribute('data-prod');
        const dataArray=this.props.product!=undefined?this.props.product:[];
        let product_to_be_removed=null;
        for(let data of dataArray){
            if(data!=undefined){
                product_to_be_removed=data.data.filter((product)=>product.name==prodName);
                break;
            }
        }
        if(product_to_be_removed==null)
            return ;
        let prod=product_to_be_removed[0];
        console.log("in Action ");
        console.log(prod);
        this.props.removeProduct(prod);
        this.props.getCartProducts();
        this.props.getCartValue();

    }
    compare(a,b) {
        if (a.name < b.name)
            return -1;
        if (a.name > b.name)
            return 1;
        return 0;
    }

    renderProducts(products){
        if(products==null)
            return ;
        let listArrays=[];
        products.sort(this.compare);
        for (let product of products){
            let listElem=<li className="list-group-item">{product.name}  Price :{product.price}$  X {product.quantity}
                <a href="#"><img className="delete_product_button" data-prod={product.name} onClick={this.removeProductFromCart} src={RecycleBin}/></a>
            </li>;
            listArrays.push(listElem);
        }
        return (
            <ul className="list-group list-group-flush">
                { listArrays}
            </ul>
        );
    }
    renderCart(product){

        return (
            <li className="list-group-item">{product.name}  Price : {product.price}$  X {product.quantity}
                <a href="#"><img className="delete_product_button" data-prod={product.name} onClick={this.removeProductFromCart} src={RecycleBin}/></a>
            </li>
        );
    }
    getSum(cart_products){
        const sum=cart_products.map((product)=>product.price*product.quantity);
        //this.setState({state:sum});

            return <li id="Sumli" className="list-group-item">Total Sum :{sum}$ </li>;

    }
    componentWillMount(){
      this.props.getCartValue();
    }
    render(){
        console.log(this.props);
        const dataArray=this.props.product!=undefined?this.props.product:[];
        let cart_products=null;
        for(let data of dataArray){
            if(data!=undefined){
                cart_products=data.data;
                break;
            }
        }
        console.log("Cart Container Render-------------");
        console.log(dataArray);
        let cartFinalValue=null;
        for(let cartData of this.props.CartValue){
                    if(cartData!=undefined && cartData.data!=undefined){
                        cartFinalValue=cartData.data.message;
                        break;
                    }
         }
         console.log(cartFinalValue);
        console.log("----------------------------------");
        return(
            <div className="col-md-6 pull-right">
                <div className="card cart_card" >
                    <img className="card-img-top product_img" src={Cart} alt="Card image cap">
                        <div className="card-block">
                            <h4 className="card-title">Fredy Shop Cart</h4>
                            {
                                cart_products!=null?
                                        <p className="card-text">Current Food Items in cart</p>:
                                        <p className="card-text">Cart is Empty add Item</p>
                            }
                        </div>
                        <div>
                        {cart_products!=null &&
                            <ul className="list-group list-group-flush">
                              {cart_products.map(this.renderCart)}
                            </ul>
                        }
                        </div>
                        <div className="card-block">
                            {
                               cartFinalValue!=null &&
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Total Sum :$ {cartFinalValue.cartValue}</li>
                                </ul>
                              }
                            {
                                cart_products!=null &&
                                <Link to="/checkout/cart" className="btn btn-primary btn-success pull-right">
                                  <span className="fa fa-shopping-cart">
                                     </span>&nbsp;Checkout
                                </Link>
                            }
                        </div>
                    </img>
                </div>
            </div>
        );
    }

}
function mapStateToProps({product,CartValue}){
    return {product,CartValue};
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({removeProduct,ProductReducer,getCartProducts,getProducts,getCartValue},dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(CartContainer);
