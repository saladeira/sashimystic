module.exports = (sequelize, DataTypes) => {
	return sequelize.define('users', {
		user_id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		balance: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
		luckcount: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
		todayluck: DataTypes.TEXT,
	}, {
		timestamps: false,
	});
};