import React,{Component} from 'react';
import {connect} from 'react-redux';
import AddressForm from './customer_address';
import {bindActionCreators} from 'redux';
import Submit from './submit_payment';
import Cart from './../images/cart.jpg';
import {handlePayment} from '../actions/index';
class CheckOut extends  Component {

    constructor(props){
        super(props);
        this.produtSummary=[];
        this.addElem=false;
        this.renderCheckOutProduct=this.renderCheckOutProduct.bind(this);
        this.handleCartPayment=this.handleCartPayment.bind(this);
    }
    handleCartPayment(){
        console.log(this.props);

        let product_for_payment=null;
        for(let prodData of this.props.product){
           if(prodData!=undefined){
                product_for_payment=prodData.data;
                     break;
                 }
          }
        console.log(product_for_payment);
        let data_for_payment={
            products:product_for_payment,
            address:this.props.form.CustomerAddress.values
        };
       this.props.handlePayment(data_for_payment);
        //Submit(this.props.form.CustomerAddress.values);
      //  Submit(this.produtSummary);
    }
    renderCheckOutProduct(product){
        return (
            <li className="list-group-item">{product.name}  Price : {product.price}$  X {product.quantity}

            </li>
        );
    }
    render(){
         const dataArray=this.props.product!=undefined?this.props.product:[];
               let cart_products=null;
               for(let data of dataArray){
                   if(data!=undefined){
                       cart_products=data.data;
                       break;
                   }
               }
               console.log("Cart Container Render-------------");
               console.log(this.props.CartValue);
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
                <div>
                           <div className="col-md-6 pull-right">
                               <AddressForm/>
                           </div>
                   <div className="col-md-6 pull-right">
                       <div className="card cart_card" >
                           <img className="card-img-top product_img" src={Cart} alt="Card image cap">
                              <div className="card-block">
                                                      <h4 className="card-title">Fredy Shop Cart</h4>
                                                      <p className="card-text">Current Food Items in cart</p>:
                                                  </div>
                               <div>
                               {cart_products!=null &&
                                   <ul className="list-group list-group-flush">
                                     {cart_products.map(this.renderCheckOutProduct)}
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
                                   <button type="button" className="btn btn-primary btn-success pull-right" onClick={this.handleCartPayment}>
                                             Proceed to payment for Given Address
                                     </button>
                               </div>
                           </img>
                       </div>
                   </div>
                  </div>
               );
           }
}

function mapStateToProps({product,form,CartValue}){
    return ({product,form,CartValue});
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({handlePayment},dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(CheckOut);