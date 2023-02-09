const { SlashCommandBuilder } = require('discord.js');
const luckList = require('./data/sortes.json');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

const SorteDBs = sequelize.define('sortedb', {
	userid: {
		type: Sequelize.STRING,
		unique: true,
	},
	description: Sequelize.TEXT,
	username: Sequelize.STRING,
});

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
	async execute(interaction) {
		//SorteDBs.sync();
		// interaction.guild is the object representing the Guild in which the command was run
		let finalLuck = getLuck();
		await interaction.reply(`${interaction.user.id} sua sorte hoje é: ${finalLuck}`);

		// try {
		// 	// equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?);
		// 	const sortee = await SorteDBs.create({
		// 		userid: interaction.user.id,
		// 		description: finalLuck,
		// 		username: interaction.user.username,
		// 	});

		// 	return interaction.reply(`Tag ${sortee.userid} added. ${sortee.description}`);
		// }
		// catch (error) {
		// 	if (error.name === 'SequelizeUniqueConstraintError') {
		// 		const recuperaSorte = await SorteDBs.findOne({ where: { userid: interaction.user.id } });
		// 		return interaction.reply(`${interaction.user.username}, você já tirou sua sorte hoje. Pense sobre qual pode ser o significado: "${recuperaSorte.get('description')}"`);
		// 	}

		// 	return interaction.reply('Eu perdi a conexão com as forças misticas, algo deu muito errado...');
		// }
	},
};