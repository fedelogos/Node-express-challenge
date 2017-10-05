var express = require('express');
var nunjucks = require('nunjucks');
var app = express();
const endpoint = require('./querys.js') 
const idList = [220, 3634, 961, 3710, 2429, 2187];
const bestChoice = [];
let movieBySearch;
let orderBy;
let movieById;

// Setup nunjucks templating engine
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.set('port', process.env.PORT || 3000);

// Home page
app.get('/', function(req, res) {
    res.render('index.html', {
        bestChoice : bestChoice,
        orderBy: orderBy,
        movieById: movieById,
    });
});

// assets folder 
app.use(express.static(__dirname + '/assets')); 

//movie name search on the index
app.get('/movieSearch', function(req, res) {
    endpoint.getMovieBySearch(req.query.searchInput, function(response) {
        movieBySearch = response.data.data.movies;
        res.render('moviesSearch.html', {
          movieBySearch: movieBySearch,
        });
    });
});

// Kick start our server
app.listen(app.get('port'), function() {
    console.log('Server started on port', app.get('port'));
});

// Filters by search on the movie details page
app.get('/filterBySearch', function(req, res) {
  endpoint.getMovieBySearch(req.query.searchInput, function(response) {
    movieBySearch = response.data.data.movies;
    let filterBySearch = movieBySearch.filter(function(item) {
      if (req.query.sorting_item == 1) {
        if (item.title && item.title.toLowerCase().indexOf(req.query.searchInput) !== -1) {
         return item;
        }
      }
      else if (req.query.sorting_item == 2) {
        if (item.year && item.year.toString().indexOf(req.query.searchInput) !== -1) {
         return item;
        }
      } 
      else if (req.query.sorting_item == 3) {
        if (item.producer && item.producer.toLowerCase().indexOf(req.query.searchInput) !== -1) {
         return item;
        }
      } 
    });

    res.render('moviesSearch.html', {
      movieBySearch: filterBySearch,
    });
 });   
}); 

// Set the movies in the upper section of the main page
for (let i = 0; i < idList.length; i++) {
  endpoint.getMovieById(idList[i], function(response) {  
    bestChoice[i] = response.data.data.movie; 
  }); 
}  

// Brings the most recent movies in descending order
endpoint.recentMoviesOrderBy(function(response) {  
  orderBy  = response.data.data.movies;
}); 

// Search for the specific movie by ID
app.get('/:id', function(req, res) {
    endpoint.getMovieById(req.params.id, function(response) {
     res.render('movie-page-full.html', {
      movieById : response.data.data.movie,
     });
    }); 
});
