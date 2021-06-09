const apiKey = 'fBHO-bjrviLyq4_XYq0IUD6-CgpzGZx92ky6i4UdO7soVE2u1_HtaxTmS3lHN4mjWK_KY4TLKirLEivbIhghmZsz1ws8_Thumflwrtwzme8CWMEWh6J835BzNsO_YHYx';

const Yelp = {
    search(term, location, sortBy) {
        return fetch(`https://corsanywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
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
        }).catch(err => {
            console.log(err)
        }) 
    }
};

export default Yelp;

