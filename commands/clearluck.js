const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { Users, CurrencyShop } = require('../dbObjects.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clearluck')
		.setDescription('limpa a sorte de todos.')
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
	async execute(interaction) {
		const luckClear = await Users.findAll();
		const listUsers = luckClear.map (i => i.user_id);
		listUsers.forEach(async a => {
			if (a !== 0) {
				const user = await Users.findOne({ where: { user_id: a}});
				user.update({ luckcount: 0 });
			}
		});
		await interaction.reply({content: 'Limpei as sortes.', ephemeral: true});
	},
};