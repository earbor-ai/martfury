import React from 'react';
import Link from 'next/link';
import Rating from '~/components/elements/Rating';
import useProduct from '~/hooks/useProduct';
import { StrapiProductPriceExpanded } from '~/utilities/product-helper';
import { baseUrl } from '~/repositories/Repository';

const ProductHorizontal = ({ product }) => {
    const { thumbnailImage, price, title } = useProduct();
    return (
        <div className="ps-product--horizontal">
            <div className="ps-product__thumbnail">
                <Link href="/product/[pid]" as={`/product/${product.id}`}>
                    {/*<a>{thumbnailImage(product)}</a>*/}
                    <img src={`${baseUrl}`+product.DefaultPictureModel.ImageUrl} height='150' />                               
                </Link>
            </div>
            <div className="ps-product__content">
                {title(product)}
                <div className="ps-product__rating">
                <Rating product={product}/>
                </div>
                {/*{price(product)}*/}
                {StrapiProductPriceExpanded(product)}                
            </div>
        </div>
    );
};

export default ProductHorizontal;
