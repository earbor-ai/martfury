import { useState } from 'react';
import {
    getProductsByCategoriesHelper,
    getProductsByCollectionHelper,
} from '~/utilities/strapi-fetch-data-helpers';
import ProductRepository from '~/repositories/ProductRepository';

export default function useGetProducts() {   
    const [loading, setLoading] = useState(false);
    const [productItems, setProductItems] = useState(null);
    const [product, setProduct] = useState(null);

    const [collection, setCollection] = useState(null); //CSD
    return {
        loading,
        collection,
        productItems,
        product,
        setProductItems: (payload) => {
            setProductItems(payload);
        },

        setCollection: (payload) => {
            setCollection(payload);
        },

        setLoading: (payload) => {
            setLoading(payload);
        },

        getProductsByCollection: async (payload) => {                                       
            setLoading(true);
            const responseData = await getProductsByCollectionHelper(payload);                       
            if (responseData) {                      
                switch (payload)                               
                {
                    case 'deal-of-the-day' :                        
                        setProductItems(responseData['Products']);                                            
                        setCollection(responseData);               
                        break;
                    case 'consumer-electronics' :                        
                        setProductItems(responseData['Products']); 
                        setCollection(responseData);                                  
                        break;
                    case 'clothings' :                        
                        setProductItems(responseData['Products']); 
                        setCollection(responseData);                                  
                        break;
                    case 'cookinganddining' :                        
                        setProductItems(responseData['Products']);      
                        setCollection(responseData);                             
                        break;
                    case 'new-arrivals-products' :                        
                        setProductItems(responseData['Products']);      
                        setCollection(responseData);                             
                        break;
                    case 'shop-best-seller-items' :                         
                        setProductItems(responseData['Products']);      
                        setCollection(responseData);                             
                        break;
                     case 'shop-recommend-items' :                        
                        setProductItems(responseData['Products']);      
                        setCollection(responseData);                             
                        break;
                    default :                        
                        setProductItems(responseData.items);       
                        setCollection(responseData);                           
                        break;

                }               
                setTimeout(
                    function () {
                        setLoading(false);
                    }.bind(this),
                    250
                );
            }
        },

        getProductsByCategory: async (payload) => {
            setLoading(true);            
            const responseData = await getProductsByCategoriesHelper(payload);
            if (responseData) {
                setProductItems(responseData.items);
                setTimeout(
                    function () {
                        setLoading(false);
                    }.bind(this),
                    250
                );
            }
        },

        getProducts: async (payload) => {            
            setLoading(true);
            let responseData;
            if (payload) {
                responseData = await ProductRepository.getProducts(payload);                
            } else {
                const queries = {
                    _limit: 12,
                };
                responseData = await ProductRepository.getProducts(queries);
            }
            if (responseData) {
                setProductItems(responseData);
                setTimeout(
                    function () {
                        setLoading(false);
                    }.bind(this),
                    250
                );
            }
        },

        getProductById: async (payload) => {
            setLoading(true);            
            const responseData = await ProductRepository.getProductsById(
                payload
            );
            if (responseData) {
                setProduct(responseData);
                setTimeout(
                    function () {
                        setLoading(false);                        
                    }.bind(this),
                    250
                );
            }
        },
    };
}
