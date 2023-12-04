export default class Plane {
	constructor(requestObject) {
		this.id = requestObject.id;
		this.model = requestObject.model;
	}

	toString() {
		return `Plane
        ID:\t\t${this.id}
        Model:\t${this.model}`;
	}
}
