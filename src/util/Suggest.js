
export let arrray = [];

export const Suggest = {
  search(searchText) {
    return fetch('./states+cities.json'
    ).then(response => {
        if(response.ok) {
            return response.json();
        }
        throw new Error('Request failed!');
    }, networkError => console.log(networkError.message)
    ).then(jsonResponse => {
      const states =  jsonResponse;
      const city = states.map(cities => cities.cities);
      const helper = city.map(helper => helper.map(name => name.name));
    
      let name = [];
      for(let i=0; i<helper.length; i++) {
        helper[i].map(arr => {
          name.push(arr);
        })
      }
    
      let matches = name.filter(matchesCity => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return matchesCity.match(regex);
      })
      
      if(searchText.length === 0) {
        matches = [];
      }
      
       this.outputHtml(matches);
    }
    ); 
  },

  outputHtml(matches) {
    if(matches.length > 0) {
      matches.map(match => {
        arrray.push(match);
      });
    }

  }
};

Suggest.search('a');
