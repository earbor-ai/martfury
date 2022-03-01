import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import useEcomerce from '~/hooks/useEcomerce';
import ProductCart from '~/components/elements/products/ProductCart';

const Wishlist = ({ ecomerce }) => {
    const { loading, products, getProducts } = useEcomerce();
    const { addItem, removeItem } = useEcomerce();

    function handleAddItemToCart(e, product) {        
        e.preventDefault();
        console.log("----- "+JSON.stringify(product));
        addItem({ id: product.ProductId, quantity: 1, shoppingCartId:product.Id }, ecomerce.cartItems, 'cart',true);
    }

    function handleRemoveWishlistItem(e, product) {
        e.preventDefault();        
        removeItem(product, ecomerce.wishlistItems, 'wishlist');
    }

    useEffect(() => {                       
        if (ecomerce.wishlistItems) {                        
            //alert ("USE EFFECT 22");
            getProducts(ecomerce.wishlistItems);
        }
    }, [ecomerce]);

    // views
    let wishlistItemsView;
        
    //alert ("29 "+JSON.stringify(products));
    if (products!=null)
    {         
        if (products.Items!=null)
        {         
           // console.log ("WISHLIST 35 "+JSON.stringify(products)+"---");
            if (products.Items && products.Items.length > 0) 
            {
                //alert ("38");
                wishlistItemsView = (
                    <div className="table-responsive">
                        <table className="table ps-table--whishlist">
                            <thead>
                                <tr>
                                    <th>  </th>                            
                                    <th>Product name</th>
                                    <th>Unit Price</th>
                                    <th>Qty</th>
                                    <th></th>
                                </tr>                        
                            </thead>

                            <tbody>
                            {products.Items.map((product) => (
                                    <tr key={product.ProductId}>
                                        <td>
                                            <a
                                                href="/product/[pid]"
                                                onClick={(e) =>
                                                    handleRemoveWishlistItem(e, product)
                                                }>
                                                <i className="icon-cross"></i>
                                            </a>
                                        </td>

                                        <td>
                                            <ProductCart product={product} />
                                        </td>
                                        <td className="price">{product.UnitPrice}</td>
                                        <td>{product.Quantity}</td>                                
                                        <td>
                                            <a
                                                className="ps-btn"
                                                href=""
                                                onClick={                                                        
                                                        (e) => handleAddItemToCart(e, product)                                                        
                                                        }                                                        
                                                        >
                                                Add to cart
                                            </a>
                                        </td>
                                    </tr>   
                            ))}
                            </tbody>                    
                        </table>
                    </div>
                );
            } else {                   
                //if (!loading)
                 {
                    wishlistItemsView = (
                        <div className="alert alert-danger" role="alert">
                            Wishlist is empty!
                        </div>
                    );
                }
            }
        }
        else
        {    
            wishlistItemsView = (
                <div className="alert alert-danger" role="alert">
                    Wishlist is empty1111!
                </div>
            );    
        }
    }
    else
        {    
            wishlistItemsView = (
                <div className="alert alert-danger" role="alert">
                    Wishlist is empty222!
                </div>
            );    
        }

    return (
        <div className="ps-section--shopping ps-whishlist">
            <div className="container">
                <div className="ps-section__header">
                    <h1>Wishlist</h1>
                </div>
                <div className="ps-section__content">{wishlistItemsView}</div>
            </div>
        </div>
    );
};
export default connect((state) => state)(Wishlist);
