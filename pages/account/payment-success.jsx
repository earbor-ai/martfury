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

const PaymentSuccessPage = (props) => {

    let paymentMethodParam=props.router.query.name;    
    //paymentMethodParam=paymentMethodParam.replace(/"/g,''); 
    console.log(paymentMethodParam);

    const {paymentMeth,getPaymentMethodResponse}=useEcomerce();
  
    useEffect(() => {                  
        if (paymentMeth==null)
         getPaymentMethodResponse({ data: postBillingData(paymentMethodParam)}); 
            
        if (paymentMeth!=null)
            console.log(">>>!!!"+JSON.stringify(paymentMeth));                    
    }, [paymentMeth]);  

    function postBillingData(s)
    {
        let shippingAddressRequest = {                           
        "paymentmethod":s      
        }; 
            
        return (shippingAddressRequest);
    }

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
            text: 'Payment Information',
        },
    ];

    const confirmOrder = e => {    
      Router.push({
        pathname: '/account/confirm-order'        
      }) 
    }
    
    return (
        <>
            <PageContainer footer={<FooterDefault />} title="Payment">
                <div className="ps-page--simple">
                    <BreadCrumb breacrumb={breadCrumb} />
                    <div className="ps-checkout ps-section--shopping">
                        <div className="container">
                            <div className="ps-section__header">
                                <h1>Payment Information</h1>
                            </div>
                            <div className="ps-section__content">
                                <div className="row">
                                    <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                                        <div className="ps-block--payment-success">
                                            <div className="ps-block__content">                                               
                                                <p>
                                                In cases where an order is placed, an authorized representative will contact you, personally or over telephone, to confirm the order.
                                                After the order is confirmed, it will be processed.
                                                Orders once confirmed, cannot be cancelled.
                                                </p>                                                
                                            </div>
                                           {/* <div className="ps-block__bottom">
                                                <Link href="/">
                                                    <a className="ps-btn">
                                                        <i className="icon-arrow-left mr-2"></i>
                                                        Back to shop
                                                    </a>
                                                </Link>                                            
                                                <div id="confirmOrder" className="ps-form__submit" >
                                                    <div className="ps-block__footer">
                                                        <button onClick={confirmOrder}  className="ps-btn">Continue</button>
                                                    </div>
                                                </div>
                                            </div>*/} 
                                            
                                            <div className="ps-bottom">
                                                <Link href="/">
                                                    <a className="ps-btn">
                                                        <i className="icon-arrow-left mr-2"></i>
                                                        Back to shop
                                                    </a>
                                                </Link> 
                                                <label>&nbsp;</label>                                                                                                                                                                                   
                                                <button  onClick={confirmOrder} className="ps-btn">Continue</button>                                                                                                     
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
export default withRouter(connect((state)=>state)(PaymentSuccessPage));
