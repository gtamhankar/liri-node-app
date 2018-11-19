// api keys hiding
// detailed markdown file used for grading
// run init -y  to create / update package.json

var dotenv = require("dotenv").config();
var Spotify = require("node-spotify-api");
var request = require("request");
var moment = require("moment");
var NodeGeocoder = require("node-geocoder");
var fs = require("fs");

const keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var jsonData;


var options = {
  provider: 'google',
 
  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: 'xxx', // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};
 
var geocoder = NodeGeocoder(options);

// Create the liriData constructor
var liriData = function() {
	
  var divider = "\n------------------------------------------------------------\n";

  // findShow takes in the name of a liriData lTask and searches the rest.bandsintown.com API with the band name or artist
  this.getConcert = function(bandArtist) {
    var URL = "https://rest.bandsintown.com/artists/" + bandArtist + "/events?app_id=codingbootcamp&date=upcoming" ;	         

    request(URL, function(err, response, body) 		{
		
	if (!err && response.statusCode === 200) 
	{
		
      // Parse the response body (string) to a JSON object
      jsonData = JSON.parse(body);
	  if (jsonData.length == 0)
	  {
		  console.log (divider + " No Events found for the artist/Band: " + bandArtist + divider);
	  }
	  else
	  {
	 
	 jsonData.forEach(function(concert){
		 var showData1 = [ divider ,
				" Artist/Band: " + bandArtist ,
				" Venue: " + concert.venue.name ,
				" City/Region: " + concert.venue.city + (" ") + concert.venue.region ,
				" Country: " + concert.venue.country ,				
				" Event Date: " +  moment(concert.datetime).format("MM/DD/YYYY")   
				].join("\n");
				
		geocoder.reverse({lat:parseFloat(concert.venue.latitude), lon:parseFloat(concert.venue.longitude)})
		.then(function(res) {
			address = res[0].formattedAddress;
			
				var showData = [
				showData1,
				" Formatted Address: " + address, 	
			  ].join("\n");
				  
				  
			// Append showData and the divider to log.txt, print showData to the console
			fs.appendFile("log.txt", showData , function(err) {
				if (err) throw err;
				console.log(showData);
			});
	    })	
		.catch(function(err) {
			console.log(err);
	  });
	 })
	 				  				
	  }// end of if
		} // end of error
    });  // end of request
  };  // end of function for getConcert   
  
  

  
  this.GetMovie = function(MovieName) {
    var URL = "http://www.omdbapi.com/?t=" + MovieName + "&y=&plot=short&apikey=trilogy" ;	         
    var TomatoRating = "";
    request(URL, function(err, response, body) {
      // Parse the response body (string) to a JSON object
      jsonData = JSON.parse(body);
	  //console.log (jsonData);
	  	
	  if (!err && response.statusCode === 200) 
	  {		
		if (jsonData.length == 0)
		{
		  console.log (divider + " No movies found for title: " + MovieName + divider);
		}
	    else
	    {	
			if(jsonData.hasOwnProperty('jsonData.Ratings[1]'))
			{
				TomatoRating = jsonData.Ratings[1].Value;
			}
			else
			{
				TomatoRating = "Not Available";
			}
				var showData = [ divider + 
				" Title: " + jsonData.Title, 	
				" Release Year: " + jsonData.Year, 	
				" IMDB Rating: " + jsonData.imdbRating, 	
				" Rotten Tomatoes Rating: " + TomatoRating, 	
				" Production Country: " + jsonData.Country, 
				" Language: " + jsonData.Language, 	
			  	" Plot: " + jsonData.Plot, 
			  	" Actors: " + jsonData.Actors ,
				" Awards: " + jsonData.Awards + divider
			  ].join("\n");
			  				 
			// Append showData and the divider to log.txt, print showData to the console
			fs.appendFile("log.txt", showData , function(err) {
				if (err) throw err;
				console.log(showData);
			});
	  }
	  }
		 
	   });  // end of request
 };  // end of function for getMovie
  

  
  this.gotoSpotify = function(songName) {
	  
	   //spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
	 
	  spotify.search({ type: 'track', query: songName, limit: 1 }, function(err, data) {
		if (err) {
			return console.log('Error occurred: ' + err);
		} 

		    if((data.hasOwnProperty('data.tracks.items[0]')) || (data.tracks.items[0] != null))
			{
				//songdata = data.tracks.items[0].Value;
				var showData = [ divider + 
				" Artist(s): " + data.tracks.items[0].artists[0].name, 	
				" Song Name: " + data.tracks.items[0].name, 	
				" Preview Link: " + data.tracks.items[0].external_urls.spotify, 	
				" Album: " + data.tracks.items[0].album.name  + divider				
			  ].join("\n");
			  
			// Append showData and the divider to log.txt, print showData to the console
			fs.appendFile("log.txt", showData , function(err) {
				if (err) throw err;
				console.log(showData);
			});
			
			}
			else
			{
				console.log( "Song/Track not found.");
			}
}); 
};  // end of function for gotoSpotify
    
  
  
	// assumption is the command is always in random,txt , hence not sending file path from liri app.
	// Read file in synchronously (blocking)
  this.getGoingFS = function() {
	 var cmdd;
	 var dflt = "";
     var contents = fs.readFileSync('random.txt', 'utf8');
		 
	console.log(contents);  
	if (contents.length > 0 )
	{
		cmdd = contents.split(" ");
		dflt = cmdd[1];
		for (var i = 2; i < cmdd.length ; i++)
		{
			dflt = dflt + " " + cmdd[i];
		}
	}
	
    
 switch (cmdd[0]) 
 {
   case "concert-this": 
	if (dflt.trim() == "")
	{
		console.log ("Please enter the band or artist name.");
		break;
	}
    this.getConcert(dflt);
	break;
	
  case "spotify-this-song": 
	if (dflt == "")
	{
	    dflt = "Ace of Base";
		console.log ("Song name not supplied.  Defaulting to 'The Sign' by Ace of Base.");
	}
	this.gotoSpotify(dflt);
	break;
	
  case "movie-this": 
  	if (dflt == "")
	{
		dflt = "Mr. Nobody";
		console.log ("Movie name not supplied.  Defaulting to Mr. Nobody!");
	}
	this.GetMovie(dflt);
	break;
	
  default:	
	console.log (divider + "Welcome to liri - NO command found in random.txt "+ divider);
	console.log ("liri concert-this <artist/band name here> ");
	console.log ("liri spotify-this-song <song name here> ");
	console.log ("liri movie-this <movie name here> ");
	console.log ("liri do-what-it-says <pls enter one of the above command in random.txt>" + divider);
	break;
 }	

	
 };  // end of function for getfromFile




  
};  // end of liridata constructor 
  

module.exports = liriData;
