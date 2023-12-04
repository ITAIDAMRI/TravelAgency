import sequelize from "sequelize";

export const TABLE_NAME = `Payments`;
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
	creditor_first_name: sequelize.STRING,
	creditor_last_name: sequelize.STRING,
	creditor_id: sequelize.STRING,
	amount: sequelize.FLOAT,
	date: sequelize.DATE,
	time: sequelize.TIME,
	credit_card_number: sequelize.FLOAT,
};
