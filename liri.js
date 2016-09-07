var inquirer = require('inquirer');
var fs = require('fs');

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

function movieThis(){
	var request = require('request');
	var myMovie = new request;

	inquirer.prompt([
	{
		name: 'movie',
		message: 'Pick a movie',
		type: 'input'
	}
	]).then(function(user){
		//console.log(user.choice);
		var queryURL = 'http://www.omdbapi.com/?t=' + user.choice + '&y=plot=short&r=json&tomatoes=true';

		request(queryURL, function(error, data, body){
			console.log('Title: ', JSON.parse(body).Title);
			console.log('Release Date: ', JSON.parse(body).Released);
			console.log('Plot: ', JSON.parse(body).Plot);
			console.log('Country: ', JSON.parse(body).Country);
			console.log('Language: ', JSON.parse(body).Language);
			console.log('Actors: ', JSON.parse(body).Actors);
			console.log('Tomato Rating: ', JSON.parse(body).tomatoRating);
			console.log('Tomato URL: ', JSON.parse(body).tomatoURL);
		})
	}
}