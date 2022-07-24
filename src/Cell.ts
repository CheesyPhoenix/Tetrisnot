export default class Cell {
	color: string;
	active: boolean;
	occupied: boolean;

	constructor() {
		this.color = "#ffffff";
		this.active = false;
		this.occupied = false;
	}

	reset() {
		this.color = "#ffffff";
		this.active = false;
		this.occupied = false;
	}

	activate(color: string) {
		this.color = color;
		this.active = true;
	}

	makePassive() {
		this.active = false;
		this.occupied = true;
	}
}
