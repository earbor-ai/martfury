import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { actionTypes,EventsTypes } from './action';

import {
    updateCartSuccess,
    updateCartError,
    setCartItemsSuccess,
    setWishlistTtemsSuccess,
    setCompareItemsSuccess,
    loadEventSuccess,
} from './action';

// new
function* getWishlistItems({ payload }) {
    try {
        yield put(setWishlistTtemsSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

function* getCartItems({ payload }) {
    try {
        yield put(setCartItemsSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

function* getCompareItems({ payload }) {    
    try {
        yield put(setCompareItemsSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

//CSD
/*function* loadEvent(action) {    
    try {
      console.log('load single event');  
      const gnat= yield call(getAccessTokenSaga);
      yield put({type: 'GNAT_FETCH_SUCCEEDED', userAccessToken:gnat});

      localStorage.setItem('AccessToken',gnat);
     //console.log("GNAT>>> "+gnat);
    } catch (err) {
      //yield put(loadFailure());
      console.log("CSD ERRRO: "+err);
    }
  }*/

export default function* rootSaga() {
    // new
    yield all([takeEvery(actionTypes.SET_WISHLIST_ITEMS, getWishlistItems)]);
    yield all([takeEvery(actionTypes.SET_CART_ITEMS, getCartItems)]);
    yield all([takeEvery(actionTypes.SET_COMPARE_ITEMS, getCompareItems)]);
    //yield all([takeEvery("GNAT_FETCH_REQUESTED", loadEvent)]);

    //yield all([takeLatest(EventsTypes.LOAD_EVENT_REQUEST, loadEvent)]); //CSD
    //yield all([fork(loadEvent)]); //CSD



}
