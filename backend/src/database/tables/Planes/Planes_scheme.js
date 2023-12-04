import sequelize from "sequelize";

export const TABLE_NAME = `Planes`;
export default {
	id: {
		type: sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
		onDelete: "CASCADE",
	},
	model: sequelize.STRING,
	company: sequelize.STRING,
};
