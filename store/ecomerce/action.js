export const actionTypes = {
    // new

    SET_WISHLIST_ITEMS: 'SET_WISHLIST_ITEMS',
    SET_WISHLIST_ITEMS_SUCCESS: 'SET_WISHLIST_ITEMS_SUCCESS',

    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_CART_ITEMS_SUCCESS: 'SET_CART_ITEMS_SUCCESS',

    SET_COMPARE_ITEMS: 'SET_COMPARE_ITEMS',
    SET_COMPARE_ITEMS_SUCCESS: 'SET_COMPARE_ITEMS_SUCCESS',
};

export const EventsTypes = {
    LOAD_EVENT_REQUEST: 'LOAD_EVENT_REQUEST',
    LOAD_EVENT_REQUEST_SUCCESS: 'LOAD_EVENT_REQUEST_SUCCESS',
};

// new
export function setWishlistTtems(payload) {
    return { type: actionTypes.SET_WISHLIST_ITEMS, payload };
}

export function setWishlistTtemsSuccess(payload) {
    return { type: actionTypes.SET_WISHLIST_ITEMS_SUCCESS, payload };
}

export function setCartItems(payload) {
    return { type: actionTypes.SET_CART_ITEMS, payload };
}

export function setCartItemsSuccess(payload) {
    return { type: actionTypes.SET_CART_ITEMS_SUCCESS, payload };
}

export function setCompareItems(payload) {
    return { type: actionTypes.SET_COMPARE_ITEMS, payload };
}

export function setCompareItemsSuccess(payload) {
    return { type: actionTypes.SET_COMPARE_ITEMS_SUCCESS, payload };
}

//CSD
/*export function loadEvent(payload) {
    return { type: EventsTypes.LOAD_EVENT_REQUEST, payload };
}
*/
//CSD
/*export function loadEventSuccess(payload) {
    console.log("loadEventSuccess: "+payload);
    return { type: EventsTypes.LOAD_EVENT_REQUEST_SUCCESS, payload };
}*/