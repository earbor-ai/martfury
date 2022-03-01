import React, { useEffect, useState } from 'react';
import useEcomerce from '~/hooks/useEcomerce';
import { Form, Input } from 'antd';

const FormEditAddress = () => {
    const { addressById, getAddressById } = useEcomerce();
        
    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [EmailId, setEmailId] = useState("")
    const [Company, setCompany] = useState("")
    const [City, setCity] = useState("")
    const [StateProvinceId, setStateProvinceId] = useState("")
    const [Address1, setAddress1] = useState("")
    const [Address2, setAddress2] = useState("")
    const [ZipPostalCode, setZipPostalCode] = useState("")
    const [PhoneNo, setPhoneNo] = useState("")
    
    const [form] = Form.useForm();

        useEffect(() => {
            if (addressById==null)                                 
                getAddressById('6218de07b154755eba28a290');
            else if (addressById!=null)  
            {
                setFirstName(addressById.FirstName);
                setLastName(addressById.LastName);
                setEmailId(addressById.Email);
            }

        }, [addressById]); 

    async function handleSaveSubmit () {         
        //const a =  await addAddress();                
        //Router.push('/account/addresses');
    }
        
    /*function addAddress()
    {
        console.log("108");
        return new Promise(resolve => {
            resolve(addNewAddress({ data: postAddressData() })); 
          });          
    }*/

    const onNumberChange = (value) => {
        setFirstName([
            {
              name: ['FirstName'],
              value: [value]
            },
          ]);
      };

    function showExistingAddress()
    {                    
        if (addressById!=null)            
        {                
            console.log("EDIT ADDRESS BY ID122>>"+JSON.stringify(addressById.FirstName));
            //setFirstName(addressById.FirstName);
            
            return (                 
                <div className="ps-section--account-setting">
                    <div className="ps-section__content">     
                       {/*/ <Form fields={FirstName,LastName} form={form} className="ps-form__billing-info" onFinish={handleSaveSubmit}> 
                            <div className="row">
                                <div className="col-md-6 col-14">                                                                    
                            <Form.Item
                            name="FirstName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter your first name!',
                                },
                            ]}                                                         
                            >
                            <input
                                className="form-control"
                                type="text"                                
                                placeholder="First Name"   
                                value= {FirstName.value}                                                                                              
                                onChange={e => {setFirstName(e.target.value)}}
                            />
                            </Form.Item>

                            <Form.Item
                            name="LastName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter your last name!',
                                },
                            ]}                                                         
                            >
                            <input
                                className="form-control"
                                type="text"                                
                                placeholder="Last Name"   
                                value= {LastName.value}                                                                                              
                                onChange={e => {setLastName(e.target.value)}}
                            />
                            </Form.Item>
                            
                            </div>
                            </div>
                        </Form> */}

        <form className="ps-form--account-setting">
            <div className="ps-form__header">
                <h3>Account Information</h3>
            </div>
            <div className="ps-form__content">
                <div className="form-group">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Username or email address"
                        value={EmailId}
                        onChange={e => {setEmailId(e.target.value)}}
                        
                    />
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="First name"
                                value={FirstName}
                                onChange={e => {setFirstName(e.target.value)}}
                            />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Last name"                                
                                value={LastName}
                                onChange={e => {setLastName(e.target.value)}}
                                required={true}
                                error="Required"
                            />
                        </div>
                    </div>

                    <div className="col-sm-6">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Phone Number"
                            />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Email Address"
                            />
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Address"
                            />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="City"
                            />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Country"
                            />
                        </div>
                    </div>
                </div>

                <div className="form-group submit">
                    <button className="ps-btn">Update profile</button>
                </div>
            </div>
        </form>
                 </div>                                                                       
            </div>                                                                       
            
            );                                                                      
        }
        else
        {
            return (                              
                <div>
                    Loading...
                </div>
            );
        }
    }

    return (     
        <div>
            <div className="ps-form__header">
                <h3>Edit address</h3>        
            </div>            
            {showExistingAddress()}                            
        </div>
        ); 

            {/*<div className="ps-form__content">
                <div className="form-group">
                    <label>
                        FirstName <sup>*</sup>
                    </label>
                    <input type="text" placeholder="" value="kkk" className="form-control"/>
                </div>
                <div className="form-group">
                    <label>
                        Lastname <sup>*</sup>
                    </label>
                    <input type="text" placeholder="" className="form-control"/>
                </div>
                <div className="form-group">
                    <label>
                        Company Name
                    </label>
                    <input type="text" placeholder="" className="form-control"/>
                </div>
                <div className="form-group">
                    <label>
                        Country <sup>*</sup>
                    </label>
                    <input type="text" placeholder="" className="form-control"/>
                </div>
                <div className="form-group">
                    <label>
                        Street Address <sup>*</sup>
                    </label>
                    <input type="text" placeholder="" className="form-control"/>
                </div>
                <div className="form-group">
                    <label>
                        State <sup>*</sup>
                    </label>
                    <input type="text" placeholder="" className="form-control"/>
                </div>
                <div className="form-group">
                    <label>
                        Postcode <sup>*</sup>
                    </label>
                    <input type="text" placeholder="" className="form-control"/>
                </div>
                <div className="form-group">
                    <label>
                        Email address <sup>*</sup>
                    </label>
                    <input type="text" placeholder="" className="form-control"/>
                </div>
                <div className="form-group submit">
                    <button className="ps-btn">Save Address</button>
                </div>
            </div>*/}        
       
}

export default FormEditAddress;
