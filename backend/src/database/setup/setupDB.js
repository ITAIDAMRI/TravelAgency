import sequelize from "sequelize";
import mysql from "mysql2";
import util from "util";
import { add_default_values } from "../DBConnectionModule.js";

export const DATABASE_NAME = `Flight_Agency`;

let DB_CONFIG = {
	host: "localhost",
	user: "root",
	password: "",
};

const sendQuery = async (sql) => {
	const conn = mysql.createConnection(DB_CONFIG);
	try {
		const query = util.promisify(conn.query).bind(conn);
		const queryResult = await query(sql);
		return queryResult;
	} catch (err) {
		console.log(err.message);
		return null;
	} finally {
		conn.end();
	}
};

async function databaseExists() {
	const sql = `SHOW DATABASES LIKE '${DATABASE_NAME}';`;
	const queryResult = await sendQuery(sql);
	if (queryResult === null) return false;
	if (queryResult.length > 0) {
		console.log("->\tDATABASE FOUND");
		return true;
	} else {
		console.log("->\tDATABASE NOT FOUND");
		return false;
	}
}

async function createDatabase() {
	console.log("->\tCREATING DATABASE...");
	const sql = `CREATE DATABASE ${DATABASE_NAME};`;
	await sendQuery(sql);
	DB_CONFIG.database = DATABASE_NAME;
	return await databaseExists();
}

async function deleteDatabase() {
	const sql = `DROP DATABASE ${DATABASE_NAME};`;
	const queryResult = await sendQuery(sql);
}

export async function dropTable() {
	const sql = `DROP TABLE ${DATABASE_NAME}}`;
	const queryResult = await sendQuery(sql);
}

export async function setup_database() {
	// await deleteDatabase();
	if (!(await databaseExists())) {
		createDatabase().then();
		// await add_default_values();
	}
}
