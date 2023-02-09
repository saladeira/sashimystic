const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('balance')
		.setDescription('Verifica as suas riquezas!.'),
	async execute(interaction) {
		// interaction.guild is the object representing the Guild in which the command was run
		const target = interaction.options.getUser('user') ?? interaction.user;

		return interaction.reply(`${target.tag} has ${getBalance(target.id)}💰`);
	},
};