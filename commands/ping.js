const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with pong'),
	async execute(interaction) {
		await interaction.deferReply();
		await interaction.editReply('Pong');
		const message = await interaction.fetchReply();
		console.log(message);
	},
};