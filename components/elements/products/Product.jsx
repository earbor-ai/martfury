import React from 'react';
import Link from 'next/link';
import ModuleProductActions from '~/components/elements/products/modules/ModuleProductActions';
import useProduct from '~/hooks/useProduct';
import Rating from '~/components/elements/Rating';
import { StrapiProductPriceExpanded } from '~/utilities/product-helper';
import { baseUrl } from '~/repositories/Repository';

const Product = ({ product }) => {
    //console.log ("Product.jsx-- "+JSON.stringify(product));
    const { thumbnailImage, price, badge, title } = useProduct();
    
    return (
        <div className="ps-product" >
            <div className="ps-product__thumbnail">
                <Link href="/product/[pid]" as={`/product/${product.SeName}`}>                    
                    <a><img src={`${baseUrl}`+product.PictureModels[0].ImageUrl} height='150' /></a>
                </Link>
                {/*<a>thumbnailImage(product)</a>*/}
                {/*badge(product) CSD*/}                
                
                <ModuleProductActions product={product} />
            </div>
            <div className="ps-product__container">
                {/*<Link href="/shop">
                    <a className="ps-product__vendor">Young Shop</a>
                </Link>*/}
                <div className="ps-product__content">                
                    {title(product)}
                    <div className="ps-product__rating">                        
                        <Rating product={product}/>                                                
                    </div>                    
                    {StrapiProductPriceExpanded(product)}                
                </div>
                <div className="ps-product__content hover">
                    {title(product)}
                    {StrapiProductPriceExpanded(product)}                
            </div>
            </div>
        </div>
    );
};

export default Product;
