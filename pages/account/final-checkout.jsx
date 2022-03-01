import React,{ useEffect } from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Newletters from '~/components/partials/commons/Newletters';
import Link from 'next/link';
import {withRouter} from 'next/router';
import useEcomerce from '~/hooks/useEcomerce';
import { connect } from 'react-redux';

const FinalCheckoutPage = () => {

    //let paymentMethodParam=props.router.query.name;    
    //paymentMethodParam=paymentMethodParam.replace(/"/g,''); 
    //console.log(paymentMethodParam);

    const {confirmOrder,getConfirmOrderResponse}=useEcomerce();
  
    useEffect(() => {                  
        if (confirmOrder==null)
        getConfirmOrderResponse(); 
            
        if (confirmOrder!=null)
            console.log(">>>!!!"+JSON.stringify(confirmOrder));                    
    }, [confirmOrder]);  

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
            text: 'Checkout Success',
        },
    ];    
    
    return (
        <>
            <PageContainer footer={<FooterDefault />} title="Payment">
                <div className="ps-page--simple">
                    <BreadCrumb breacrumb={breadCrumb} />
                    <div className="ps-checkout ps-section--shopping">
                        <div className="container">
                            <div className="ps-section__header">
                                <h1>Checkout complete</h1>
                            </div>
                            <div className="ps-section__content">
                                <div className="row">
                                    <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                                        <div className="ps-block--payment-success">
                                            <div className="ps-block__content">
                                            <h3>
                                                    Thank you! Your order is
                                                    processing.
                                                </h3>
                                                <p>
                                                    Your order number is{' '}                                                    
                                                    {confirmOrder?<strong>{confirmOrder.orderNo}</strong>:<strong>Nil</strong>}
                                                </p>
                                                <p>
                                                    An email will be sent
                                                    containing information about
                                                    your purchase. If you have
                                                    any questions about your
                                                    purchase, email us at{' '}
                                                    <a
                                                        href="mailto@contact@martfury.com"
                                                        className="ps-highlight">
                                                        <strong>
                                                            contact@martfury.com
                                                        </strong>
                                                    </a>
                                                </p>                                                                                              
                                            </div>
                                            <div className="ps-block__bottom">
                                                <Link href="/">
                                                    <a className="ps-btn">
                                                        <i className="icon-arrow-left mr-2"></i>
                                                        Continue Shopping
                                                    </a>
                                                </Link>                                                                                                                                                                                          
                                            </div>
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
export default withRouter(connect((state)=>state)(FinalCheckoutPage));
