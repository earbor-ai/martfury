import React from 'react';

const Rating = ({ product }) => {    
    if (typeof product == 'undefined' )        
        return null;
    
    let filledStarCount='';

    //console.log("ROM:--- "+product.ReviewOverviewModel+" PROM ---"+product.ProductReviewOverview);

    /*if (product.ReviewOverviewModel == 'undefined')
    {
        filledStarCount=product.ProductReviewOverview.RatingSum;
    }

    if (product.ProductReviewOverview == 'undefined')*/
    {
        filledStarCount=product.ReviewOverviewModel.RatingSum;
        
    }
    
    let emptyStarCount=5-filledStarCount;
    return (                
        <span className="ps-rating">           
           {Array.apply(null, Array(filledStarCount)).map(function(item, i){                                        
                    return (
                        <i className="fa fa-star"></i>
                    );                
                }, this)} 

            {Array.apply(null, Array(emptyStarCount)).map(function(item, i){                                        
                    return (
                        <i className="fa fa-star-o"></i>
                    );                
                }, this)}         

        <span>({product.ReviewOverviewModel.TotalReviews} Reviews)</span>
        </span>
    );    
}

export default Rating;