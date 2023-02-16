const { Events } = require('discord.js');
const { Users, CurrencyShop } = require('../dbObjects.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		const storedBalances = await Users.findAll();
		storedBalances.forEach(b => client.currency.set(b.user_id, b));
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};