import React from 'react';
import Link from 'next/link';
import Rating from '~/components/elements/Rating';

export function checkVendorAvailability(prod){

    if (prod.VendorModel!=null)
    {        
        return(<p>
            Sold By:    
            <Link href="/shop">            
                <strong> {prod.VendorModel.Name}</strong>
            </Link>
        </p>);
    }
    else{
        return ;
    }
}

export function checkBrandAvailability(prod){    
    if (prod.BrandModel!=null)
    {                
       return(<p>
                    Brand:
                    <Link href="/shop">
                    <a className="ml-2 text-capitalize">{prod.BrandModel.Name}</a>
                    </Link>
                </p>);
    }
    else{
        return;
    }
}

export function formatCurrency(num) {
    if (num !== undefined) {
        return parseFloat(num)
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    } else {
    }
}

export function calculatePercentage(PriceValue,OldPrice)
{    
    // We are not getting Old Price Value, had to remove $symbol    
    OldPrice=OldPrice.substring(2,OldPrice.length);
    
    let percent=((OldPrice-PriceValue)/OldPrice)*100;    
    return parseInt(percent);
}

const ModuleDetailTopInformation = ({ product }) => {
    // Views
    console.log("KKKKKKKKKKKKKKKKKKKKKKKKK "+JSON.stringify(product));
    let priceView;
    
        priceView = (
            <p className="ps-product__price sale">            
                {/*${formatCurrency(product.ProductPrice.PriceValue)}*/}
                {product.ProductPrice.Price}
            <del className="ml-2">                
                {/*${formatCurrency(product.ProductPrice.OldPriceValue)}*/}
                {product.ProductPrice.OldPrice}
            </del>    
             
            <small>{calculatePercentage(product.ProductPrice.PriceValue,product.ProductPrice.OldPrice)}% off</small>                                                  
                        
            <div className="ps-product__desc">
                {checkVendorAvailability(product)}            
            </div>           
        </p>        
        );
    return (
        <header>
            <h1>{product.Name}</h1>
            <div className="ps-product__meta">
                   {checkBrandAvailability(product)}
                <div className="ps-product__rating">
                    {/*<Rating product={product}/>*/}
                </div>
            </div>            
            {priceView}                                                             
            <div className="ps-product__desc">                
            <p>
                {product.ShortDescription}
            </p>
        </div>
        </header>
    );
    // CSD
};

export default ModuleDetailTopInformation;
