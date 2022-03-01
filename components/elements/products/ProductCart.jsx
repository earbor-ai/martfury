import React from 'react';
import Link from 'next/link';
import useProduct from '~/hooks/useProduct';
import { baseUrl } from '~/repositories/Repository';

const ProductCart = ({ product }) => {
    const { thumbnailImage, title } = useProduct();
    return (
        <div className="ps-product--cart">
            <div className="ps-product__thumbnail">
                <Link href="/product/[pid]" as={`/product/${product.ProductSeName}`}>
                    {/*<a>{thumbnailImage(product)}</a>*/}                                    
                    <a><img src={`${baseUrl}`+product.Picture.ImageUrl} height='100' /> </a>
                </Link>                
            </div>
            <div className="ps-product__content">{product.ProductName}</div>
        </div>
    );
};

export default ProductCart;
