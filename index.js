const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = 'vb!';

var upvote = {};
var downvote = {};

load_upvote();
load_downvote();

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
			save_upvote();
		}
		else if(messageReaction.emoji.name == '⬇')
		{
			if(downvote[messageReaction.message.author.id] == null)
			{
				downvote[messageReaction.message.author.id] = 0;
			}
			downvote[messageReaction.message.author.id]++;
			save_downvote();
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
			save_upvote();
		}
		else if(messageReaction.emoji.name == '⬇')
		{
			downvote[messageReaction.message.author.id]--;
			save_downvote();
		}
	}
});

client.on('message', message =>
{
	if(!message.author.bot)
	{
		if(message.cleanContent.startsWith(prefix + 'points'))
		{
			if(upvote[message.author.id] == null)
			{
				upvote[message.author.id] = 0;
			}
			if(downvote[message.author.id] == null)
			{
				downvote[message.author.id] = 0;
			}
			message.channel.send('You have ' + (upvote[message.author.id] - downvote[message.author.id]) + ' points.\n⬆: ' + upvote[message.author.id] + '\n⬇: ' + downvote[message.author.id]);
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

function save_upvote()
{
	var r = '';
	for(var i = 0; i < Object.keys(upvote).length; i++)
	{
		r = r + Object.keys(upvote)[i] + ',' + upvote[Object.keys(upvote)[i]] + '\n';
	}
	fs.writeFile('.upvote', r, (err) =>
	{
		if(err)
		{
			console.log('Couldn\'t save upvotes');
			return 1;
		}
	});
	return 0;
}
function save_downvote()
{
	var r = '';
	for(var i = 0; i < Object.keys(downvote).length; i++)
	{
		r = r + Object.keys(downvote)[i] + ',' + downvote[Object.keys(downvote)[i]] + '\n';
	}
	fs.writeFile('.downvote', r, (err) =>
	{
		if(err)
		{
			console.log('Couldn\'t save downvotes');
			return 1;
		}
	});
	return 0;
}
function load_upvote()
{
	upvote = {};
	fs.readFile('./.upvote', 'utf8', function(err, data)
	{
		if(err)
		{
			console.log('Couldn\'t load upvotes');
			return 1;
		}
		var sdata = data.split('\n');
		for(var i = 0; i < sdata.length; i++)
		{
			upvote[sdata[i].split(',')[0]] = sdata[i].split(',')[1];
		}
	});
	return 0;
}
function load_downvote()
{
	downvote = {};
	fs.readFile('./.downvote', 'utf8', function(err, data)
	{
		if(err)
		{
			console.log('Couldn\'t load downvotes');
			return 1;
		}
		var sdata = data.split('\n');
		for(var i = 0; i < sdata.length; i++)
		{
			downvote[sdata[i].split(',')[0]] = sdata[i].split(',')[1];
		}
	});
	return 0;
}
