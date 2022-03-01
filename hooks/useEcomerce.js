import React, { useState } from 'react';
import ProductRepository from '~/repositories/ProductRepository';
import GNProductRepository from '~/repositories/GNProductRepository';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';

import {
    setCompareItems,
    setWishlistTtems,
    setCartItems,
} from '~/store/ecomerce/action';   

export default function useEcomerce() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [cartItemsOnCookie] = useState(null);
    const [cookies, setCookie] = useCookies(['cart']);
    const [products, setProducts] = useState(null);
    const [states, setStates] = useState(null);
    const [addresses, setAddresses] = useState(null);    
    const [billingDetailsResponse, setBillingDetailsResponse] = useState(null);  
    const [shippingMeth, setShippingMeth] = useState(null);  
    const [PaymentMeth, setPaymentMeth] = useState(null);  
    const [orderSummary, setOrderSummaryResponse] = useState(null);  
    const [confirmOrder, setConfirmOrderResponse] = useState(null);  
    const [orderHistory, setOrderHistoryResponse] = useState(null);  
    const [orderDetails, setOrderDetailsResponse] = useState(null); 
    const [printOrders, setPrintOrderDetailsResponse] = useState(null);      
    const [printPDFOrders, setPrintPDFOrderDetailsResponse] = useState(null);      
    const [addNewAddress, setAddNewAddress] = useState(null);    
    const [addressById, setAddressById] = useState(null);    
   
    return {
        loading,
        cartItemsOnCookie,
        products,
        states,
        addresses,
        billingDetailsResponse,
        shippingMeth,
        PaymentMeth,
        orderSummary,
        setShippingMeth,
        confirmOrder,
        orderHistory,
        orderDetails,
        printOrders,
        printPDFOrders,
        addNewAddress,
        addressById,
        getProducts: async (payload, group = '') => {
            setLoading(true);   
                    
            //if (payload && payload.length > 0) 
            if (true)
            {               
                /*let queries = '';
                payload.forEach((item) => {
                    if (queries === '') {                        
                        queries = `id_in=${item.id}`;
                    } else {
                        queries = queries + `&id_in=${item.id}`;
                    }
                });  */                                                    
                
                let responseData="";                
                if (group == ''){                    
                    responseData = await GNProductRepository.getProductWishlist();
                }

                if (group == "cart"){                 
                    responseData = await GNProductRepository.getProductFromCart();                    
                }                                        
                if (responseData.Items && responseData.Items.length > 0) 
                {                    
                    if (group === 'cart') {                                                
                        let cartItems = responseData.Items;
                       /* payload.forEach((item) => {
                            let existItem = cartItems.find(
                                (val) => val.id === item.id
                            );
                            if (existItem) {
                                existItem.quantity = item.quantity;
                            }
                        });*/
                        console.log ("GET PRODUCTS RESPONSE: "+JSON.stringify(responseData));    
                        setProducts(cartItems);
                    } else {
                        //alert ( " set ");                        
                        setProducts(responseData);                        
                    }
                    setTimeout(
                        function () {
                            setLoading(false);
                        }.bind(this),
                        250
                    );
                }
                else
                {
                    if (group === 'cart') {
                        setProducts(responseData.Items);
                    }
                    else{
                        //Check for cart Also
                        setProducts(responseData);
                    }
                }
            } else {
                setLoading(false);
                setProducts([]);
            }
        },

        increaseQty: async(payload, currentCart) => {                          
            currentCart=payload.prodItem;
            let cart = [];
            if (currentCart) {                
                cart = currentCart;                          
                const existItem = cart.find((item) => item.Id === payload.id); 
                                                              
                if (existItem) {                    
                    existItem.Quantity = existItem.Quantity + 1;
                }                
                
                const responseData = await GNProductRepository.updateCartQuantity(payload.id,existItem.Quantity);   

                console.log("INC_QTY Response"+JSON.stringify(responseData));

                if (responseData.success==false)
                    alert (responseData.warnings);
                
                dispatch(setCartItems(cart));
            }
            return cart;
        },

        decreaseQty: async(payload, currentCart) => {
            currentCart=payload.prodItem;
            
            let cart = [];
            if (currentCart) {
                cart = currentCart;
                const existItem = cart.find((item) => item.Id === payload.id);
            
                if (existItem) {
                    if (existItem.Quantity > 1) {
                        existItem.Quantity = existItem.Quantity - 1;
                    }
                }
                const responseData = await GNProductRepository.updateCartQuantity(payload.id,existItem.Quantity);   

                console.log("DEC_QTY Response"+JSON.stringify(responseData));

                if (responseData.success==false)
                    alert (responseData.warnings);
                    
                //setCookie('cart', cart, { path: '/' });
                dispatch(setCartItems([cart]));
            }
            return cart;
        },

        addItem: async (newItem, items, group,fromWl=false) => {
            let newItems = [];
            /*if (items) {
                newItems = items;
                const existItem = items.find((item) => item.id === newItem.id);
                //alert ("Add Item>>> "+newItem); //CSD
                if (existItem) {
                    if (group === 'cart') {
                        existItem.quantity += newItem.quantity;
                    }
                } else {
                    newItems.push(newItem);
                }
            } else {
                newItems.push(newItem);
            }*/
            if (group === 'cart') {                                              
                const responseData = await GNProductRepository.addProductToCart(newItem.id);
                console.log("ADD PRODUCT TO CART>>> "+JSON.stringify(responseData));                                               
                dispatch(setCartItems([])); 
                            
                if (fromWl==true)
                {
                    const responseData = await GNProductRepository.removeProductFromWishlist(newItem.shoppingCartId); 
                    dispatch(setWishlistTtems([])); 
                }
            }
            if (group === 'wishlist') {                
                const responseData = await GNProductRepository.addProductToWishlist(newItem.id);                                 
                dispatch(setWishlistTtems([]));                
            }
            if (group === 'compare') {
                setCookie('compare', newItems, { path: '/' });
                dispatch(setCompareItems(newItems));
            }
            return newItems;
        },

        removeItem: async (selectedItem, items, group) => {            
            /*let currentItems = items;
            if (currentItems.length > 0) {
                const index = currentItems.findIndex(
                    (item) => item.id === selectedItem.id
                );
                currentItems.splice(index, 1);
            }*/
            if (group === 'cart') {    
                         
                const responseData = await GNProductRepository.removeProductFromCartPage(selectedItem.id); 
                dispatch(setCartItems([])); 
                //const responseData1 = await GNProductRepository.getProductFromCart(); 
                //setProducts(responseData1);
                //dispatch(setCartItems(responseData1.Items));           
                
            }

            if (group === 'wishlist') {  
                const responseData = await GNProductRepository.removeProductFromWishlist(selectedItem.Id); 
                dispatch(setWishlistTtems([]));  //Triggers getProducts() call inside Wishlist useEffects
            }

            if (group === 'compare') {
                //setCookie('compare', currentItems, { path: '/' });
            }
        },

        removeItems: (group) => {
            if (group === 'wishlist') {
                setCookie('wishlist', [], { path: '/' });
                dispatch(setWishlistTtems([]));
            }
            if (group === 'compare') {
                setCookie('compare', [], { path: '/' });
                dispatch(setCompareItems([]));
            }
            if (group === 'cart') {
                setCookie('cart', [], { path: '/' });
                dispatch(setCartItems([]));
            }
        },

        applyCouponDiscount: async(payload, currentCart) => {                                      

            const responseData = await GNProductRepository.applyCouponDiscount(payload.couponCode); 
            console.log ("Coupon Discount "+JSON.stringify(responseData));

            //alert (responseData.model.DiscountBox.Message);
            //dispatch(setCartItems([currentCart]));                             
        },

        getStates: async(payload) => {                                      

            const responseData = await GNProductRepository.getStatesByCountryId(payload.countryCode); 
            console.log ("States "+JSON.stringify(responseData));
            
            setStates(responseData);            
            //alert (responseData.model.DiscountBox.Message);
            //dispatch(setCartItems([currentCart]));                             
        },

        getAddresses: async() => {                                      
            const responseData = await GNProductRepository.getCheckoutAddresses(); 
            console.log ("Addresses: "+JSON.stringify(responseData));
            
            setAddresses(responseData.Addresses);                        
        },
        addNewAddress: async(payload) => {                                      
            const responseData = await GNProductRepository.addNewAddress(payload.data); 
            console.log ("Add New Address: "+JSON.stringify(responseData));            
            setAddNewAddress(responseData);                        
        },
        getAddressById: async(payload) => {                                      
            const responseData = await GNProductRepository.getAddressById(payload); 
            console.log ("GET Address BY ID: "+JSON.stringify(responseData.Address));            
            setAddressById(responseData.Address);                        
        },
        shippingDetails: async(payload) => {                                                                              
            const responseData = await GNProductRepository.saveShippingAddress(payload.data); 
            console.log ("ShippingAddress: "+JSON.stringify(responseData));

            //for Dispatch
            //set when existing shipping address is selected
            //May also need to check if Billing address is unchecked
            if (payload.data.hasOwnProperty("shipping_address_id"))
                setBillingDetailsResponse(responseData);                 

            //for Dispatch
            //set when BillToTheSameAddress=true as we are not calling billingDetails call
            if (payload.data.BillToTheSameAddress == true)                            
                setBillingDetailsResponse(responseData);                                                                     
        },
        billingDetails: async(payload) => {                                          
            const responseData = await GNProductRepository.saveBillingAddress(payload.data); 
            console.log ("BillAddress: "+JSON.stringify(responseData));
            
            setBillingDetailsResponse(responseData);                  
        },

        getShippingMethodResponse: async(payload) => {                                                      
            const responseData = await GNProductRepository.saveShippingMethod(payload.data); 
            console.log ("save Shipping Method: "+JSON.stringify(responseData));
            
            setShippingMeth(responseData);                  
        },

        getPaymentMethodResponse: async(payload) => {                                                      
            const responseData = await GNProductRepository.savePaymentMethod(payload.data); 
            console.log ("save Payment Method: "+JSON.stringify(responseData));
            
            setPaymentMeth(responseData);             
        },
        getPaymentInfoResponse: async() => {                                                      
            const responseData = await GNProductRepository.savePaymentInfo(); 
            console.log ("save Payment Info: "+JSON.stringify(responseData));                       
        },
        getConfirmOrderResponse: async() => {                                                      
            const responseData = await GNProductRepository.confirmOrder(); 
            console.log ("Confirm Order : "+JSON.stringify(responseData));  
            setConfirmOrderResponse(responseData);
            dispatch(setCartItems(0));
        },
        getOrderSummaryResponse: async() => {                                                      
            const responseData = await GNProductRepository.orderSummary(); 
            console.log ("OrderSummary : "+JSON.stringify(responseData));  
            
            setOrderSummaryResponse(responseData);          
        },
        getOrderHistoryResponse: async() => {  
            //Retrieving all the page responses and pushing it into a single responseArray  

            let responseArray=[];

            //After receiving the response from first page we 
            let responseData = await GNProductRepository.orderHistory(1);   //FirstPage           
            responseArray.push(JSON.parse(JSON.stringify(responseData)));
            let totalPages=0;

            if (responseData.hasOwnProperty('PagingContext'))
                totalPages=responseData.PagingContext.TotalPages;    
            
            try{
                let arr=[];
                
                //Creating an array of later pages requests
                for (let i=2;i<=totalPages;i++)
                {
                    arr.push(GNProductRepository.orderHistory(i));
                }

                //push the requests array into Promise.all
                const res= await Promise.all(arr);
                
                //get each page response into data as array
                const data = res.map((res) => res);
                const d=JSON.parse(JSON.stringify(data));

                // we push data array into response array
                for (let j=0;j<d.length;j++)
                {
                    responseArray.push(d[j]);
                }
                //console.log("!!!!!!!!! "+JSON.stringify(responseArray));
                setOrderHistoryResponse(responseArray); 
            }
            catch(error)
            {
                console.log(error);                
            }          
        },
        getOrderDetails: async(payload) => {                                                      
            const responseData = await GNProductRepository.orderDetails(payload.data); 
            console.log ("OrderDetails : "+JSON.stringify(responseData));  
            
            setOrderDetailsResponse(responseData);          
        },
        getPrintOrders: async(payload) => {                                                      
            const responseData = await GNProductRepository.printOrders(payload.data); 
            console.log ("PrintOrderDetails : "+JSON.stringify(responseData));  
            
            setPrintOrderDetailsResponse(responseData);          
        },
        getPrintPDFOrders: async(payload) => {                                                      
            const responseData = await GNProductRepository.printPDFOrders(payload.data); 
            console.log ("PrintPDFOrderDetails : "+responseData);  
            
            setPrintPDFOrderDetailsResponse(responseData);          
        },
    };
}
