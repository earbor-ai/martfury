import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import Rating from '../Rating';
import { StrapiProductPriceExpanded } from '~/utilities/product-helper';
import ModuleProductActions from '~/components/elements/products/modules/ModuleProductActions';
import ModuleProductProgressbar from '~/components/elements/products/modules/ModuleProductProgressbar';
import useProduct from '~/hooks/useProduct';
import ModuleProductDetailDescription from '../detail/modules/ModuleProductDetailDescription';
import { baseUrl } from '~/repositories/Repository';

const ProductDealOfDay = ({ product }) => {
    const { thumbnailImage, badge, title } = useProduct();

    return (
        <div className="ps-product ps-product--inner">
            <div className="ps-product__thumbnail">            
                {/*<Link href={`/${product.Id}`} as={`/${product.SeName}`}>                
                    <a>thumbnailImage(product.DefaultPictureModel)</a>*/}
                <Link href="/product/[pid]" as={`/product/${product.SeName}`}>
                    <a><img src={`${baseUrl}`+product.DefaultPictureModel.ImageUrl} height='150' /> </a>
                </Link>
                                
                <ModuleProductActions product={product} />                
            </div>
            <div className="ps-product__container">                                
                <div className="ps-product__content">                    
                {StrapiProductPriceExpanded(product)}                                
                    {title(product)}                                                       
                       <ModuleProductDetailDescription product={product} />
                    <div className="ps-product__rating">
                    <Rating product={product}/>
                        <span>{/*product.ratingCount*/}</span>                        
                    </div>
                    {/*<ModuleProductProgressbar product={product} />*/}
                </div>
            </div>
        </div>
    );
};

export default connect()(ProductDealOfDay);
