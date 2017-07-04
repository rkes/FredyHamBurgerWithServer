import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import InfiniteGrid from 'react-infinite-grid';
import Coke from './../images/coke.jpg';
import Fries from './../images/Fries.jpg';
import Pepsi from './../images/pepsi.jpg';
import Hamburger from './../images/hamburger.jpg';
import {getProducts,updateCart,getCartProducts,getCartValue} from '../actions/index';

class ProductList extends  Component {
    constructor(props) {
        super(props);
        this.state = {products: []};
        //console.log(this.props);
        this.addtoCart=this.addtoCart.bind(this);
    }
    componentWillMount(){
        var prods=this.props.getProducts();
        var products = this.props;
        console.log(products);
        this.state.products = products;
    }
    addtoCart(event){
        let productDetail=this.props.AllProduct[0].data[parseInt(event.target.getAttribute('data'))];
        console.log("In Add to Cart")
        this.props.updateCart(productDetail);
        this.props.getProducts();
        this.props.getCartProducts();
        this.props.getCartValue();


        /*let prodList=this.state.products.payload;
        var pos=prodList.indexOf(productDetail);
        let prod=prodList[pos];
        prod.quantity--;
        prodList.splice(pos,1,prod);
        this.setState({payload:{products:prodList}});*/
    }
    showProduct(product,index,image) {
      let disabled=product.quantity>0?false:"disabled";
      return(
          <img className="card-img-top product_img" src={image} alt="Card image cap">
                    <div className="card-block">
                        <h4 className="card-title">{product.name}</h4>
                        <p className="card-text">Price : {product.price}$</p>
                        <p className="card-text">Avialiable Quantity : {product.quantity}</p>
                        <button type="button" className="btn btn-primary" data={index} disabled={disabled} onClick={this.addtoCart}>Add To  Cart</button>

                     </div>
           </img>
      );
}

    render() {
        const data=this.props.AllProduct!=undefined&&this.props.AllProduct.length>0?this.props.AllProduct[0].data:null;
        return (
            <table className="col-md-6">
                {   data!=null &&
                    <tbody>
                        <tr>
                            <td>{this.showProduct(data[0],0,Pepsi)}</td>
                            <td>{this.showProduct(data[1],1,Hamburger)}</td>
                        </tr>
                        <tr>
                            <td>{this.showProduct(data[2],2,Fries)}</td>
                            <td>{this.showProduct(data[3],3,Coke)}</td>
                        </tr>
                    </tbody>
                }
            </table>
         );
       }
}
function mapStateToProps({AllProduct}){
    return {AllProduct};
}
function mapDispatchToProps(dispatch){
    // It will set props of reducers and middleware down the line with productCart data
    return bindActionCreators({getProducts,updateCart,getCartProducts,getCartValue},dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(ProductList);