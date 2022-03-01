import React,{ useEffect } from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Newletters from '~/components/partials/commons/Newletters';
import Link from 'next/link';
import {withRouter} from 'next/router';
import Router from "next/router";
import useEcomerce from '~/hooks/useEcomerce';
import { connect } from 'react-redux';
import ModulePaymentOrderSummary from '~/components/partials/account/modules/ModulePaymentOrderSummary';

const ConfirmOrderPage = (props) => {

    const {paymentInfo,getPaymentInfoResponse,orderSummary,getOrderSummaryResponse}=useEcomerce();
  
    useEffect(() => {                  
        if (paymentInfo==null)
            getPaymentInfoResponse(); 
            
        if (paymentInfo!=null)
            console.log(">>>!!! "+JSON.stringify(paymentInfo));                    
    }, [paymentInfo]);  

    useEffect(() => {                  
        if (orderSummary==null)
            getOrderSummaryResponse(); 
            
        if (orderSummary!=null)
            console.log(">>>!!!ORDER SUMMARY  "+JSON.stringify(orderSummary));                    
    }, [orderSummary]);  

    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Shopping Cart',
            url: '/account/shopping-cart',
        },
        {
            text: 'Confirm Order',
        },
    ];

    const continueForFinalCheckout = e => {         
        Router.push({
            pathname: '/account/final-checkout'        
          }) 
    }

    function displayAddress()
    {
        //alert ("HI");
        let view = null;
        if (orderSummary!=null)
        {           
            let ord=orderSummary.OrderReviewData;
            let BillingDetails=orderSummary.OrderReviewData.BillingAddress;            
            let ShippingDetails=orderSummary.OrderReviewData.ShippingAddress;            
            const items = ( 
            <div>
            <div>
                <h3>Billing Address</h3>
                {BillingDetails.FirstName}&nbsp;{BillingDetails.LastName}
                <div>{BillingDetails.Email}</div>
                <div>{BillingDetails.PhoneNumber}</div>
                <div>{BillingDetails.Address1}</div>
                <div>{BillingDetails.Address2}</div>
                <div>{BillingDetails.StateProvinceName}</div>
                <div>{BillingDetails.CountryName}</div>
                <div>{BillingDetails.ZipPostalCode}</div>
                <div></div>
                    <div>
                        Payment Method:
                        <b>{ord.PaymentMethod}</b>
                        </div>
            </div>
            <div></div>
            <p></p>
            <div>
                <h3>Shipping Address</h3>
                {ShippingDetails.FirstName}&nbsp;{BillingDetails.LastName}
                <div>{ShippingDetails.Email}</div>
                <div>{ShippingDetails.PhoneNumber}</div>
                <div>{ShippingDetails.Address1}</div>
                <div>{ShippingDetails.Address2}</div>
                <div>{ShippingDetails.StateProvinceName}</div>
                <div>{ShippingDetails.CountryName}</div>
                <div>{ShippingDetails.ZipPostalCode}</div>
                <div></div>                
                    <div>
                        Shipping Method:
                        <b>{ord.ShippingMethod}</b>
                    </div>
            </div>

            </div>
            ); 
            view = <div className="ps-product__badges">{items}</div>;     
        }
        return view;
    }

    return (
        <>
            <PageContainer footer={<FooterDefault />} title="Confirm Order">
                <div className="ps-page--simple">
                    <BreadCrumb breacrumb={breadCrumb} />
                    <div className="ps-checkout ps-section--shopping">
                        <div className="container">
                            <div className="ps-section__header">
                                <h1>Confirm Order</h1>
                            </div>
                            <div className="ps-section__content">
                                <div className="row">
                                    <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                                        <div className="ps-block--payment-success">
                                            <div className="ps-block__content">                                              
                                                {displayAddress()}                                                                                          
                                            </div>
                                            <div className="ps-bottom">
                                                <Link href="/">
                                                    <a className="ps-btn">
                                                        <i className="icon-arrow-left mr-2"></i>
                                                        Back to shop
                                                    </a>
                                                </Link>      
                                                <label>&nbsp;</label>                                                                                      
                                                <button onClick={continueForFinalCheckout}  className="ps-btn">Confirm</button>                                                                                                   
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 ">
                                        <div className="ps-form__orders">
                                            <ModulePaymentOrderSummary />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Newletters layout="container" />
            </PageContainer>
        </>
    );
};

//export default PaymentSuccessPage;
export default withRouter(connect((state)=>state)(ConfirmOrderPage));
