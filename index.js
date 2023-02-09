/* eslint-disable no-undef */
const fs = require('node:fs');
const path = require('node:path');
const { Client, codeBlock, Collection, Events, GatewayIntentBits } = require('discord.js');
const { Users, CurrencyShop } = require('./dbObjects.js');
const { Op } = require('sequelize');

const { token } = require('./config.json');


const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });
client.commands = new Collection();
client.currency = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));


setInterval(() => clearLuckCount(), 57600000);

const clearLuckCount = async () => {
	//const clearAll = Users.findAll({ where: { luckcount } });
	const luckClear = await Users.findAll();
	const listUsers = luckClear.map (i => i.user_id);
	listUsers.forEach(async a => {
		console.log(a);
		if (a !== 0) {
			const user = await Users.findOne({ where: { user_id: a}});
			user.update({ luckcount: 0 });
		}
	});
};

addBalance = async (id, amount) => {
	const user = client.currency.get(id);

	if (user) {
		user.balance += Number(amount);
		return user.save();
	}

	const newUser = await Users.create({ user_id: id, balance: amount });
	client.currency.set(id, newUser);

	return newUser;
};

getBalance = (id) => {
	const user = client.currency.get(id);
	return user ? user.balance : 0;
};

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login(token);

