import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import MiniCart from '~/components/shared/headers/modules/MiniCart';
import useEcomerce from '~/hooks/useEcomerce';
import AccountQuickLinks from '~/components/shared/headers/modules/AccountQuickLinks';

const HeaderActions = ({ ecomerce, auth }) => {

    const { compareItems, wishlistItems } = ecomerce;
    const { products, getProducts } = useEcomerce();

    useEffect(() => {
        getProducts(ecomerce.cartItems, '');                   
    }, [ecomerce]);

    // views
    let headerAuthView;

    //console.log("Header Actions PRODUCTS: "+JSON.stringify(products));
    
    if (auth.isLoggedIn && Boolean(auth.isLoggedIn) === true) {
        headerAuthView = <AccountQuickLinks isLoggedIn={true} />;
    } else {
        headerAuthView = <AccountQuickLinks isLoggedIn={false} />;
    }
    return (
        <div className="header__actions">
            <Link href="/account/compare">
                <a className="header__extra">
                    <i className="icon-chart-bars"></i>
                    <span>
                        <i>{compareItems ? compareItems.length : 0}</i>
                    </span>
                </a>
            </Link>
            <Link href="/account/wishlist">
                <a className="header__extra">
                    <i className="icon-heart"></i>
                    <span>                                         
                        {updateWLBCount(wishlistItems,products)}                        
                    </span>
                </a>
            </Link>
            <MiniCart />
            {headerAuthView}
        </div>
    );

    function updateWLBCount(wl,p)
    {        
        if (wl.length == 0)                    
        {
            // Async call: result returns after some time
            // This is for the first load only
            if (p == null) 
            {
                return (
                    <i>0</i>
                );
            }
            else
            {
                return (
                    <i>{p.Items ? p.Items.length : 0}</i>
                );
            }
        }
        else
        {
            //This is for Add or Remove Items from wishlist
            // Uses Redux-Dispatch call as seen in UseEcommerce
            return(
                <i>{ wl ? wl.length : 0}</i>
            );
        }
    }
};

export default connect((state) => state)(HeaderActions);
