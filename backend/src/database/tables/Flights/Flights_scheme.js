import sequelize from "sequelize";

export const TABLE_NAME = `Flight_Seats`;
export default {
	id: {
		type: sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
		onDelete: "CASCADE",
	},

	planeId: {
		type: sequelize.INTEGER,
		references: {
			model: {
				tableName: "planes",
			},
			key: "id",
		},
		allowNull: false,
		onUpdate: "CASCADE",
		onDelete: "CASCADE",
	},

	originId: {
		type: sequelize.INTEGER,
		references: {
			model: {
				tableName: "countries",
			},
			key: "id",
		},
		allowNull: false,
		onUpdate: "CASCADE",
		onDelete: "CASCADE",
	},

	destinationId: {
		type: sequelize.INTEGER,
		references: {
			model: {
				tableName: "countries",
			},
			key: "id",
		},
		allowNull: false,
		onUpdate: "CASCADE",
		onDelete: "CASCADE",
	},

	depart_time: sequelize.TIME,
	price_usd: sequelize.FLOAT,
	duration_minutes: sequelize.INTEGER,
	date: sequelize.DATE,
};
