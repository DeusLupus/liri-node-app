var inquirer = require('inquirer');
var fs = require('fs');
var request = require('request');

inquirer.prompt([  //take in the following commands(choices)
	{
		type: 'rawlist',
		name: 'choice',
		message: 'Please choose from one of these',
		choices: ['Twitter', 'Spotify', 'Movies', 'Random']
	}
]).then(function(user){
	console.log(user.choice);
	if(user.choice == 'Twitter'){
		mytweets();
	}
	else if (user.choice == 'Spotify'){
		console.log(user.choice);
		spotify();
	}
})

function mytweets(){
	//console.log('we get tweets!')
	var Key = require('./keys.js');
	var Twitter = require('twitter');
	var params = {screen_name: deuslupus};
	var client = new Twitter(Key.twitterKeys);
	client.get('statuses/user_timeline', params, function(error, tweets, response){
		if (error){
			console.log(error);
		}
		console.log(tweets);
		tweets.forEach(function(tweet){
			console.log(tweet.created_at+": "+ tweet.text);
		})
	});
}

function spotify(){
	var SpotifyWebApi = require('spotify-web-api-node');
	var spotify = new SpotifyWebApi();
	inquirer.prompt([
		{
			name: 'song',
			message: 'Pick a song',
			type: 'input',
			default: 'The Sign'
		}
	]).then(function(user){
		//console.log(user.song);
		spotify.searchTracks('track: '+ user.song, {limit: 5}).then(function(data){
			var results = data.body.tracks.items;
			results.forEach(function(song) {
                console.log("===============================================================================");
                 console.log("Artist(s):", getArtists(song.artists));            
                console.log("Song name:", song.name);
                console.log("Preview link:", song.album.external_urls.spotify);
                console.log("Album:", song.album.name);
            });
            console.log("===============================================================================");
			function getArtists(artists) {
		    var artistArray = [];
		    artists.forEach(function(artist) { 
		        artistArray.push(artist.name);
		    });
		    return artistArray.join(", ");
			}
		})
	})
}