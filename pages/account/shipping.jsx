import React, {useContext,useEffect,useState } from 'react'
import ModulePaymentOrderSummary from '~/components/partials/account/modules/ModulePaymentOrderSummary';
import Link from 'next/link';
import { connect } from 'react-redux';
import Router from 'next/router';
import {useNavigate} from 'react-router-dom';
import BreadCrumb from '~/components/elements/BreadCrumb';
import Shipping from '~/components/partials/account/Shipping';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Newletters from '~/components/partials/commons/Newletters';
import useEcomerce from '~/hooks/useEcomerce';

class ShippingPage extends React.Component {  
    constructor(props) {           
        super(props);   
        
        this.handleSubmit=this.handleSubmit.bind(this);
        this.updateCampaignType=this.updateCampaignType.bind(this); 
               
        this.state = {
            campaign: 'Ground',
            checked: 1
        };                                                           
    }

    handleSubmit()
    {        
        let shippingMethod=this.state.campaign;        
        Router.push({
            pathname: '/account/payment/',
            query: {name: shippingMethod}
          })         
    }
    
    updateCampaignType(e)
    {
        //alert (e.target.value);
        this.setState({campaign:e.target.value});
    } 
            
    displayShippingMethod()
    {                    
        let view = null;
        let shippingMethods=this.props.BillingAddress.update_section.model.ShippingMethods;  
                        
        if (shippingMethods.length>0){                 
            const items = shippingMethods.map((type, i) => (   
                <p>
                <div className='div-brand'>
                    <div className="size-box-brand">
                        <input                            
                            type="radio"
                            name="campainTypeRadioGroup"
                            value={type.Name}
                            checked={this.state.campaign==type.Name}
                            onChange={this.updateCampaignType}
                        />
                        <span>&nbsp;</span>
                        <label>
                           {type.Name} ({type.Fee}). {type.Description}
                        </label>
                    </div>
                </div>  
                </p>                           
            ));
            view = <div className="ps-product__badges">{items}</div>;                  
       }
       return view;
    }
      
    render()
    {                                        
        return (
            <PageContainer footer={<FooterDefault />} title="Payment">
            <div className="ps-checkout ps-section--shopping">
                <div className="container">
                    <div className="ps-section__header">
                        <h1>Shipping Information</h1>
                    </div>
                    <div className="ps-section__content">
                        <div className="row">
                            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                                <div className="ps-block--shipping">
                                    {/*<div className="ps-block__panel">
                                        <figure>
                                            <small>Contact</small>
                                            <p>test@gmail.com</p>
                                            <Link href="/account/checkout">
                                                <a>Change</a>
                                            </Link>
                                        </figure>
                                        <figure>
                                            <small>Ship to</small>
                                            <p>2015 South Street, Midland, Texas</p>
                                            <Link href="/account/checkout">
                                                <a>Change</a>
                                            </Link>
                                        </figure>
                                </div>*/}
                                    <h4>Shipping Method</h4>
                                    <p></p>
                                    <div className="ps-block__panel">
                                        <figure>
                                            {this.displayShippingMethod()}
                                        </figure>
                                    </div>
                                    <div className="ps-block__footer">
                                        <Link href="/account/checkout">
                                            <a>
                                                <i className="icon-arrow-left mr-2"></i>
                                                Return to informations
                                            </a>
                                        </Link>
                                        {/*<Link href={"/account/payment/"+this.state.campaign}>
                                            <a className="ps-btn">
                                                Continue to payment
                                            </a>
                                        </Link>*/}

                                    <div className="ps-block__footer">
                                        <button onClick={this.handleSubmit} className="ps-btn">Continue</button>
                                    </div>

                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12  ps-block--checkout-order">
                                <div className="ps-form__orders">
                                    <ModulePaymentOrderSummary shipping={true} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Newletters layout="container" />
            </PageContainer>
        );                
    }
}
const mapStateToProps = state => {
    return {
        BillingAddress: state.ecomerce.billingAddress
    }
};
export default connect(mapStateToProps)(ShippingPage);


