const axios = require('axios');

module.exports =
{
	recentMoviesOrderBy: function(cb)
	  {
	    axios.get('https://yts.ag/api/v2/list_movies.json?limit=20&with_images=true&sort_by=year&order_by=desc')
	    .then(function(response)
	    {
	      cb(response);
	    })
	    .catch(function (error) {
	      console.log(error);
	    });
	  },

	getMovieById: function(id ,cb)
	  {
	    axios.get('https://yts.ag/api/v2/movie_details.json?with_images=true&with_cast=true&movie_id=' + id)
	    .then(function(response)
	    {
	      cb(response);
	    })
	    .catch(function (error) {
	      console.log(error);
	    });
	  },

	getMovieBySearch: function(term, cb)
	  {
	    axios.get('https://yts.ag/api/v2/list_movies.json?query_term=' + term)
	    .then(function(response)
	    {
	      cb(response);
	    })
	    .catch(function (error) {
	      console.log(error);
	    });
	  }, 
}