import React from 'react';
import Link from 'next/link';
import useProduct from '~/hooks/useProduct';
import { baseUrl } from '~/repositories/Repository';

const ProductOnCart = ({ product, children }) => {
    const { thumbnailImage, title } = useProduct();
    //console.log("Product On Cart "+JSON.stringify(product));
    return (
        <div className="ps-product--cart-mobile">
            <div className="ps-product__thumbnail">
                {/*<Link href="/product/[pid]" as={`/product/${product.id}`}>
                    <a>{thumbnailImage(product)}</a>
                </Link>*/}

                <Link href="/product/[pid]" as={`/product/${product.ProductSeName}`}>                    
                    <a><img src={`${baseUrl}`+product.Picture.ImageUrl} height='50' /> </a>
                </Link> 

            </div>
            <div className="ps-product__content">
                {product.ProductName}
                <p>
                    <small>
                        {product.UnitPrice} x {product.Quantity}
                    </small>
                </p>{' '}
                {children}
            </div>
        </div>
    );
};

export default ProductOnCart;
