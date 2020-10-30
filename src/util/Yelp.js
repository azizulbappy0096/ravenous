const apiKey = '1Vtimw_Pv9x3s9NKC8xURDZ3nq0DXSjGZRxJ-vOJ0a9gjZZG1wUNL0TXcjel5XEfhahNQNxCRWwlaTvo1iZOIKOLGv7it3tx2Qx0Xmnq1Eexw_vjbRQCXEx1AZoyX3Yx';

const Yelp = {
    search(term, location, sortBy) {
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
            headers: {
                Authorization: `Bearer ${apiKey}`   
            }
        }).then(response => {
            if(response.ok) {
                return response.json();
            }
            throw new Error('Request failed!');
        }, networkError => console.log(networkError.message)
        ).then(jsonResponse => {
            if(jsonResponse.businesses) {
                return jsonResponse.businesses.map(business => ({
                    id: business.id,
                    imageSrc: business.image_url,
                    name: business.name,
                    address: business.location.address1,
                    city: business.location.city,
                    state: business.location.state,
                    zipCode: business.location.zip_code,
                    category: business.categories[0].title,
                    rating: business.rating,
                    reviewCount: business.review_count,
                    isClosed: business.phone
                }));
            }
        }, failed => {
            return ({
                apology: 'We are sorry.',
                status: 'Our service is not available in that location.'
            });
        }); 
    }
};

export default Yelp;

