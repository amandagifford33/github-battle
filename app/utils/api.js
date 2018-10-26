var axios = require('axios');/* axios is another library...*/

module.exports = {
    fetchPopularRepos: function (language) {
       var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language + '&sort=stars&order=desc&type=Repositories');

       return axios.get(encodedURI) /*get request*/
       .then(function (response) { /*this .then is only going to happen once it
        returns the encoded URI at the end of a cycle...'response' is a JSON 
        object, which is really just a formatted dictionary. */
        return response.data.items;
       });
    }
}
