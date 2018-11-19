// Program: LIRI:  Language Interpretation and Recognition Interface.
// ---------------------------------------------------------------------------------------------------------
// LIRI is command line node app that takes in parameters and gives back data.
// Input:   Examples: liri.js can take in one of the following commands://            
//          liri  concert-this <artist/band name here>
//                spotify-this-song '<song name here>' else default to "The Sign" by Ace of Base.
//                movie-this '<movie name here>' else defualt to movie 'Mr. Nobody.'
//                do-what-it-says
// ---------------------------------------------------------------------------------------------------------
// code to read and set any environment variables with the dotenv package


// global variables
var lTask= "";
var lTaskInput = "";
var liriData = require("./liriprocess");
var request = require("request");
var lData = new liriData();


// Grab search command line argument
 lTask = process.argv[2];
// Joining the remaining arguments since an actor or tv show name may contain spaces
 lTaskInput = process.argv.slice(3).join(" ");

 MappingProcess();


function MappingProcess()
{	
 switch (lTask) 
 {
   case "concert-this": 
	if (lTaskInput == "")
	{
		console.log ("Please enter the band name or artist.");
		break;
	}
	else
	{
		lData.getConcert(lTaskInput);
	}
	break;
	
  case "spotify-this-song":   
  	if (lTaskInput == "")
	{
		lTaskInput = "Ace of Base";
		console.log ("Song name not supplied.  Defaulting to 'The Sign' by Ace of Base.");
	}  
	lData.gotoSpotify(lTaskInput);
	break;
	
  case "movie-this": 
  	if (lTaskInput == "")
	{
		lTaskInput = "Mr. Nobody";
		console.log ("Movie name not supplied.  Defaulting to Mr. Nobody!");
	}
	lData.GetMovie(lTaskInput);	
	break;
	
  case "do-what-it-says": 
	lData.getGoingFS();
	break;
	
  default:
	var divider = "\n------------------------------------------------------------\n";	 
	console.log (divider + "Welcome to liri - Language Interpretation and Recognition Interface\nPlease enter one of the following commands. "+ divider);
	console.log ("liri concert-this <artist/band name here> ");
	console.log ("liri spotify-this-song <song name here> ");
	console.log ("liri movie-this <movie name here> ");
	console.log ("liri do-what-it-says <command in random.txt>" + divider);
	break;
 }
}

