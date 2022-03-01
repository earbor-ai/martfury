import React from 'react';
import { connect } from 'react-redux';
import useEcomerce from '~/hooks/useEcomerce';
import { Result } from 'antd';
import ProductCart from '~/components/elements/products/ProductCart';

const ModuleEcomerceCartItems = ({ ecomerce, cartItems }) => {
    const { increaseQty, decreaseQty, removeItem } = useEcomerce();

    function handleRemoveItem(e, productId) {
        e.preventDefault();
        removeItem({ id: productId }, ecomerce.cartItems, 'cart');
    }
    
     function handleIncreaseItemQty(e, productId) {
        e.preventDefault();
        increaseQty({ id: productId, prodItem:cartItems}, ecomerce.cartItems);
    }

    function handleDecreaseItemQty(e, productId) {
        e.preventDefault();
        decreaseQty({ id: productId, prodItem:cartItems }, ecomerce.cartItems);
    }

    function getFinalPrice(item)
    {        
        if (item.Discounts.length>0)
        {
            return(
                <div>
                    <p style={{color: "#690",fontSize: "18px",fontWeight: "600"}}>            
                        {item.UnitPrice}                       
                    </p>   

                    <del style={{marginLeft: "10px", fontSize: "14px"}}>            
                            {item.UnitPriceWithoutDiscount}
                    </del>                
                    <small style={{marginLeft: "10px",color: "red"}}>{item.DiscountedQty}% off</small>
            </div>
            );
        }
        else
        {
            return (

                <div>
                     {item.UnitPrice}  
                </div>

            );
        }
    }

    function getFinalSubTotalPrice(item)
    {
        if (item.Discounts.length>0)
        {
            return(
                <div>
                    <p style={{color: "#17a2b8",fontSize: "18px",fontWeight: "600"}}>            
                        {item.SubTotal}                       
                    </p>   

                    <p style={{marginLeft: "10px", fontSize: "14px"}}>
                        You save: 
                        <p>
                            {item.Discount}
                        </p>
                    </p>
                   
                    {/*<del style={{marginLeft: "10px", fontSize: "14px"}}>            
                            {item.SubTotal}
                    </del>                
            <small style={{marginLeft: "10px",color: "red"}}>10% off</small>*/}
            </div>
            );
        }
        else
        {
            return (

                <div>
                     {item.SubTotal}  
                </div>

            );
        }
    }
    // View
    let cartItemsViews;
    if (cartItems && cartItems.length > 0) {
        const items = cartItems.map((item) => (
            <tr key={item.id}>
                <td>
                    <ProductCart product={item} />
                </td>                
                <td>                     
                   {getFinalPrice(item)}                                     
                </td>
                           
                <td data-label="quantity">
                    <div className="form-group--number">
                        <button
                            className="up"
                            onClick={(e) => handleIncreaseItemQty(e, item.Id)}>
                            +
                        </button>
                        <button
                            className="down"
                            onClick={(e) => handleDecreaseItemQty(e, item.Id)}>
                            -
                        </button>
                        <input
                            className="form-control"
                            type="text"
                            placeholder={item.Quantity}
                            disabled={true}
                        />
                    </div>
                </td>
                <td data-label="total">                     
                   {getFinalSubTotalPrice(item)}                                     
                </td>               
                <td>
                    <a href="#" onClick={(e) => handleRemoveItem(e, item.Id)}>
                        <i className="icon-cross"></i>                        
                    </a>
                </td>
            </tr>
        ));

        cartItemsViews = (
            <>
                <table className="table  ps-table--shopping-cart ps-table--responsive">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>{items}</tbody>
                </table>
            </>
        );
    } else {
        cartItemsViews = (
            <Result status="warning" title="No product in cart." />
        );
    }
    return <>{cartItemsViews}</>;
};

export default connect((state) => state)(ModuleEcomerceCartItems);
