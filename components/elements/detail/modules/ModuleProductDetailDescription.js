import React from 'react';
import Link from 'next/link';

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
        return(<p><p> &nbsp; </p></p>) ;
    }
}

const ModuleProductDetailDescription = ({ product }) => (             
    <div className="ps-product__desc">                            
        {checkVendorAvailability(product)}            
    </div>
);

export default ModuleProductDetailDescription;
