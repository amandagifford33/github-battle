var axios = require('axios');/* axios is another library...*/

var id = "YOUR_CLIENT_ID";
var sec = "YOUR_SECRET_ID";
var params = "?client_id=" + id + "&client_secret=" + sec;
/*If we start to get permissions denied errors, ran out of requests to API */
function getProfile (username) {
    return axios.get('http://api.github.com/users/' + username + params)/*returns "user" object, then
    .then property fires*/
    .then(function (user) {
        return user.data;
    });
}

function getRepos (username) {
    return axios.get('https://api.github.com/users/' + username + '/repos' + params +
        '&per_page=100')
}

/*reduce function allows us to take an array an reduce it to a single value*/
function getStarCount (repos) {
    return repos.data.reduce(function (count, ) {
        return count + repo.stargazers_count;
    }, 0);
}

function calculateScore (profile, repos) {
    var followers = profile.followers;
    var totalStars = getStarCount(repos);

    return (followers * 3) + totalStars;
}

function handleError (error) {
    console.warn(error);
    return null;
}

/////////////////////////////////////
/* whoever invoked getProfile is going to get a promise returned which they can call .then on.
Instead of getting whole user object back, will get back user.data (formatted version)
getProfile('tylermcginnis')
    .then(function(data) {

    }) */
//////////////////////////////////////

    /* call axios.all : takes in an array of promises and once they are all resolved it will
    call .then function */
function getUserData (player) {
    return axios.all([
        getProfile(player), /* both of these async. called */
        getRepos(player)
        /* when both of these have resolved, call .then on an array with first item being profile
        and second item being repos */
    ]).then(function (data) {
        var profile = data[0];
        var repos = data[1];

        return {
            profile: profile,
            score: calculateScore(profile, repos)
        }
        /*return object that his a profile and a score*/
    })
}

function sortPlayers (players) {
    return players.sort(function (a,b) {
        return b.score - a.score;
    });/*will return us an array and the first player in array has higher score*/
}

module.exports = {
    battle: function (players) {
        return axios.all(players.map(getUserData))
            .then(sortPlayers)
            .catch(handleError)
        /* We want battle to return us a promise that, when it is resolved is going to have
        all of the players information */
    },
    fetchPopularRepos: function (language) {
       var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language + '&sort=stars&order=desc&type=Repositories');

       return axios.get(encodedURI) /* get request */
       .then(function (response) { /* this .then is only going to happen once it
        returns the encoded URI at the end of a cycle...'response' is a JSON 
        object, which is really just a formatted dictionary. */
        return response.data.items;
       });
    }
}

/* Dude is saying that we know an array of promises is returned because of chaining
in getUserData */