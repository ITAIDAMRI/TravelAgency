import sequelize from "sequelize";

export const TABLE_NAME = `Users`;
export default {
	id: {
		type: sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
		onDelete: "CASCADE",
	},

	passport: sequelize.STRING,
	password: sequelize.STRING,
	first_name: sequelize.STRING,
	last_name: sequelize.STRING,
	permission: sequelize.INTEGER,
	token: sequelize.STRING,
};
