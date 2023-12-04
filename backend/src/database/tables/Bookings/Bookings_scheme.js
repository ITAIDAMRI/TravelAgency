import sequelize from "sequelize";

export const TABLE_NAME = `Plane_Seats`;
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
		onUpdate: "CASCADE",
		onDelete: "CASCADE",
	},

	paymentId: {
		type: sequelize.INTEGER,
		references: {
			model: {
				tableName: "payments",
			},
			key: "id",
		},
		allowNull: false,
		onUpdate: "CASCADE",
		onDelete: "CASCADE",
	},

	flightSeatId: {
		type: sequelize.INTEGER,
		references: {
			model: {
				tableName: "flight_seats",
			},
			key: "id",
		},
		allowNull: false,
		onUpdate: "CASCADE",
		onDelete: "CASCADE",
	},

	booking_date: sequelize.DATE,
};
