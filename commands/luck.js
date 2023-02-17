/* eslint-disable no-undef */
const { SlashCommandBuilder } = require('discord.js');
const luckList = require('./data/sortes.json');
const { Users } = require('../dbObjects.js');

const { bold, italic, strikethrough, underscore, spoiler, quote, blockQuote, codeBlock } = require('discord.js');

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
		// const userNow = interaction.client.currency.get(userId);

		// equivalent to: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
		const checkUser = await Users.findOne({ where: { user_id: userId } });

		if (!checkUser) {
			const newUser = await Users.create({ user_id: userId, balance: 1, luckcount: 1, todayluck: finalLuck });
			interaction.client.currency.set(userId, newUser);
			const codeString = codeBlock(finalLuck);
			await interaction.reply(`${interaction.user} sua sorte hoje é: ${codeString}`);
		}
		else if (checkUser.luckcount) {
			const myLuck = checkUser.todayluck;
			const codeString = codeBlock(myLuck);
			await interaction.reply(`${interaction.user} você já tirou sua sorte hoje. Pense sobre ela. ${codeString}`);
		}
		else {
			const codeString = codeBlock(finalLuck);
			await interaction.reply(`${interaction.user} sua sorte hoje é: ${codeString}`);
			Users.update({ luckcount: 1, todayluck: finalLuck }, { where: { user_id: userId } });
		}
	},
};