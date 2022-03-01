import axios from 'axios';
import { baseUrl } from './Repository';

const qs = require('qs');

class GNProductRepository {           
    async getDealOfDay() {
        const headers={
            'Content-Type':'application/json',
            'X-Response-View':'Json',           
            };                                    
            const gpResponse=await axios.get(`${baseUrl}/deal-of-the-day`,{headers})
            .then((response) => {    
                var jr=response.data;                               
              return jr;
         })
         return gpResponse;
    }

    async getDealOfDayCollection() {                            
        const products=await this.getDealOfDay();  
        console.log("DEAL OF DAY"+JSON.stringify(products));               
        return products;
    } 
   
    async getProductByCategories(category) {
        const headers={
            'Content-Type':'application/json',
            'X-Response-View':'Json',           
            };            
            
            const gpResponse=await axios.get(`${baseUrl}/${category}`,{headers})
            .then((response) => {    
                var jr=response.data;                     
              return jr;
         })         
         return gpResponse;
    }
          
    async getProductByCategory(category) {                          
        const product=await this.getProductByCategories(category);
        return product;
    }  
    
     async getProductBySeName(seName) {
        const headers={
            'Content-Type':'application/json',
            'X-Response-View':'Json',           
            };
                
            const gpResponse=await axios.get(`${baseUrl}/${seName}`,{headers})
            .then((response) => {    
                var jr=response.data;                     
              return jr;
         })         
         return gpResponse;
    }

    async getProductByName(seName) {               
        const product=await this.getProductBySeName(seName);        
        return product;
    }  

    async getProductByWishlist() {
        const headers={
            'Content-Type':'application/json',
            'X-Response-View':'Json',           
            };
                    
            const gpResponse=await axios.get(`${baseUrl}/wishlist`,{headers})
            .then((response) => {    
                var jr=response.data;                     
              return jr;
         })         
         return gpResponse;
    }

    async getProductWishlist() {               
        const product=await this.getProductByWishlist();        
        return product;
    } 

    async getProductByCart() {
        const headers={
            'Content-Type':'application/json',
            'X-Response-View':'Json',            
            };
                    
            const gpResponse=await axios.get(`${baseUrl}/cart`,{headers})
            .then((response) => {    
                var jr=response.data;                     
              return jr;
         })         
         return gpResponse;
    }

    async getProductFromCart() {               
        const product=await this.getProductByCart();        
        return product;
    } 

    async addProduct2Wishlist(productId) {
        const headers={
            'Content-Type':'application/json',
            'X-Response-View':'Json',            
            };            
            
            const gpResponse=await axios.post(`${baseUrl}/addproducttocart/catalog/${productId}/2?quantity=1`,null,{headers})
            
            .then((response) => {    
                var jr=response.data;                    
              return jr;
         },(error => {
             console.log("CSD: "+error)})        
         )          
         return gpResponse;
    }

    async addProductToWishlist(productId) {               
        const product=await this.addProduct2Wishlist(productId);        
        return product;
    } 

    async addProduct2Cart(productId) {
        const headers={
            'Content-Type':'application/json',
            'X-Response-View':'Json',           
            };            
               
            const gpResponse=await axios.post(`${baseUrl}/addproducttocart/catalog/${productId}/1?quantity=1`,null,{headers})
            
            .then((response) => {    
                var jr=response.data;                    
              return jr;
         },(error => {
             console.log("CSD: "+error)})        
         )          
         return gpResponse;
    }

    async addProductToCart(productId) {               
        const product=await this.addProduct2Cart(productId);        
        return product;
    }

    async removeProductFromWL(shoppingCartId) {
        const headers={
            'Content-Type':'application/json',
            'X-Response-View':'Json',            
            };            
                          
            const gpResponse=await axios.post(`${baseUrl}/wishlist/deleteitemfromwishlist/${shoppingCartId}`,null,{headers})
            
            .then((response) => {    
                var jr=response.data;                    
              return jr;
         },(error => {
             console.log("CSD: "+error)})        
         )          
         return gpResponse;
    }

    async removeProductFromWishlist(shoppingCartId) {               
        const product=await this.removeProductFromWL(shoppingCartId);        
        return product;
    }


    async removeProductFromCartPg(shoppingCartId) {
        const headers={
            'Content-Type':'application/json',
            'X-Response-View':'Json',           
            };            
                          
            const gpResponse=await axios.post(`${baseUrl}/deletecartitem/${shoppingCartId}?shoppingcartpage=True`,null,{headers})
            
            .then((response) => {    
                var jr=response.data;                    
              return jr;
         },(error => {
             console.log("CSD: "+error)})        
         )          
         return gpResponse;
    }

    async removeProductFromCartPage(shoppingCartId) {               
        const product=await this.removeProductFromCartPg(shoppingCartId);        
        return product;
    }


    async updateCartQuantity(shoppingCartId,qty) {
        const headers={
            'Content-Type':'application/json',
            'X-Response-View':'Json',            
            };            
                          
            const gpResponse=await axios.post(`${baseUrl}/cart/updatequantity/?shoppingcartId=${shoppingCartId}&quantity=${qty}`,null,{headers})
            
            .then((response) => {    
                var jr=response.data;                    
              return jr;
         },(error => {
             console.log("CSD: "+error)})        
         )          
         return gpResponse;
    }

    async updateCartQty(shoppingCartId,qty) {               
        const product=await this.updateCartQuantity(shoppingCartId,qty);        
        return product;
    }

    async applyCouponDiscountCode(couponCode) {
        const headers={
            'Content-Type':'application/json',
            'X-Response-View':'Json',            
            };            
                          
            const gpResponse=await axios.post(`${baseUrl}/applydiscountcoupon/?discountcouponcode=${couponCode}`,null,{headers})
            
            .then((response) => {    
                var jr=response.data;                    
              return jr;
         },(error => {
             console.log("CSD: "+error)})        
         )          
         return gpResponse;
    }

    async applyCouponDiscount(couponCode) {               
        const product=await this.applyCouponDiscountCode(couponCode);        
        return product;
    }

    async getStatesByCountryCode(countryCode) {
        const headers={
            'Content-Type':'application/json',
            'X-Response-View':'Json',           
            };            
                          
            const gpResponse=await axios.post(`${baseUrl}/country/getstatesbycountryid/?countryId=${countryCode}`,null,{headers})
            
            .then((response) => {    
                var jr=response.data;                    
              return jr;
         },(error => {
             console.log("CSD: "+error)})        
         )          
         return gpResponse;
    }

    async getStatesByCountryId(countryCode) {               
        const product=await this.getStatesByCountryCode(countryCode);        
        return product;
    }

    async getAddressesForCheckout() {
        const headers={
            'Content-Type':'application/json',
            'X-Response-View':'Json',           
            };            
                          
            const gpResponse=await axios.post(`${baseUrl}/account/addresses`,null,{headers})            
            .then((response) => {    
                var jr=response.data;                    
              return jr;
         },(error => {
             console.log("CSD: "+error)})        
         )          
         return gpResponse;
    }

    async getCheckoutAddresses() {               
        const product=await this.getAddressesForCheckout();        
        return product;
    }

    async addNewAddressDetails(data) {
        const headers={
            'Content-Type':'application/x-www-form-urlencoded',
            'X-Response-View':'Json',           
            };            
                          
            const gpResponse=await axios.post(`${baseUrl}/account/addressadd`,qs.stringify(data),{headers})            
            .then((response) => {    
                var jr=response.data;                    
              return jr;
         },(error => {
             console.log("CSD: "+error)})        
         )          
         return gpResponse;
    }

    async addNewAddress(data) {               
        const product=await this.addNewAddressDetails(data);        
        return product;
    }

    async saveShippingAddressDetails(data) {
        const headers={
            'Content-Type':'application/x-www-form-urlencoded',
            'X-Response-View':'Json',                        
            };
                                                  
            const gpResponse=await axios.post(`${baseUrl}/checkout/SaveShipping/`,qs.stringify(data),{headers})
            
            .then((response) => {    
                var jr=response.data;                    
              return jr;
         },(error => {
             console.log("CSD: "+error)})        
         )          
         return gpResponse;
    }

    async saveShippingAddress(data) {               
        const product=await this.saveShippingAddressDetails(data);        
        return product;
    }

    async saveBillingAddressDetails(data) {
        const headers={
            'Content-Type':'application/x-www-form-urlencoded',
            'X-Response-View':'Json',                       
            };
                        
            const gpResponse=await axios.post(`${baseUrl}/checkout/SaveBilling`,qs.stringify(data),{headers})            
            .then((response) => {    
                var jr=response.data;                    
              return jr;
         },(error => {
             console.log("CSD: "+error)})        
         )          
         return gpResponse;
    }

    async saveBillingAddress(data) {               
        const product=await this.saveBillingAddressDetails(data);        
        return product;
    }

    async saveShippingMethodDetails(data) {
        const headers={
            'Content-Type':'application/x-www-form-urlencoded',
            'X-Response-View':'Json',                            
            };

            console.log("saveShippingMethodDetails DATA>> "+data);
                             
            const gpResponse=await axios.post(`${baseUrl}/checkout/SaveShippingMethod`,qs.stringify(data),{headers})            
            .then((response) => {    
                var jr=response.data;                    
              return jr;
         },(error => {
             console.log("CSD: "+error)})        
         )          
         return gpResponse;
    }

    async saveShippingMethod(data) {               
        const product=await this.saveShippingMethodDetails(data);        
        return product;
    }

    async savePaymentMethodDetails(data) {
        const headers={
            'Content-Type':'application/x-www-form-urlencoded',
            'X-Response-View':'Json',                             
            };                       

            const gpResponse=await axios.post(`${baseUrl}/checkout/SavePaymentMethod`,qs.stringify(data),{headers})            
            .then((response) => {    
                var jr=response.data;                    
              return jr;
         },(error => {
             console.log("CSD: "+error)})        
         )          
         return gpResponse;
    }

    async savePaymentMethod(data) {               
        const product=await this.savePaymentMethodDetails(data);        
        return product;
    }


    async savePaymentInfoDetails() {
        const headers={
            'Content-Type':'application/json',
            'X-Response-View':'Json',                         
            };
                            
            const gpResponse=await axios.post(`${baseUrl}/checkout/SavePaymentInfo`,null,{headers})            
            .then((response) => {    
                var jr=response.data;                    
              return jr;
         },(error => {
             console.log("CSD: "+error)})        
         )          
         return gpResponse;
    }

    async savePaymentInfo() {               
        const product=await this.savePaymentInfoDetails();        
        return product;
    }

    async confirmOrderDetails() {
        const headers={
            'Content-Type':'application/json',
            'X-Response-View':'Json',                            
            };
                            
            const gpResponse=await axios.post(`${baseUrl}/checkout/ConfirmOrder`,null,{headers})            
            .then((response) => {    
                var jr=response.data;                    
              return jr;
         },(error => {
             console.log("CSD: "+error)})        
         )          
         return gpResponse;
    }

    async confirmOrder() {               
        const product=await this.confirmOrderDetails();        
        return product;
    }

    async orderSummaryDetails() {
        const headers={
            'Content-Type':'application/json',
            'X-Response-View':'Json',                          
            };
           const data={"prepareAndDisplayOrderReviewData":true};
                            
            const gpResponse=await axios.post(`${baseUrl}/Component/Index?Name=OrderSummary`,data,{headers})            
            .then((response) => {    
                var jr=response.data;                    
              return jr;
         },(error => {
             console.log("CSD: "+error)})        
         )          
         return gpResponse;
    }
    async orderSummary() {               
        const product=await this.orderSummaryDetails();        
        return product;
    }

    async orderHistoryDetails(pgNo) {
        const headers={
            'Content-Type':'application/json',
            'X-Response-View':'Json',                      
            };
                                       
            const gpResponse=await axios.get(`${baseUrl}/order/history?pagenumber=${pgNo}`,{headers})            
            .then((response) => {    
                var jr=response.data;                    
              return jr;
         },(error => {
             console.log("CSD: "+error)})        
         )          
         return gpResponse;
    }
    async orderHistory(pgNo) {               
        const product=await this.orderHistoryDetails(pgNo);        
        return product;
    }

    async orderInfoDetails(orderId) {
        const headers={
            'Content-Type':'application/json',
            'X-Response-View':'Json',                         
            };
                                       
            const gpResponse=await axios.get(`${baseUrl}/orderdetails/${orderId}`,{headers})            
            .then((response) => {    
                var jr=response.data;                    
              return jr;
         },(error => {
             console.log("CSD: "+error)})        
         )          
         return gpResponse;
    }
    async orderDetails(orderId) {               
        const product=await this.orderInfoDetails(orderId);        
        return product;
    }

    async printOrderInfo(orderId) {
        const headers={
            'Content-Type':'application/json',
            'X-Response-View':'Json',                             
            };
                                       
            const gpResponse=await axios.get(`${baseUrl}/orderdetails/print/${orderId}`,{headers})            
            .then((response) => {    
                var jr=response.data;                    
              return jr;
         },(error => {
             console.log("CSD: "+error)})        
         )          
         return gpResponse;
    }
    async printOrders(orderId) {               
        const product=await this.printOrderInfo(orderId);        
        return product;
    }

    async printPDFOrderInfo(orderId) {
        const headers={                                                             
            };
                                       
            const gpResponse=await axios.get(`${baseUrl}/orderdetails/pdf/${orderId}`,{headers})            
            .then((response) => {                    
                const link = document.createElement('a');
                link.href = `${baseUrl}/orderdetails/pdf/${orderId}`;  //url;
                link.setAttribute('download', 'image.pdf');
                document.body.appendChild(link);
                link.click();                
         },(error => {
             console.log("CSD: "+error)})        
         )          
         return gpResponse;
    }
    async printPDFOrders(orderId) {               
        const product=await this.printPDFOrderInfo(orderId);        
        return product;
    }

    async getAddressDetailsById(id) {
        const headers={
            'Content-Type':'application/json',
            'X-Response-View':'Json',                      
            };
                                       
            const gpResponse=await axios.get(`${baseUrl}/account/addressedit/${id}`,{headers})            
            .then((response) => {    
                var jr=response.data;                    
              return jr;
         },(error => {
             console.log("CSD: "+error)})        
         )          
         return gpResponse;
    }
    async getAddressById(Id) {               
        const product=await this.getAddressDetailsById(Id);        
        return product;
    }
}
export default new GNProductRepository();

