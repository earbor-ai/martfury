import React, { useEffect, useState } from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import Addresses from '~/components/partials/account/Addresses';
import PageContainer from '~/components/layouts/PageContainer';
import Newletters from '~/components/partials/commons/Newletters';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Link from 'next/link';
import { Form, Input } from 'antd';
import useEcomerce from '~/hooks/useEcomerce';
import Router from "next/router";

const MyAccountPage = () => {
    
    const {  states, getStates,addNewAddress,addNewAddressResponse } = useEcomerce();      

    const [FirstName, setFirstName] = useState("")
    const [LastName, setLastName] = useState("")
    const [EmailId, setEmailId] = useState("")
    const [Company, setCompany] = useState("")
    const [City, setCity] = useState("")
    const [StateProvinceId, setStateProvinceId] = useState("")
    const [Address1, setAddress1] = useState("")
    const [Address2, setAddress2] = useState("")
    const [ZipPostalCode, setZipPostalCode] = useState("")
    const [PhoneNo, setPhoneNo] = useState("")

    const [form] = Form.useForm();

    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Addresses',
        },
    ];

    const accountLinks = [
        {
            text: 'Account Information',
            url: '/account/user-information',
            icon: 'icon-user',
        },
        {
            text: 'Notifications',
            url: '/account/notifications',
            icon: 'icon-alarm-ringing',
        },
        {
            text: 'Invoices',
            url: '/account/invoices',
            icon: 'icon-papers',
        },
        {
            text: 'Address',
            url: '/account/addresses',
            icon: 'icon-map-marker',
            active: true,
        },
        {
            text: 'Recent Viewed Product',
            url: '/account/recent-viewed-product',
            icon: 'icon-store',
        },
        {
            text: 'Wishlist',
            url: '/account/wishlist',
            icon: 'icon-heart',
        },
    ];

    useEffect(() => {
        if (states==null) {            
            getStates({ countryCode: "61947fb5543adb022e9baf75"});               
        }                    
    }, [states]);

    function postAddressData()
    {
        let addressRequest = {
            "Address.Id":"",
            "Address.FirstName":FirstName,
            "Address.LastName":LastName,
            "Address.Email":EmailId,
            "Address.PhoneNumber":PhoneNo,
            "Address.CountryId":"61947fb5543adb022e9baf75",
            "Address.StateProvinceId":StateProvinceId,   //"61947fb5543adb022e9baf89",
            "Address.Company":Company,
            "Address.Address1":Address1,
            "Address.Address2":Address2,
            "Address.City":City,
            "Address.ZipPostalCode":ZipPostalCode            
            };       
        return (addressRequest);        
    }

    async function handleSaveSubmit () {         
        const a =  await addAddress();                
        Router.push('/account/addresses');
    }

    function addAddress()
    {
        console.log("108");
        return new Promise(resolve => {
            resolve(addNewAddress({ data: postAddressData() })); 
          });          
    }
    const countries = ['USA'] ;
    let selectCountriesOptionView;
   
    selectCountriesOptionView = countries.map((option) => (
        <option value={option} key={option}>
            {option}
        </option>
    ));

    function onChangeSetStateProvinceId(value)
    {        
        setStateProvinceId(value);
    }

    function displayStates()
    {                
        if (states!=null)            
        {   
            return (                
                    states.map((option) => (                        
                <option value={option.id} key={option}>
                    {option.name}                    
                </option>                        
            ))            
            );
        }
        else
        {
            return (                              
                <option>
                    Loading...
                </option>
            );
        }
    }

    return (
        <section className="ps-my-account ps-page--account">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="ps-section__left">
                            <aside className="ps-widget--account-dashboard">
                                <div className="ps-widget__header">
                                    <img src="/static/img/users/3.jpg" />
                                    <figure>
                                        <figcaption>Hello</figcaption>
                                        <p>username@gmail.com</p>
                                    </figure>
                                </div>
                                <div className="ps-widget__content">
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
                                </div>
                            </aside>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="ps-section--account-setting">
                            <div className="ps-section__content">                                                                                                                                                            
                                <Form 
                                    form={form}
                                    className="ps-form__billing-info"                
                                    onFinish={handleSaveSubmit}> 
                                    <div className="row">
                                    <div className="col-md-6 col-12">
                                        <figure className="ps-block--address">
                                            <figcaption>
                                                Add New Address
                                            </figcaption>
                                            <Form.Item
                                                name="FirstName"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Enter your first name!',
                                                    },
                                                ]}                                                         
                                                >
                                                <Input
                                                    className="form-control"
                                                    type="text"                                
                                                    placeholder="First Name"                                                                 
                                                    value={FirstName}
                                                    onChange={e => {setFirstName(e.target.value)}}
                                                />
                                            </Form.Item>

                                            <Form.Item
                                                name="EmailId"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Enter your EmailId!',
                                                    },
                                                ]}                                                         
                                                >
                                                <Input
                                                    className="form-control"
                                                    type="text"                                
                                                    placeholder="Email Id"                                                                 
                                                    value={EmailId}
                                                    onChange={e => {setEmailId(e.target.value)}}
                                                />
                                            </Form.Item>

                                            <div className="col-sm-14">
                                                <div className="form-group">                            
                                                        <select className="form-control">{selectCountriesOptionView}</select>                            
                                                </div>
                                            </div> 

                                            <Form.Item
                                                name="Address1"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Enter address1',
                                                    },
                                                ]}
                                                value={Address1}
                                                onChange={e => {setAddress1(e.target.value)}}
                                                >
                                                <Input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="Address1"
                                                />                                
                                            </Form.Item>

                                            <Form.Item
                                                name="townCity"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Enter Town or City',
                                                    },
                                                ]}
                                                value={City}
                                                onChange={e => {setCity(e.target.value)}}
                                                >
                                                <Input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="Town or City"
                                                />                                
                                            </Form.Item> 
                                            <Form.Item
                                                name="phoneNo"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Phone Number',
                                                    },
                                                ]}
                                                value={PhoneNo}
                                                onChange={e => {setPhoneNo(e.target.value)}}
                                                >
                                                <Input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="Phone Number"
                                                />                                
                                            </Form.Item>
                                            
                                        </figure>
                                    </div>                                    

                                    <div className="col-md-6 col-12">
                                        <figure className="ps-block--address">
                                            <figcaption>
                                                &nbsp;
                                            </figcaption>
                                            <Form.Item
                                                name="LastName"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Enter your last name!',
                                                    },
                                                ]}                                                         
                                                >
                                                <Input
                                                    className="form-control"
                                                    type="text"                                
                                                    placeholder="Last Name"                                                                 
                                                    value={LastName}
                                                    onChange={e => {setLastName(e.target.value)}}
                                                />
                                            </Form.Item>  
                                            <Form.Item
                                                name="Company"
                                                rules={[
                                                    {
                                                        required: false,
                                                        message: 'Enter company name!',
                                                    },
                                                ]}
                                                value={Company}
                                                onChange={e => {setCompany(e.target.value)}}
                                                >
                                                <Input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="Company Name"
                                                />
                                            </Form.Item>   
                                            <div className="col-sm-14">
                                                <div className="form-group">
                                                <select className="form-control" onChange={e => {onChangeSetStateProvinceId(e.target.value)}}>
                                                <option key="" value="0">Select State</option>   
                                                    {displayStates()}
                                                    </select>
                                                </div>
                                            </div> 

                                            <Form.Item
                                                name="Address2"
                                                rules={[
                                                    {
                                                        required: false,
                                                        message: 'Enter address2',
                                                    },
                                                ]}
                                                value={Address2}
                                                onChange={e => {setAddress2(e.target.value)}}
                                                >
                                                <Input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="Address2"
                                                />                                
                                            </Form.Item>

                                            <Form.Item
                                                name="ZipPostalCode"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'postcode',
                                                    },
                                                ]}
                                                value={ZipPostalCode}
                                                onChange={e => {setZipPostalCode(e.target.value)}}
                                                >
                                                <Input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="Postcode/zip code"
                                                />                                
                                            </Form.Item>

                                                                                
                                        </figure>
                                    </div>
                                    </div>
                                    <div className="ps-form__submit">                                        
                                        <div id="continueWithNewAddress" className="ps-block__footer">
                                            <button className="ps-btn">Save</button>
                                        </div>
                                    </div>  

                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MyAccountPage;
