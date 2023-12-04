import sequelize from "sequelize";

export const TABLE_NAME = `Logged_In`;
export default {
	id: {
		type: sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
		onDelete: "CASCADE",
	},

	userId: {
		type: sequelize.INTEGER,
		references: {
			model: {
				tableName: "users",
			},
			key: "id",
		},
		allowNull: false,
	},
	token: sequelize.STRING,
};
