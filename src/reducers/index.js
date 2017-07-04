import { combineReducers } from 'redux';
import {CartReducer,ProductReducer,cartValue} from './cart_reducer';
import {reducer as formReducer} from 'redux-form';
const rootReducer = combineReducers({
    product:CartReducer,
    AllProduct:ProductReducer,
    CartValue:cartValue,
    form:formReducer
});

export default rootReducer;
