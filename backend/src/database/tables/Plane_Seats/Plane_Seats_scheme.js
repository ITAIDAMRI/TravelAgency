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
	seatNum: sequelize.INTEGER,
	planeId: {
		type: sequelize.INTEGER,
		references: {
			model: {
				tableName: "planes",
			},
			key: "id",
		},
		allowNull: false,
	},
};
