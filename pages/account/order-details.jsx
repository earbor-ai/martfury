import React, { useEffect, useState } from 'react';
import Router from "next/router";
import {withRouter} from 'next/router';
import { connect } from 'react-redux';
import useEcomerce from '~/hooks/useEcomerce';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Newletters from '~/components/partials/commons/Newletters';
import ProductCart from '~/components/elements/products/ProductCart';
import dateFormat from 'dateformat';

const OrderDetails = (props) => {

    let orderId=props.router.query.orderId;    
      
    const {orderDetails,getOrderDetails,printPDFOrders,getPrintPDFOrders}=useEcomerce();
  
    useEffect(() => {                  
        if (orderDetails==null)
            getOrderDetails({ data: orderId }); 
            
        if (orderDetails!=null)
           console.log(">>>!!! Order Details"+JSON.stringify(orderDetails));

           // window.print();
      }, [orderDetails]);

      function orderInfo()
      {        
        if (orderDetails!=null)
        {            
            return (
            <div>                
                <p>Order #{orderDetails.OrderNumber}</p>
                <div className="ps-block__content">
                    <div>
                        Order Code: {orderDetails.OrderCode}                    
                    </div>
                    <div>
                        Order Date: {dateFormat(orderDetails.CreatedOn, "mmmm dS, yyyy")}                    
                    </div>
                    <div>
                        Order Code: {orderDetails.OrderStatus}                    
                    </div>
                    <div>
                        Order Total: <b>{orderDetails.OrderTotal} </b>
                    </div>
                    
                </div>
            </div> 
             ); 
            
        }
        else{
            return(
                <div>
                    <h3>Nil</h3>
                </div>
            );
        }    
      }

      function BillingDetails()
      {        
        if (orderDetails!=null)
        {            
            return (
            <div>                                
                <div className="ps-block__content">
                    <div>
                        {orderDetails.BillingAddress.FirstName}  {orderDetails.BillingAddress.LastName}
                    </div>
                    <div>
                        {orderDetails.BillingAddress.Email}                   
                    </div>
                    <div>
                        {orderDetails.BillingAddress.PhoneNumber}
                    </div>
                    <div>
                        {orderDetails.BillingAddress.Company}
                    </div>
                    <div>
                        {orderDetails.BillingAddress.Address1}
                    </div>
                    <div>
                        {orderDetails.BillingAddress.Address2}
                    </div>
                    <div>
                        {orderDetails.BillingAddress.City} , {orderDetails.ShippingAddress.StateProvinceName}
                    </div>
                    <div>
                        {orderDetails.BillingAddress.CountryName}
                    </div>
                </div>
                <div>
                    <div >
                        <figcaption>
                            Payment Method
                        </figcaption>

                        <div className="ps-block__content">
                            <div>
                                Payment Method: {orderDetails.PaymentMethod}
                            </div>
                            <div>
                                Payment Status: {orderDetails.PaymentMethodStatus}
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
             ); 
            
        }
        else{
            return(
                <div>
                    <h3>Nil</h3>
                </div>
            );
        }    
      }

      function ShippingDetails()
      {        
        if (orderDetails!=null)
        {            
            return (
            <div>                
                
                <div className="ps-block__content">
                    <div>
                        {orderDetails.ShippingAddress.FirstName}  {orderDetails.ShippingAddress.LastName}
                    </div>
                    <div>
                        {orderDetails.ShippingAddress.Email}
                    </div>
                    <div>
                        {orderDetails.ShippingAddress.PhoneNumber}
                    </div>
                    <div>
                        {orderDetails.ShippingAddress.Company}
                    </div>
                    <div>
                        {orderDetails.ShippingAddress.Address1}
                    </div>
                    <div>
                        {orderDetails.ShippingAddress.Address2}
                    </div>
                    <div>
                        {orderDetails.ShippingAddress.City}, {orderDetails.ShippingAddress.StateProvinceName}
                    </div>
                    <div>
                        {orderDetails.ShippingAddress.CountryName}
                    </div>                    
                </div>
                <div>
                    <div>
                        <figcaption>
                            Shipping Method
                        </figcaption>

                        <div className="ps-block__content">
                            <div>
                                Shipping Method: {orderDetails.ShippingMethod}
                            </div>
                            <div>
                                Shipping Status: {orderDetails.ShippingStatus}
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
             ); 
            
        }
        else{
            return(
                <div>
                    <h3>Nil</h3>
                </div>
            );
        }    
      }    
      
      function displayProductsInfo()
      {
        if (orderDetails!=null)
        {             
            return (
                <>
                    <div className="ps-block--shopping-total">
                        <div className="ps-block__header">
                            <p>
                                Sub-Total: <span> {orderDetails.OrderSubtotal}</span>
                            </p>
                            <p>
                                Shipping: <span>$0.00</span>
                            </p>
                            <p>
                                Tax: <span>{orderDetails.Tax}</span>
                            </p>
                            <p>
                                Order Total: <span>{orderDetails.OrderTotal}</span>
                            </p>
                        </div>                        
                    </div>
                </>
                );
            }
            else{
                return(
                    <div>
                        <h3>Nil</h3>
                    </div>
                );
            }
      }

      function displayProducts()
      {
        let view = null;
        if (orderDetails!=null)
        {             
            let products=orderDetails.Items;             

            if (products.length>0){
                const items = products.map((item, i) => (                     
                  <>      
            <tr>                        
                <td>
                    <ProductCart product={item} />
                </td>                
                <td>   
                    <div>
                        <p style={{color: "#690",fontSize: "18px",fontWeight: "600"}}>            
                            {item.UnitPrice}                       
                        </p>   
                    </div>                                     
                </td>
                           
                <td data-label="quantity">
                    <div className="form-group--number">                         
                        {item.Quantity}     
                    </div>
                </td>

                <td data-label="total">                     
                   {item.SubTotal}                                     
                </td>                                                              
            </tr>
             </>
                ));
                {/*view = <div className="ps-product__badges">{items}</div>; */}
                view = (
                    <>
                        <table className="table  ps-table--shopping-cart ps-table--responsive">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>                                    
                                </tr>
                            </thead>
                            <tbody>{items}</tbody>
                        </table>
                    </>
                );
            }
            {/*} return view*/}
        }
            else
            {
                return(
                    <div>
                        <h3>Nil</h3>
                    </div>
                );
            }
            return <>{view}</>;
    }

    function handlePrint(e) {                
        /*if (printOrders==null)
             getPrintOrders({ data: orderId }); 
             window.print();*/
        
        Router.push({
            pathname: '/account/print-order-details',
            query: {orderId: orderId}
          }) 
    }

    function handlePdf(e) {                
        if (printPDFOrders==null)
            getPrintPDFOrders({ data: orderId }); 
    }


      return (
        <PageContainer footer={<FooterDefault />} title="Shopping Cart">
        <section className="ps-my-account ps-page--account">
            <div className="container">
                <figure className="ps-block--address">
                    <figcaption>
                        Order Information
                    </figcaption>
                </figure>
                <figure className="ps-block--address">
                <div className="form-group">
                    <button
                        className="ps-btn ps-btn--outline"
                        onClick={(e) => handlePrint(e)}>
                        Print
                    </button> 
                    <button
                        className="ps-btn ps-btn--outline"
                        onClick={(e) => handlePdf(e)}>
                        PDF Invoice
                    </button>                      
                </div>
                </figure>
                
                <div className="row">
                    <div className="col-lg-4">
                        <div className="ps-section__left">
                            <aside className="ps-widget--account-dashboard">
                                <div className="ps-widget__header">                                   
                                    <figure>                                        
                                        {orderInfo()}
                                    </figure>
                                </div>
                                {/*<div className="ps-widget__content">
                                    <ul>
                                        {accountLinks.map(link => (
                                            <li
                                                key={link.text}
                                                className={
                                                    link.active
                                                        ? 'active'
                                                        : ''
                                                }>
                                                <Link href={link.url}>
                                                    <a>
                                                        <i
                                                            className={
                                                                link.icon
                                                            }></i>
                                                        {link.text}
                                                    </a>
                                                </Link>
                                            </li>
                                        ))}
                                        <li>
                                            <Link href="/account/my-account">
                                                <a>
                                                    <i className="icon-power-switch"></i>
                                                    Logout
                                                </a>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>*/}
                            </aside>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="ps-section--account-setting">
                            <div className="ps-section__content">
                                <div className="row">

                                    <div className="col-md-6 col-12">
                                        <figure className="ps-block--address">
                                            <figcaption>
                                                Billing address
                                            </figcaption>
                                            <div className="ps-block__content">
                                                {/*<p>
                                                    You Have Not Set Up This
                                                    Type Of Address Yet.
                                                </p>
                                                <Link href="/account/edit-address">
                                                    <a>Edit</a>
                                                </Link>*/}
                                                {BillingDetails()}
                                            </div>
                                        </figure>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <figure className="ps-block--address">
                                            <figcaption>
                                                Shipping address
                                            </figcaption>
                                            <div className="ps-block__content">
                                                {/*<p>
                                                    You Have Not Set Up This
                                                    Type Of Address Yet.
                                                </p>
                                                <Link href="/account/edit-address">
                                                    <a>Edit</a>
                                                </Link>*/}
                                               {ShippingDetails()}
                                            </div>
                                        </figure>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div>
                        <figure className="ps-block--address">
                            <figcaption>
                                Product(s)
                            </figcaption>
                            <div className="ps-block__content">                       
                                {displayProducts()}                                
                            </div>                        
                        </figure>                    
                    </div>
                    <div>
                        <figure className="ps-block--address">
                            <figcaption>
                                
                            </figcaption>
                            <div className="ps-block__content">                       
                                {displayProductsInfo()}                                
                            </div>                        
                        </figure>                    
                    </div>
                </div>

               
            </div>
        </section>
        <Newletters layout="container" />
        </PageContainer>
    );
};

//export default OrderDetails;
export default withRouter(connect((state)=>state)(OrderDetails));
