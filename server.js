//reference to the express module

var express = require('express');


//express function to create an express app object

var app = express();


//variable to store the port # your server will run on
var port = 3000;


//to add the SQLite Module to your Node.js project,

var sqlite3 = require('sqlite3');

//to create a database named 'HelloExpress' to be saved in a file 'HelloExpress.db'

var db = new sqlite3.Database('HelloExpress.db')



//setting up routes to handle requests

//express app.get function to create a route for the GET  ' / ' endpoint

app.get('/',function(request,response){
	response.send('Hello,world!')
});


//creating a GET '/quotes' route and adding a SELECT statement that returns all of the quotes from the database

app.get('/quotes',function(request , response){

	//db.all is used to run a SQL SELECT statement and retrieve all resulting rows

	db.all("SELECT * FROM Quotes",function(err,rows){
		console.log("GET Quotes : The database currently contains the following: " + rows);
		response.send(rows);
	});


});

//to create a route that queries for all quotes by a specific author
app.get('/quotes/:author',function(request,response){
	db.all("SELECT * FROM Quotes WHERE Author =?",[request.params.author],function(err,rows){
		console.log("Get Request for author: "+ request.params.author);
		response.send(rows);
	});
});


//to create a route that handles the POST /quotes endpoint:
app.post('/quotes',function(request,response){
	db.run("INSERT INTO Quotes VALUES ?",req.body)
});



//express listen function to instruct the server to start listening, passing in the port variable for the port number
app.listen(port,function(){
	console.log('Express app listening on port ' + port);
});

