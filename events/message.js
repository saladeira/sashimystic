const { Events } = require('discord.js');

module.exports = {
	name: Events.MessageCreate,
	execute(client) {
		addBalance(client.author.id, 1);
	},
};