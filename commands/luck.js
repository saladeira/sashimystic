const { SlashCommandBuilder } = require('discord.js');
const luckList = require('./data/sortes.json');

const getLuck = () => {
	let myLuck = '';
	for (let i = 0; i < luckList.length; i++) {
		let keys = Object.keys(luckList[i]);
		let numItems = keys.length;

		let numRand = randNum(numItems);
		let numString = numRand.toString();

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
	async execute(interaction, client) {
		// interaction.guild is the object representing the Guild in which the command was run
		await interaction.reply(`${interaction.user.id} sua sorte hoje é: ${getLuck()}`);
	},
};