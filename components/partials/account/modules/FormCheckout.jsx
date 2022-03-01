import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import useEcomerce from '~/hooks/useEcomerce';
import { Form, Input } from 'antd';
import { useDispatch,connect } from 'react-redux';

// Four Case to be handled
//1. New Address
//  a. Post Only Shipping Details (Done)
//  b. Post both Shipping Details and Billing Details (Done)
// 2. Existing Shipping Address
//  a. Post Only Existing Shipping Details (Done)
//  a. Post Existing Shipping Details and New Billing Details 

// Also need to handle the state issue when existing ship address is selected

const FormCheckout = ({ ecomerce }) => { 
    const dispatch = useDispatch();               
    const { addresses, getAddresses, states, getStates, shippingDetails, billingDetails, billingDetailsResponse } = useEcomerce();      
    const [BillingChecked, setBillingChecked] = useState(true);
    //const [AddressState, setAddressState] = useState("")

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

    const [BillingFirstName, setBillingFirstName] = useState("")
    const [BillingLastName, setBillingLastName] = useState("")
    const [BillingEmailId, setBillingEmailId] = useState("")
    const [BillingCompany, setBillingCompany] = useState("")
    const [BillingCity, setBillingCity] = useState("")
    const [BillingAddress1, setBillingAddress1] = useState("")
    const [BillingAddress2, setBillingAddress2] = useState("")
    const [BillingZipPostalCode, setBillingZipPostalCode] = useState("")
    const [BillingPhoneNo, setBillingPhoneNo] = useState("")
    
    const [shippingAddressId, setShippingAddressId] = useState("")    

    const [SelectedShippingFirstName, setSelectedShippingFirstName] = useState(false);
    const [SelectedShippingLastName, setSelectedShippingLastName] = useState(false);
    const [SelectedShippingEmail, setSelectedShippingEmail] = useState(false);

    const [form] = Form.useForm();

    useEffect(() => {
        //if (states==null) {            
            getStates({ countryCode: "61947fb5543adb022e9baf75"});               
        //}        
            getAddresses();  
            //console.log("ECOMMERCE: "+JSON.stringify(ecomerce);
    }, [ecomerce]);    
    
    useEffect(() => {                         
        if (billingDetailsResponse!=null)
        {                                                  
            dispatch({type:'BILLING_ADDRESS_RESPONSE',payload:billingDetailsResponse});
                        
            Router.push({
            pathname:'/account/shipping',                                       
            });                                                
        }       
    }, [billingDetailsResponse]); 

    const countries = ['USA'] ;
           
    let selectCountriesOptionView;
   
    selectCountriesOptionView = countries.map((option) => (
        <option value={option} key={option}>
            {option}
        </option>
    ));      

    function showExistingAddress()
    {                    
        if (addresses!=null)            
        {              
            return (                
                addresses.map((option) => (                                               
                <option value={option.Id} firstname={option.FirstName} 
                    lastname={option.LastName} email={option.Email}>
                    {option.FirstName}                                      
                </option>                                
            ))            
            );
        }
        else
        {            
            return (  
                <>               
               <option>
                    No Addresses Found...!
               </option>
               </>     
            );
        }       
    }

    function onChangeShippingAddress(e)
    {          
        let value=e.target.value;        
                
        if (value=="NewAddress")        
        {
            document.getElementById('billingTab').style.display="block";

            document.getElementById('continueWithNewAddress').style.display="block";   
            document.getElementById('continueWithOutNewAddress').style.display="none";   
        }
        else
        {            
            const firstname=e.target.options[e.target.selectedIndex].getAttribute('firstname');
            const lastname=e.target.options[e.target.selectedIndex].getAttribute('lastname');
            const email=e.target.options[e.target.selectedIndex].getAttribute('email');

            setSelectedShippingFirstName(firstname);
            setSelectedShippingLastName(lastname);
            setSelectedShippingEmail(email);
            
            setShippingAddressId(value);

            form.resetFields();
            document.getElementById('billingTab').style.display="none";  

            document.getElementById('continueWithNewAddress').style.display="none";   
            document.getElementById('continueWithOutNewAddress').style.display="block";   
                     
        }
    }

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

    function postShippingData()
    { 
        let chk='';
         //When billingdetails is unchecked (ie Same as shipping address)         
         if (BillingChecked==true)  
             chk=true;
         else
             chk=false;

        let shippingAddressRequest = {
        "BillToTheSameAddress":chk,
        "ShippingNewAddress.FirstName":FirstName,
        "ShippingNewAddress.LastName":LastName,
        "ShippingNewAddress.Email":EmailId,
        "ShippingNewAddress.PhoneNumber":PhoneNo,
        "ShippingNewAddress.CountryId":"61947fb5543adb022e9baf75",
        "ShippingNewAddress.StateProvinceId":StateProvinceId,   //"61947fb5543adb022e9baf89",
        "ShippingNewAddress.Company":Company,
        "ShippingNewAddress.Address1":Address1,
        "ShippingNewAddress.Address2":Address2,
        "ShippingNewAddress.City":City,
        "ShippingNewAddress.ZipPostalCode":ZipPostalCode,   
        "PickUpInStore":false
        };       
        return (shippingAddressRequest);
    }

    function postBillingData()
    {
        let shippingAddressRequest = {   
        "BillToTheSameAddress":false,
        "BillingNewAddress.FirstName":BillingFirstName,
        "BillingNewAddress.LastName":BillingLastName,
        "BillingNewAddress.Email":BillingEmailId,
        "BillingNewAddress.PhoneNumber":BillingPhoneNo,
        "BillingNewAddress.CountryId":"61947fb5543adb022e9baf75",
        "BillingNewAddress.StateProvinceId":"61947fb5543adb022e9baf82",
        "BillingNewAddress.Company":BillingCompany,
        "BillingNewAddress.Address1":BillingAddress1,
        "BillingNewAddress.Address2":BillingAddress2,
        "BillingNewAddress.City":BillingCity,
        "BillingNewAddress.ZipPostalCode":BillingZipPostalCode, 
        "PickUpInStore":false,          
        };       
        return (shippingAddressRequest);
    }

     //Selected ShippingAddress
     function postSelectedShippingData(val)
     {        
         let shippingAddressRequest = {
             "BillToTheSameAddress":val,
             "shipping_address_id":shippingAddressId,
             "ShippingNewAddress.FirstName":SelectedShippingFirstName,
             "ShippingNewAddress.LastName":SelectedShippingLastName,
             "ShippingNewAddress.Email":SelectedShippingEmail,
             "PickUpInStore":false
         };       
         return (shippingAddressRequest);
     }

    function handleLoginSubmit () {                                      
       shippingDetails({ data: postShippingData() });
       
       //When Billing Address is selected (ie Shipping Address is different as Billing Address)
       if (BillingChecked==false)  
            billingDetails({ data: postBillingData() });           
    };  
       
    //When existing shipping address is selected
    const continueWithShippingId = e => { 
        
        //When Billing Address is unchecked
        //BillToTheSameAddress=true
        if (BillingChecked==true)            
            shippingDetails({ data: postSelectedShippingData(true) }); // The returned json is captured in billingDetailsResponse and use effect is fired    
        
        //When Billing Address is checked will dispatch from billingDetails
        //BillToTheSameAddress=false
        if (BillingChecked==false)      
        {      
            shippingDetails({ data: postSelectedShippingData(false) }); // The returned json is captured in billingDetailsResponse and use effect is fired    
            billingDetails({ data: postBillingData() });
        }
    }
      
    return (        
    <>
    <h3 className="ps-form__heading">Shipping details</h3>         
       <div className="col-sm-10">
            <div className="form-group">
                Select a shipping address from your address book or enter a new address.
                <select className="form-control" onChange={e => {onChangeShippingAddress(e)}}>                                        
                    <option key="" name="NewAddress" value="NewAddress">New Address</option>                         
                    {showExistingAddress()}                              
                </select>                                      
            </div>
        </div> 
        <Form 
            form={form}
            className="ps-form__billing-info"                
            onFinish={handleLoginSubmit}>  

            <div className="row" id="billingTab" style={{ display:'block'}}>
                <div className="col-sm-10">
                    <div className="form-group">
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
                    </div>
                </div>
                <div className="col-sm-10">
                    <div className="form-group">
                        <Form.Item
                            name="LastName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter your last name!',
                                },
                            ]}
                            value={LastName}
                            onChange={e => {setLastName(e.target.value)}}
                            >
                            <Input
                                className="form-control"
                                type="text"
                                placeholder="Last Name"
                            />
                        </Form.Item>
                    </div>
                </div>   

                <div className="col-sm-10">
                    <div className="form-group">
                        <Form.Item
                            name="emailId"
                            rules={[
                                {
                                    required: true,
                                    message: 'Email Id',
                                },
                            ]}
                            value={EmailId}
                            onChange={e => {setEmailId(e.target.value)}}
                            >
                            <Input
                                className="form-control"
                                type="text"
                                placeholder="Email Id"
                            />                                
                        </Form.Item>
                    </div>
                </div>  

                <div className="col-sm-10">
                    <div className="form-group">
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
                    </div>
                </div>                                                             

                <div className="col-sm-10">
                    <div className="form-group">                            
                            <select className="form-control">{selectCountriesOptionView}</select>                            
                    </div>
                </div>

                <div className="col-sm-10">
                    <div className="form-group">
                    <select className="form-control" onChange={e => {onChangeSetStateProvinceId(e.target.value)}}>
                    <option key="" value="0">Select State</option>   
                        {displayStates()}
                        </select>
                    </div>
                </div>  

                <div className="col-sm-10">
                    <div className="form-group">
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
                    </div>
                </div> 

                <div className="col-sm-10">
                    <div className="form-group">
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
                    </div>
                </div> 

                <div className="col-sm-10">
                    <div className="form-group">
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
                    </div>
                </div> 
                                                
                <div className="col-sm-10">
                    <div className="form-group">
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
                    </div>
                </div> 
                <div className="col-sm-10">
                    <div className="form-group">
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
                    </div>
                </div> 
                             
            </div>                            
                <div className="col-sm-10">
                    <div className="form-group">
                        <div className="ps-checkbox">
                            <input
                                className="form-control"
                                type="checkbox"
                                id="save-information"                                
                                onChange={() => setBillingChecked(!BillingChecked)}
                            />
                            <label htmlFor="save-information">
                                Bill to a different address?
                            </label>
                        </div>
                    </div>
                </div>
                       
                {CheckBilling()}                
               
                <div className="ps-form__submit">
                    <Link href="/account/cart">
                        <a>
                            <i className="icon-arrow-left mr-2"></i>
                            Return to shopping cart
                        </a>
                    </Link>
                    <div id="continueWithNewAddress" className="ps-block__footer">
                        <button className="ps-btn">Continue</button>
                    </div>
                </div>  
        </Form>

            <div id="continueWithOutNewAddress" className="ps-form__submit" style={{ display:'none'}}>
                <div className="ps-block__footer">
                    <button onClick={continueWithShippingId}  className="ps-btn">Continue</button>
                </div>
            </div>                                                                                                                                                   
    </>                 
    );
                 
    function CheckBilling()
    {                    
        if (BillingChecked==false)
        {
            return (
                <>
                <h3 className="ps-form__heading">Billing details</h3>   
                <div className="col-sm-10">
                    <div className="form-group">
                        <Form.Item
                            name="BillingFirstName"
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
                                
                                value={BillingFirstName}
                                onChange={e => {setBillingFirstName(e.target.value)}}
                            />
                        </Form.Item>
                    </div>
                </div>  
                <div className="col-sm-10">
                    <div className="form-group">
                        <Form.Item
                            name="BillingLastName"
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
                                
                                value={BillingLastName}
                                onChange={e => {setBillingLastName(e.target.value)}}
                            />
                        </Form.Item>
                    </div>
                </div> 

                <div className="col-sm-10">
                    <div className="form-group">
                        <Form.Item
                            name="BillingEmailId"
                            rules={[
                                {
                                    required: true,
                                    message: 'Email Id',
                                },
                            ]}
                            value={BillingEmailId}
                            onChange={e => {setBillingEmailId(e.target.value)}}
                            >
                            <Input
                                className="form-control"
                                type="text"
                                placeholder="Email Id"
                            />                                
                        </Form.Item>
                    </div>
                </div>  

                <div className="col-sm-10">
                    <div className="form-group">
                        <Form.Item
                            name="BillingCompany"
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter company!',
                                },
                            ]}
                           
                            >
                            <Input
                                className="form-control"
                                type="text"
                                placeholder="Company" 
                                
                                value={BillingCompany}
                                onChange={e => {setBillingCompany(e.target.value)}}
                            />
                        </Form.Item>
                    </div>
                </div>
                <div className="col-sm-10">
                    <div className="form-group">                            
                        <select className="form-control">{selectCountriesOptionView}</select>                            
                    </div>
                </div>
                <div className="col-sm-10">
                    <div className="form-group">
                    <select className="form-control">
                        {displayStates()}
                        </select>
                    </div>
                </div>  

                <div className="col-sm-10">
                    <div className="form-group">
                        <Form.Item
                            name="BillingCity"
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter Town or City',
                                },
                            ]}
                            value={BillingCity}
                            onChange={e => {setBillingCity(e.target.value)}}
                            >
                            <Input
                                className="form-control"
                                type="text"
                                placeholder="Town or City"
                            />                                
                        </Form.Item>
                    </div>
                </div> 

                <div className="col-sm-10">
                    <div className="form-group">
                        <Form.Item
                            name="BillingAddress1"
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter address1!',
                                },
                            ]}
                           
                            >
                            <Input
                                className="form-control"
                                type="text"
                                placeholder="Address 1" 
                                
                                value={BillingAddress1}
                                onChange={e => {setBillingAddress1(e.target.value)}}
                            />
                        </Form.Item>
                    </div>
                </div>

                <div className="col-sm-10">
                    <div className="form-group">
                        <Form.Item
                            name="Address2"
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter address2!',
                                },
                            ]}
                           
                            >
                            <Input
                                className="form-control"
                                type="text"
                                placeholder="Address2"                                 
                                value={BillingAddress2}
                                onChange={e => {setBillingAddress2(e.target.value)}}
                            />
                        </Form.Item>
                    </div>
                </div>                

                <div className="col-sm-10">
                    <div className="form-group">
                        <Form.Item
                            name="BillingZipPostalCode"
                            rules={[
                                {
                                    required: true,
                                    message: 'postcode',
                                },
                            ]}
                            value={BillingZipPostalCode}
                            onChange={e => {setBillingZipPostalCode(e.target.value)}}
                            >
                            <Input
                                className="form-control"
                                type="text"
                                placeholder="Postcode/zip code"
                            />                                
                        </Form.Item>
                    </div>
                </div> 
                <div className="col-sm-10">
                    <div className="form-group">
                        <Form.Item
                            name="BillingPhoneNo"
                            rules={[
                                {
                                    required: true,
                                    message: 'Phone Number',
                                },
                            ]}
                            value={BillingPhoneNo}
                            onChange={e => {setBillingPhoneNo(e.target.value)}}
                            >
                            <Input
                                className="form-control"
                                type="text"
                                placeholder="Phone Number"
                            />                                
                        </Form.Item>
                    </div>
                </div>                  
                </>                             
            );
        }
        else
        {
            return (<div></div>);
        }
    }        
}

export default connect((state)=>state)(FormCheckout);
