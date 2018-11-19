# liri-Bot - node app
ASSIGNMENT 10 - LIRI is a Language Interpretation and Recognition Interface. 
LIRI is a command line node app that takes in parameters and gives back data.
LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.

Submitted On: 11/19/2018

## Technologies: node.js, javascrpt, googleAPI, web apis

This is assignment 10: https://unc.bootcampcontent.com/UNC-Coding-Boot-Camp/UNCHILL201808FSF3/blob/master/homework/10-node/Instructions/homework_instructions.md

Inputs/Files: liri.js, liriprocess.js, README.md 
Output: log.txt + console. 


### Application Specific Details:
-----------------------------
** Possible Inputs/outputs: **

Input | Output
------------ | -------------
liri  concert-this <artist/band name here> | Content from cell 2
liri spotify-this-song '<song name here>' else defaults to "The Sign" by Ace of Base. | Content in the second column
liri movie-this '<movie name here>' else defaults to movie 'Mr. Nobody.' | Content in the second column
liri do-what-it-says (in random.txt file, one of the above commands) | Content in the second column
                  

### Outputs:
--------------
** Case 1: **
_Input: liri concert-this Justin Timberlake
Output: 

### Validations:
--------------			
			
### Features:
----------
* Used node-geocoder API to get the formatted address from the longitude and lattitudes for the concert. 
* Added data validations.
* Object oriented approach to design so that the application is scalable.
* Use of nested function callbacks to synchronize the api calls to bandsintown and geocoder.
* Read file in synchronously (blocking) so that the asynchrnous calls do not conflict between input and output file.


### Notes & Limitations:
--------------------

  



### Logic:
-------
	
### Run Instructions:
--------------
To run locally:

1) Clone or download this git repository.
2) Run index.html in your web browser. 
3) Use Add train panel to enter inputs or review existing train bulletin.
4) Delete a train.
