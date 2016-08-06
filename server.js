var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var data = require(path.join(__dirname, '/app/data/friends.js'));
var htmlRoutes = require(path.join(__dirname, '/app/routing/html-routes.js'));
var apiRoutes = require(path.join(__dirname, '/app/routing/api-routes.js'));

//set up express app
var app = express();
var PORT = process.env.PORT || 3000;

//set up express to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

//set up static files
app.use('/static', express.static(path.join(__dirname, 'app/public')));

//DATA?////////////////
var friends = data.friends;



//ROUTES///////////////

htmlRoutes.runRoutes(app, path);
apiRoutes.runRoutes(app, path, friends);


//LISTEN/////////////
app.listen(PORT, function () {
	console.log('App listening on PORT', PORT);
});








