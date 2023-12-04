import { ORM } from "../../DBConnectionModule.js";
const TABLE_NAME = "payments";

export const add_payment = async (requestObject) => {
	return await ORM.payments
		.create({
			userId: requestObject.userId,
			creditor_first_name: requestObject.creditor_first_name,
			creditor_last_name: requestObject.creditor_last_name,
			creditor_id: requestObject.creditor_id,
			amount: requestObject.amount,
			date: requestObject.date,
			time: requestObject.time,
			credit_card_number: requestObject.credit_card_number,
		})
		.then(async (result) => {
			const added = await get_payment_by_id({ id: result.id });
			// const obj = new Plane(added);
			console.log(`ADDED TO ${TABLE_NAME}: ${added}`);
			return 200;
		})
		.catch((err) => console.log(err));
};

export const get_payment_by_id = async (requestObject) => {
	return await ORM.payments
		.findOne({
			where: { id: requestObject.id },
			raw: true,
		})
		.then((result) => {
			return result;
		})
		.catch((err) => console.log(err));
};

export const get_all_payments = async () => {
	return await ORM.payments.findAll({ raw: true });
};

export const delete_payment = async (requestObject) => {
	return await ORM.payments
		.destroy({
			where: { id: requestObject.id },
		})
		.then((result) => {
			if (result == 1) {
				console.log(`DELETED FROM ${TABLE_NAME} ${requestObject.id}`);
				return 200;
			} else {
				console.log(
					`IN TABLE ${TABLE_NAME} RECORD ${requestObject.id} DOES NOT EXIST`
				);
				return 404;
			}
		})
		.catch((err) => console.log(err));
};

export const delete_all_payments = async (requestObject) => {
	let all_records = await get_all_payments();
	await all_records.forEach(async (record) => {
		await delete_payment(record);
	});
};
