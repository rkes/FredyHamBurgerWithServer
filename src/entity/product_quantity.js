export default class Quantity{
    constructor(product,quantity){
        this._product=product;
        this._quantity=quantity;
    }
    set product(product){
        this._product=product;
    }
    set quantity(quantity){
        this._quantity=quantity;
    }
    get product(){
        return this._produc;
    }
    get quantity(){
        return this._quantity;
    }
}