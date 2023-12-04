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

	planeSeatId: {
		type: sequelize.INTEGER,
		references: {
			model: {
				tableName: "plane_seats",
			},
			key: "id",
		},
		allowNull: false,
		onUpdate: "CASCADE",
		onDelete: "CASCADE",
	},

	flightId: {
		type: sequelize.INTEGER,
		references: {
			model: {
				tableName: "flights",
			},
			key: "id",
		},
		// onUpdate: "CASCADE",
		// onDelete: "CASCADE",
		allowNull: false,
	},

	occupied: sequelize.BOOLEAN,
};
