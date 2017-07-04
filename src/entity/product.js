export default class Product{
    constructor(newNme,newPrce,newId){
        this._name=newNme;
        this._price=newPrce;
        this._id=newId;
    }
    set name(newName){
        this._name=newName;
    }
    set price(newPrice){
        this._price=newPrice;
    }
    set imageUrl(newImageUrl){
        this._imageUrl=newImageUrl;
    }
    get name(){
        return this._name;
    }
    get price(){
        return this._price;
    }
    get id(){
        return this._id;
    }
}