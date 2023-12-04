export default class Plane_Seat {
	constructor(requestObject) {
		this.id = requestObject.id;
		this.seatNum = requestObject.seatNum;
		this.plane = requestObject.plane;
	}

	toString() {
		return `Plane_Seat
        ID:\t\t${this.id}
        Seat_ID:\t\t${this.seatNun}
        Plane:\t${this.model}`;
	}
}
