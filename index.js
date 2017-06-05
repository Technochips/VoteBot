const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () =>
{
	console.log('Ready');
});

client.on('messageReactionAdd', (messageReaction, user) => 
{
	if(messageReaction.emoji.name == '⬆')
	{
		console.log('upvote');
		//do stuff
	}
	else if(messageReaction.emoji.name == '⬇')
	{
		console.log('downvote');
		//do stuff
	}
});
client.on('messageReactionRemove', (messageReaction, user) => 
{
	if(messageReaction.emoji.name == '⬆')
	{
		console.log('un-upvote');
		//do stuff
	}
	else if(messageReaction.emoji.name == '⬇')
	{
		console.log('un-downvote');
		//do stuff
	}
});


console.log('Reading token file...');
fs.readFile('./.token', 'utf8', function(err, data)
{
	if(err)
	{
		console.log('Something bad happened :(');
		if(err.code = 'ENOENT')
		{
			console.log('Couldn\'t read the .token file. Make sure it exists, it should contains your bot\'s token.');
		}
		return 1;
	}
	console.log('Trying to log-in...');
	client.login(data);
});
