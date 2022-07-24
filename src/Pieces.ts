abstract class Piece {
	x: number;
	y: number;
	rotation: 0 | 1 | 2 | 3;

	abstract color: string;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
		this.rotation = 0;
	}

	abstract get offsets(): { x: number; y: number }[];

	rotateRight() {
		if (this.rotation != 3) this.rotation++;
		else this.rotation = 0;
	}
	rotateLeft() {
		if (this.rotation != 0) this.rotation--;
		else this.rotation = 3;
	}
}

class TPiece extends Piece {
	color: string = "#550055";

	get offsets(): { x: number; y: number }[] {
		switch (this.rotation) {
			case 0:
				return [
					{ x: 0, y: 0 },
					{ x: 1, y: 0 },
					{ x: 0, y: 1 },
					{ x: -1, y: 0 },
				];
			case 1:
				return [
					{ x: 0, y: 0 },
					{ x: 0, y: 1 },
					{ x: -1, y: 0 },
					{ x: 0, y: -1 },
				];
			case 2:
				return [
					{ x: 0, y: 0 },
					{ x: 1, y: 0 },
					{ x: 0, y: -1 },
					{ x: -1, y: 0 },
				];
			case 3:
				return [
					{ x: 0, y: 0 },
					{ x: 0, y: -1 },
					{ x: 1, y: 0 },
					{ x: 0, y: 1 },
				];
		}
	}
}

export { Piece, TPiece };
