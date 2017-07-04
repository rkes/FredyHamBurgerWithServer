import Product from '../entity/product';
import axios from 'axios';
export const SELECTED_PRODUCT='SELECTED_PRODUCT';
export const ALL_PRODUCTS='ALL_PRODUCTS';
export const REMOVE_PRODUCT='REMOVE_PRODUCT';
export const CART_VALUE='CART_VALUE';

export function updateCart(product){
    let qutantity=parseInt(product.quantity)-1;
    product.quantity=qutantity;
    const request=axios.put("/updateProduct",product);
    console.log("Updating Cart");
    return {
        type:SELECTED_PRODUCT,
        payload:product
    };
}
export function getProducts(){
    const req=axios.get("/allProducts");
        console.log(req);
        return {
            type:ALL_PRODUCTS,
            payload:req
        };

}

export function getCartProducts(){
    const req=axios.get("/getCartState");
    console.log(req);
    return {
        type:SELECTED_PRODUCT,
        payload:req
    };

}

export function removeProduct(product){
    //let qutantity=parseInt(product.quantity)+1;
    //product.quantity=qutantity;
    const request=axios.post("/deleteProductFromCart",product);
    console.log("Removing from  Cart");
    return {
        type:ALL_PRODUCTS,
        payload:request
    };
}
export function getCartValue(){
    const request=axios.get("/getCartValue");
    return {
        type:CART_VALUE,
        payload:request
    };
}
export function handlePayment(request){
    axios.post("/handlePayment",request).then(function(){
        window.alert("Payment Done");
    });

}
/*export function setProductQuantity(productName,quantity){

}
function setProductQuantity(){

}
function getProductsCatalogWithQuantity(intialQuantityForAllProduct){
    let productWithQuantity=[];
    productWithQuantity=productCatalog.map((product)=>{
            let prodWithQuantity= {
                product:product,
                quantity:intialQuantityForAllProduct
            };
            return prodWithQuantity;
    }  );

    return  productWithQuantity;
}
async function fetchData(){
    return await axios.get("/allProducts").then(resolve=>resolve.data);
}*/
/*
function getAllProducts(){
    var products=new Array();
    let req=fetchData();
    console.log(req.data);
    var pepsi=new Product('Pepsi','30');
    var haburger=new Product('Hamburger','40');
    var fries=new Product('Fries','20');
    var coke=new Product('Coke','20');
    products.push(pepsi);
    products.push(haburger);
    products.push(fries);
    products.push(coke);
    return products;
}*/
