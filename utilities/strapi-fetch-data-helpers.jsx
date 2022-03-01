/*
 * React template helpers
 * Author: Nouthemes
 * Developed: diaryforlife
 * */

import GNProductRepository from '~/repositories/GNProductRepository';
import CollectionRepository from '~/repositories/CollectionRepository';
import ProductRepository from '~/repositories/ProductRepository';

export async function getProductsByCollectionHelper(    
    collectionSlug,        
    pageSize = 12,
) {
    let products;    
    if (collectionSlug) {              
        switch (collectionSlug)                               
        {
            case 'deal-of-the-day' :                        
                products = await GNProductRepository.getDealOfDayCollection();                    
                break;
            case 'consumer-electronics' :                        
                products = await GNProductRepository.getProductByCategory('electronics');                    
                break;
            case 'clothings' :                        
                products = await GNProductRepository.getProductByCategory('clothing');                    
                break;           
            case 'cookinganddining' :                        
                products = await GNProductRepository.getProductByCategory('cookinganddining');                    
                break;
            case 'new-arrivals-products' :                        
                products = await GNProductRepository.getProductByCategory('cookinganddining'); //for Testing used cookinganddining category                     
                break; 
            case 'shop-best-seller-items' :                        
                products = await GNProductRepository.getProductByCategory('electronics');  //for Testing used electronics category                  
                break;  
            case 'shop-recommend-items' :                        
                products = await GNProductRepository.getProductByCategory('clothing');  //for Testing used clothing category                  
                break;          
            default :                        
                products = await CollectionRepository.getProductsByCollectionSlug(collectionSlug);                  
                break;
        }        
    } else {
        const queries = {
            _limit: pageSize,
        };        
        products = await ProductRepository.getRecords(queries);
    }

    if (products) {                
        return products;
    } else {
        return null;
    }
}

export async function getProductsByCategoriesHelper(slug, pageSize = 12) {
    let products;   
    if (slug) {        
        //products = await CollectionRepository.getProductsByCategorySlug(slug); CSD
        products = await GNProductRepository.getProductByCategory();  
    } else {
        const queries = {
            _limit: pageSize,
        };
        products = await ProductRepository.getRecords(queries);
    }

    if (products) {
        return products;
    } else {
        return null;
    }
}
