import { actionTypes } from './action';

export const initalState = {
    wishlistItems: [],
    compareItems: [],
    cartItems: [],
};

function reducer(state = initalState, action) {
    switch (action.type) {
        // new
        case actionTypes.SET_WISHLIST_ITEMS_SUCCESS:
            return {
                ...state,
                wishlistItems: action.payload,
            };
        case actionTypes.SET_CART_ITEMS_SUCCESS:
            return {
                ...state,
                cartItems: action.payload,
            };
        case actionTypes.SET_COMPARE_ITEMS_SUCCESS:
            return {
                ...state,
                compareItems: action.payload,
            };
        case 'BILLING_ADDRESS_RESPONSE':
            {                
                const billingAddress=action.payload;
               // console.log(">>>>>REDUCER Billing Address Response"+JSON.stringify(billingAddress));
                return {
                    ...state,
                    billingAddress,
                };
            }            
        default:
            return state;
    }
}

export default reducer;
