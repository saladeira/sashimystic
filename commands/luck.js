/* eslint-disable no-undef */
const { SlashCommandBuilder } = require('discord.js');
const luckList = require('./data/sortes.json');
const { Users, CurrencyShop } = require('../dbObjects.js');

const getLuck = () => {
	let myLuck = '';
	for (let i = 0; i < luckList.length; i++) {
		const keys = Object.keys(luckList[i]);
		const numItems = keys.length;

		const numRand = randNum(numItems);
		const numString = numRand.toString();

		myLuck += luckList[i][numString];
	}
	return myLuck;
};

const randNum = (x) => {
	return Math.floor(Math.random() * x);
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sorte')
		.setDescription('Veja sua sorte do dia, tipo tarô só que pior.'),
	async execute(interaction) {
		Users.sync();
		// interaction.guild is the object representing the Guild in which the command was run
		const finalLuck = getLuck();

		const userId = interaction.user.id;
		const userNow = interaction.client.currency.get(userId);

		// equivalent to: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
		const checkUser = await Users.findOne({ where: { user_id: userId } });

		if (!checkUser) {
			const newUser = await Users.create({ user_id: userId, balance: 1, luckcount: 1, todayluck: finalLuck});
			interaction.client.currency.set(userId, newUser);

			await interaction.reply(`${interaction.user.id} sua sorte hoje é: ${finalLuck}`);
		}
		else if (checkUser.luckcount) {
			const myLuck = checkUser.todayluck;
			await interaction.reply(`${interaction.user} você já tirou sua sorte hoje. Pense sobre ela: ${myLuck}`);
		}
		else {
			await interaction.reply(`${interaction.user.id} sua sorte hoje é: ${finalLuck}`);
			Users.update({ luckcount: 1, todayluck: finalLuck }, { where: { user_id: userId } });
		}

		// const newUser = await Users.create({ user_id: id, balance: amount });
		// client.currency.set(id, newUser);

		// return newUser;
	},
};