import React,{ useEffect, useState } from 'react';

import BreadCrumb from '~/components/elements/BreadCrumb';
import Payment from '~/components/partials/account/Payment';
import { connect } from 'react-redux';
import { Radio } from 'antd';
import {withRouter} from 'next/router';
import Router from "next/router";
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Newletters from '~/components/partials/commons/Newletters';
import useEcomerce from '~/hooks/useEcomerce';
import ModulePaymentOrderSummary from '~/components/partials/account/modules/ModulePaymentOrderSummary';
import Link from 'next/link';
import { baseUrl } from '~/repositories/Repository';

const PaymentPage = (props) => {
    let shippingMethodParam=props.router.query.name;    
    shippingMethodParam=shippingMethodParam.replace(/"/g,'');    

    const {shippingMeth,getShippingMethodResponse}=useEcomerce();
  
    useEffect(() => {                  
        if (shippingMeth==null)
            getShippingMethodResponse({ data: postBillingData(shippingMethodParam)}); 
            
        if (shippingMeth!=null)
            console.log(">>>!!! SHIP METH"+JSON.stringify(shippingMeth));                    
    }, [shippingMeth]);  

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
            text: 'Checkout',
            url: '/account/checkout',
        },
        {
            text: 'Payment',
        },
    ];  
    
    const [pm, setPm] = useState('Payments.CashOnDelivery');

    function handleRadioChange(e) {          
        setPm(e.target.value); 
    }

    function handleSubmit(e) {        
        e.preventDefault();
        //Router.push('/account/payment-success');

        Router.push({
            pathname: '/account/payment-success',
            query: {name: pm}
          })  
    }
        
    function postBillingData(s)
    {
        let shippingAddressRequest = {                           
        "shippingoption":s+"___Shipping.FixedRate"       
        };             
        return (shippingAddressRequest);
    }

    function test()
    {
        if (shippingMeth!=null)
        {
            let view = null;
            let PaymentMethods=shippingMeth.update_section.model.PaymentMethods; 
            //let fileName="http://localhost:16595";
            let fileName=`${baseUrl}`;

            if (PaymentMethods.length>0){
                const items = PaymentMethods.map((type, i) => ( 
                    <p>
                    <div class="col-12 method-name px-0">
                    <div className='div-brand'>
                    <div className="size-box-brand">
                        <input                            
                            type="radio"
                            name="campainTypeRadioGroup"
                            value={type.PaymentMethodSystemName}   
                            checked={pm===type.PaymentMethodSystemName}  
                            onChange={handleRadioChange}                       
                        />
                        
                         <span>&nbsp;</span>
                        <img src={`${baseUrl}`+type.LogoUrl} alt="" /> 
                        <span>&nbsp;</span>
                        <span class="custom-control-description pl-1">
                           {type.Name}
                        </span>                        
                    </div>
                </div>  
                </div>
                </p>
                ));
                view = <div className="ps-product__badges">{items}</div>; 
            }
        return view
        }
        else
        {
            return(
                <div>
                    <h3>Nil</h3>
                </div>
            );
        }
    }

    return (
        <>
            <PageContainer footer={<FooterDefault />} title="Payment">
                <div className="ps-page--simple">
                    <BreadCrumb breacrumb={breadCrumb} />
                    {/*<Payment />  */}                                   

                    <div className="ps-checkout ps-section--shopping">
            <div className="container">
                <div className="ps-section__header">
                    <h1>Payment</h1>
                </div>
                <div className="ps-section__content">
                    <div className="row">
                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                            <div className="ps-block--shipping">
                                
                            <h4>Payment Methods</h4>
            <div className="ps-block--payment-method">
                {test()}
                {/*<div className="ps-block__header">
                    <Radio.Group
                        onChange={(e) => handleChangeMethod(e)}
                        value={method}>                        
                        <Radio value={1}>                                                        
                            {shippingMeth?<div>{shippingMeth.update_section.model.PaymentMethods[0].Name}</div>:<div>Nil</div>}
                        </Radio>
                                                
                        <Radio value={2}>
                            {shippingMeth?<div>{shippingMeth.update_section.model.PaymentMethods[1].Name}</div>:<div>Nil</div>}
                        </Radio>
                    </Radio.Group>
                </div>*/}

                {/*<div className="ps-block__content">
                    {method === 1 ? (
                        <div className="ps-block__tab">
                            <div className="form-group">
                                <label>Card Number</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Card Holders</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="row">
                                <div className="col-sm-4 col-4">
                                    <div className="form-group">
                                        <label>Expiration Date (MM/YY)</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="01/21"
                                        />
                                    </div>
                                </div>
                                <div className=" col-sm-4 col-4">
                                    <div className="form-group">
                                        <label>CVV</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <button
                                    className="ps-btn ps-btn--fullwidth"
                                    onClick={(e) => handleSubmit(e)}>
                                    Submit
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="ps-block__tab">
                            <a
                                className="ps-btn"
                                href="https://www.paypal.com/"
                                target="_blank">
                                Process with Paypal
                            </a>
                        </div>
                    )}
                    </div>*/}

                            <div className="form-group">
                                <button
                                    className="ps-btn ps-btn"
                                    onClick={(e) => handleSubmit(e)}>
                                    Submit
                                </button>
                            </div>
            </div>
                                
                                <div className="ps-block__footer">
                                    <Link href="/account/shipping">
                                        <a>
                                            <i className="icon-arrow-left mr-2"></i>
                                            Return to shipping
                                        </a>
                                    </Link>
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

//export default connect()(PaymentPage);
export default withRouter(connect((state)=>state)(PaymentPage));
//export default withRouter(PaymentPage);

