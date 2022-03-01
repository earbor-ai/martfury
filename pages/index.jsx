import React from 'react';
import axios from "axios";
import SiteFeatures from '~/components/partials/homepage/home-default/SiteFeatures';
import HomeAdsColumns from '~/components/partials/homepage/home-default/HomeAdsColumns';
import HomeAds from '~/components/partials/homepage/home-default/HomeAds';
import DownLoadApp from '~/components/partials/commons/DownLoadApp';
import NewArrivals from '~/components/partials/homepage/home-default/NewArrivals';
import Newletters from '~/components/partials/commons/Newletters';
import HomeDefaultDealOfDay from '~/components/partials/homepage/home-default/HomeDefaultDealOfDay';
import HomeDefaultTopCategories from '~/components/partials/homepage/home-default/HomeDefaultTopCategories';
import HomeDefaultProductListing from '~/components/partials/homepage/home-default/HomeDefaultProductListing';
import HomeDefaultBanner from '~/components/partials/homepage/home-default/HomeDefaultBanner';
import PageContainer from '~/components/layouts/PageContainer';
import { baseUrl } from 'repositories/Repository';

class HomepageDefaultPage extends React.Component {                        
    constructor(props) { 
        super(props);    
        this.state = {
           
        };           
    }
    componentDidMount() {  
        if (!axios.defaults.headers.common['GNUser'])                                      
            this.loadData();
        else
        {
            if (axios.defaults.headers.common['GNUser']=='registered') {
                this.setState({
                    data: true
                });
            }
        }
    }
   
    async loadData() {         
        const headers={'Content-Type':'application/json' };             
        
        const gatResponse=await axios.post(`${baseUrl}/tokenweb/guest`,null,{headers})
        .then((response) => {  
            var jr=response.data;  
            //https://daveceddia.com/access-redux-store-outside-react/ 
            axios.defaults.headers.common['Authorization'] =`Bearer `+jr['AccessToken'];   
            axios.defaults.headers.common['GNUser'] ='guest';   
            
            return jr['AccessToken'];                    
        })
        this.setState({
            data: gatResponse
        });               
    }

    render()
    {     
        if (!this.state.data) {
            return (
                <h3>Loading...</h3>            
            );
        }
        return(
            <PageContainer title="Multipurpose Marketplace React Ecommerce Template">
            <main id="homepage-1">
                <HomeDefaultBanner />
                <SiteFeatures />
                <HomeDefaultDealOfDay collectionSlug="deal-of-the-day" />
                <HomeAdsColumns />
                <HomeDefaultTopCategories />

                <HomeDefaultProductListing
                    collectionSlug="consumer-electronics"
                    title="Consumer Electronics"
                />
                <HomeDefaultProductListing
                    collectionSlug="clothings"
                    title="Clothings"
                />
                <HomeDefaultProductListing
                    collectionSlug="cookinganddining"
                    title="Cooking And Dining"
                />
                <HomeAds />
                <DownLoadApp />
                <NewArrivals collectionSlug="new-arrivals-products" />
                <Newletters />
            </main>
        </PageContainer>
        );
    }  
}
export default HomepageDefaultPage;
//export default connect((state)=>state)(HomepageDefaultPage);
