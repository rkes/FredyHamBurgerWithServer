import {SELECTED_PRODUCT,REMOVE_PRODUCT,ALL_PRODUCTS,CART_VALUE} from '../actions/index';
export  function CartReducer(state=[],action){
    console.log("------ In Cart Reducer---------------");
    console.log(state);
    console.log(action.payload);
    // Write Code to get Sum
    console.log("-------------------------------------------");
    switch(action.type){
            case  SELECTED_PRODUCT:
                return [action.payload.data,...state];
        case REMOVE_PRODUCT:
                return removeProduct(state,action.payload);

    }
    return state;
}
export function cartValue(state=[],action){
     switch(action.type){
        case CART_VALUE:
            return [action.payload,...state];
        }
     return state;
}

export function ProductReducer(state=[],action){
    console.log("In Reducer");
    var data=(action.payload!=undefined?action.payload.data:"");
    console.log(data);
    switch(action.type) {
        case ALL_PRODUCTS:
            return [action.payload.data, ...state];
        case  REMOVE_PRODUCT:
            return returnProductToInventory(state,action.payload);
    }
    return state;
}
function returnProductToInventory(state,product){
    let updtatedState=[];
    let finalUpdtatedState=[];
    for(let stateElem of state[0]){
        let productElem=stateElem;
        if(stateElem.product.name==product){
            productElem.quantity=10;
        }
        updtatedState.push(productElem);
    }
    finalUpdtatedState.push(updtatedState);
    return finalUpdtatedState;
}
function updateQuantity(action,state){
    return [action.payload,...state];
}
function removeProduct(state,product){
    let updtatedState=[];
    //console.log(product);
    for(let stateElem of state){
        if(stateElem.name!=product)
            updtatedState.push(stateElem);
    }
    return updtatedState;
}