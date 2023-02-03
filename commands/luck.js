const { SlashCommandBuilder } = require('discord.js');
const luckList1 = require('./data/sortes.json');

const getLuck = () => {
	let rollDice = randNum();
	let luckDay = luckList1[rollDice.toString()];
	return {
		'sorte': luckDay,
		'numero': rollDice.toString()
	};
};

const randNum = () => {
	return Math.floor(Math.random() * 20);
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sorte')
		.setDescription('Veja sua sorte do dia, tipo tarô só que pior.'),
	async execute(interaction) {
		// interaction.guild is the object representing the Guild in which the command was run
		await interaction.reply(`Sua sorte hoje: ${getLuck().numero} - Você vai ${getLuck().sorte}.`);
	},
};