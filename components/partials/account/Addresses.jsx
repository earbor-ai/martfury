import React, { useEffect} from 'react';
import useEcomerce from '~/hooks/useEcomerce';
import Link from 'next/link';
import Router from "next/router";

const Addresses = () => {
    const { addresses, getAddresses } = useEcomerce();
    
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
        if (addresses==null)                                 
            getAddresses();                  
    }, [addresses]); 

    function showNameEmail()
    {                    
        if (addresses!=null)            
        {              
            return (                
                addresses.map((item) => (   
                    <div>
                        <h4>{item.FirstName}</h4>                                                                                         
                        <h4>{item.LastName}</h4>
                        <div>{item.Email}</div>  
                        <div>&nbsp;</div>                                                                                         
                        <div>&nbsp;</div>
                        <div>&nbsp;</div>                        
                        <div>&nbsp;</div>                                                                        
                        <p></p>
                    </div>                                                                                         
            ))            
            );
        }
    }
        
    function showExistingAddress()
    {                    
        if (addresses!=null)            
        {              
            return (                
                addresses.map((item) => (   
                    <div>
                        <div><b>Phone number:</b> {item.PhoneNumber}</div>                                                                                         
                        <div>{item.Address1}</div>
                        <div>{item.Address2}</div>
                        <div>{item.City}</div>
                        <div>{item.StateProvinceName}</div>
                        <div>{item.CountryName}</div>    

                        {/*components\partials\account\modules\FormEditAddress.jsx
                        <Link href="./components/partials/account/modules/FormEditAddress/" as ={`/components/partials/account/modules/FormEditAddress/${item.Id}`}>*/}
                        <Link href="/account/edit-address" as ={`/account/edit-address/${item.Id}`}>                       
                            <a>Edit</a>
                        </Link>                        
                        <p></p>
                    </div>                                                                                         
            ))            
            );
        }
    }

    const addNew = e => {         
        Router.push({
            pathname: '/account/addnewaddress'        
          }) 
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
                            <button onClick={addNew} className="ps-btn">Add new</button>                                                                                                   
                                <hr/>
                                <div className="row">
                                    <div className="col-md-6 col-12">
                                        <figure className="ps-block--address">
                                            <figcaption>
                                                Name
                                            </figcaption>
                                            <div className="ps-block__content">                                               
                                                {showNameEmail()}                                                                                                                                               
                                            </div>
                                        </figure>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <figure className="ps-block--address">
                                            <figcaption>
                                                Address
                                            </figcaption>
                                            <div className="ps-block__content">                                               
                                                {showExistingAddress()}                                                
                                            </div>
                                        </figure>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Addresses;
