var loki = require('lokijs');
db = new loki('products.json');
var foodItems = db.addCollection('foodItems');
foodItems.insert({ id:'0',name: 'Pepsi', price: '30' ,quantity:'10'});
foodItems.insert({ id:'1',name: 'Hamburger', price: '40',quantity:'10' });
foodItems.insert({ id:'2',name: 'Fries', price: '20' ,quantity:'10'});
foodItems.insert({ id:'3',name: 'Coke', price: '20' ,quantity:'10'});

var cartItems = db.addCollection('cartItems');

function deleteFromCart(product){
    let productToBeRemoved=cartItems.findObject({'name':product.name});
    if(productToBeRemoved!=null||productToBeRemoved!=undefined){
        if(productToBeRemoved.quantity==1)
            cartItems.remove(productToBeRemoved);
        else{
            productToBeRemoved.quantity--;
            cartItems.update(productToBeRemoved);
        }

        console.log("Prouct To Be Removed");
    }
}
function addToCart(product){
    let productToBeAdded=cartItems.findObject({'name':product.name});
    console.log(productToBeAdded);
    if(productToBeAdded==null){
        let newProduct={};
        newProduct.id=product.id;
        newProduct.name=product.name;
        newProduct.price=product.price;
        newProduct.quantity=1;
        console.log(newProduct);
        cartItems.insert(newProduct);
    }
    else {
        productToBeAdded.quantity++;
        console.log(productToBeAdded);
        cartItems.update(productToBeAdded);
    }

}

function getTotalCartValue(){
    if(cartItems.data==undefined || cartItems.data.length==0)
        return 0;
    let sum=0;
    for(let cartItem of cartItems.data){
        sum+=cartItem.quantity*cartItem.price;
    }
    console.log(sum);
    return {cartValue:sum};
}

module.exports={
    getData:function(){
        return foodItems;
    },
    updateData:function(product){
        let newProduct=foodItems.findObject({'name':product.name});
        if(newProduct.quantity>product.quantity){
            addToCart(newProduct);
        }
        newProduct.quantity=product.quantity;
        foodItems.update(newProduct);
        return foodItems;
    },
    deleteProductFromCart:function(product){
        deleteFromCart(product);
        let newProduct=foodItems.findObject({'name':product.name});
        newProduct.quantity++;
        foodItems.update(newProduct);
        return foodItems;
    }  ,
    getCartData(){
        return cartItems;
    },
    getCartTotal(){
        return getTotalCartValue();
    }

};

