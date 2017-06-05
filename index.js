const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();

var upvote = {};
var downvote = {};

client.on('ready', () =>
{
	console.log('Ready');
});

client.on('messageReactionAdd', (messageReaction, user) => 
{
	if(user != messageReaction.message.author && !messageReaction.message.author.bot && !user.bot)
	{
		if(messageReaction.emoji.name == '⬆')
		{
			if(upvote[messageReaction.message.author.id] == null)
			{
				upvote[messageReaction.message.author.id] = 0;
			}
			upvote[messageReaction.message.author.id]++;
		}
		else if(messageReaction.emoji.name == '⬇')
		{
			if(downvote[messageReaction.message.author.id] == null)
			{
				downvote[messageReaction.message.author.id] = 0;
			}
			downvote[messageReaction.message.author.id]++;
		}
	}
});
client.on('messageReactionRemove', (messageReaction, user) => 
{
	if(user != messageReaction.message.author && !messageReaction.message.author.bot && !user.bot)
	{
		if(messageReaction.emoji.name == '⬆')
		{
			upvote[messageReaction.message.author.id]--;
		}
		else if(messageReaction.emoji.name == '⬇')
		{
			downvote[messageReaction.message.author.id]--;
		}
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
