const { SlashCommandBuilder, PermissionFlagsBits, PermissionsBitField } = require('discord.js');
const { Users } = require('../dbObjects.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mesa')
		.setDescription('Cria sua mesa de RPG e coloca na lista de mesas disponíveis.'),
	async execute(interaction, message) {
		//const member = interaction.options._hoistedOptions;
		//console.log(message.guild.members.cache.get(member.id))
		// if (member.roles.cache.some(role => role.name === 'mestre')) {
		// 	await interaction.reply({ content: 'Vamos criar sua mesa?', ephemeral: true })
		// } else {
		// 	await interaction.reply({ content: 'Você vai precisar ter o cargo de mestre para criar sua mesa. Fale com um dos administradores se quiser mestrar/narrar, teremos o prazer de hospedar sua mesa.', ephemeral: true})
		// }\
		console.log(interaction.member.roles.cache)
		if(interaction.member.roles.cache.some(role => role.name === 'mestre')) {
			console.log('ok')
		} else {
			await interaction.reply({ content: 'Você vai precisar ter o cargo de mestre para criar sua mesa. Fale com um dos Mods e teremos o prazer de te ajudar.', ephemeral: true})
		}
	},
};