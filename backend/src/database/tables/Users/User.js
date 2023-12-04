export default class User {
	constructor(requestObject) {
		this.id = requestObject.id;
		this.first_name = requestObject.first_name;
		this.last_name = requestObject.last_name;
		this.passport = requestObject.passport;
		this.password = requestObject.password;
		this.permission = requestObject.permission;
	}

	toString() {
		return `User
        ID:\t\t${this.id}
        Passport:\t${this.passport}
        Permission:\t${this.permission}
        Password:\t${this.password}
        First Name:\t${this.first_name}
        Last Name:\t${this.last_name}`;
	}
}
