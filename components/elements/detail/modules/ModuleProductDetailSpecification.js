import React from 'react';
import Link from 'next/link';

export function checkSkuAvailability(product){    
    if (product.Sku!=null)
    {        
        return(
            <p>
                <strong>SKU:</strong> {product.Sku}            
            </p>
        );
    }
    else{
        return ;
    }
}

export function checkTagAvailability(product){
    if (product.ProductTags.length!=0)
    {        
        return(
            <p>
            <strong> Tags: </strong>
            <span className="ps-rating">           
                {Array.apply(null, product.ProductTags).map(function(item, i){                                        
                    return (
                        <Link href="/shop">
                            <a>{item.Name}</a> 
                        </Link>
                    );                
                }, this)}                 
            </span>  
            </p>
        );
    }
    else{
        return ;
    }
}

const ModuleProductDetailSpecification = ({product}) => (
    
    <div className="ps-product__specification">
        <Link href="/page/blank">
            <a className="report">Report Abuse</a>
        </Link>
        <p>
            {checkSkuAvailability(product)}
        </p>
        <p className="categories">
            <strong> Categories:</strong>
            <Link href="/shop">
                <a>Consumer Electronics</a>
            </Link>
            <Link href="/shop">
                <a>Refrigerator</a>
            </Link>
            <Link href="/shop">
                <a>Babies & Moms</a>
            </Link>
        </p>
        <p className="tags">
            {checkTagAvailability(product)}          
        </p>
    </div>
);

export default ModuleProductDetailSpecification;
