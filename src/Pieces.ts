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
	color: string = "#ad4d9c";

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
class IPiece extends Piece {
	color: string = "#31c7ef";

	get offsets(): { x: number; y: number }[] {
		switch (this.rotation) {
			case 0:
				return [
					{ x: 0, y: -1 },
					{ x: 0, y: 0 },
					{ x: 0, y: 1 },
					{ x: 0, y: 2 },
				];
			case 1:
				return [
					{ x: -1, y: 0 },
					{ x: 0, y: 0 },
					{ x: 1, y: 0 },
					{ x: 2, y: 0 },
				];
			case 2:
				return [
					{ x: 0, y: -1 },
					{ x: 0, y: 0 },
					{ x: 0, y: 1 },
					{ x: 0, y: 2 },
				];
			case 3:
				return [
					{ x: -1, y: 0 },
					{ x: 0, y: 0 },
					{ x: 1, y: 0 },
					{ x: 2, y: 0 },
				];
		}
	}
}

class JPiece extends Piece {
	color: string = "#5a65ad";

	get offsets(): { x: number; y: number }[] {
		switch (this.rotation) {
			case 0:
				return [
					{ x: -1, y: -1 },
					{ x: -1, y: 0 },
					{ x: 0, y: 0 },
					{ x: 1, y: 0 },
				];
			case 1:
				return [
					{ x: 1, y: -1 },
					{ x: 0, y: -1 },
					{ x: 0, y: 0 },
					{ x: 0, y: 1 },
				];
			case 2:
				return [
					{ x: -1, y: 0 },
					{ x: 0, y: 0 },
					{ x: 1, y: 0 },
					{ x: 1, y: 1 },
				];
			case 3:
				return [
					{ x: 0, y: -1 },
					{ x: 0, y: 0 },
					{ x: 0, y: 1 },
					{ x: -1, y: 1 },
				];
		}
	}
}
class LPiece extends Piece {
	color: string = "#ef7921";

	get offsets(): { x: number; y: number }[] {
		switch (this.rotation) {
			case 0:
				return [
					{ x: 1, y: -1 },
					{ x: -1, y: 0 },
					{ x: 0, y: 0 },
					{ x: 1, y: 0 },
				];
			case 1:
				return [
					{ x: 1, y: 1 },
					{ x: 0, y: -1 },
					{ x: 0, y: 0 },
					{ x: 0, y: 1 },
				];
			case 2:
				return [
					{ x: -1, y: 0 },
					{ x: 0, y: 0 },
					{ x: 1, y: 0 },
					{ x: -1, y: 1 },
				];
			case 3:
				return [
					{ x: 0, y: -1 },
					{ x: 0, y: 0 },
					{ x: 0, y: 1 },
					{ x: -1, y: -1 },
				];
		}
	}
}
class OPiece extends Piece {
	color: string = "#f7d308";

	get offsets(): { x: number; y: number }[] {
		switch (this.rotation) {
			case 0:
				return [
					{ x: 0, y: 0 },
					{ x: 1, y: 0 },
					{ x: 0, y: 1 },
					{ x: 1, y: 1 },
				];
			case 1:
				return [
					{ x: 0, y: 0 },
					{ x: 1, y: 0 },
					{ x: 0, y: 1 },
					{ x: 1, y: 1 },
				];
			case 2:
				return [
					{ x: 0, y: 0 },
					{ x: 1, y: 0 },
					{ x: 0, y: 1 },
					{ x: 1, y: 1 },
				];
			case 3:
				return [
					{ x: 0, y: 0 },
					{ x: 1, y: 0 },
					{ x: 0, y: 1 },
					{ x: 1, y: 1 },
				];
		}
	}
}
class SPiece extends Piece {
	color: string = "#42b642";

	get offsets(): { x: number; y: number }[] {
		switch (this.rotation) {
			case 0:
				return [
					{ x: 0, y: 0 },
					{ x: 1, y: 0 },
					{ x: 0, y: 1 },
					{ x: -1, y: 1 },
				];
			case 1:
				return [
					{ x: 0, y: 0 },
					{ x: -1, y: 0 },
					{ x: -1, y: -1 },
					{ x: 0, y: 1 },
				];
			case 2:
				return [
					{ x: 0, y: 0 },
					{ x: 1, y: 0 },
					{ x: 0, y: 1 },
					{ x: -1, y: 1 },
				];
			case 3:
				return [
					{ x: 0, y: 0 },
					{ x: -1, y: 0 },
					{ x: -1, y: -1 },
					{ x: 0, y: 1 },
				];
		}
	}
}
class ZPiece extends Piece {
	color: string = "#ef2029";

	get offsets(): { x: number; y: number }[] {
		switch (this.rotation) {
			case 0:
				return [
					{ x: 0, y: 0 },
					{ x: 1, y: 1 },
					{ x: 0, y: 1 },
					{ x: -1, y: 0 },
				];
			case 1:
				return [
					{ x: 0, y: 0 },
					{ x: -1, y: 0 },
					{ x: 0, y: -1 },
					{ x: -1, y: 1 },
				];
			case 2:
				return [
					{ x: 0, y: 0 },
					{ x: 1, y: 1 },
					{ x: 0, y: 1 },
					{ x: -1, y: 0 },
				];
			case 3:
				return [
					{ x: 0, y: 0 },
					{ x: -1, y: 0 },
					{ x: 0, y: -1 },
					{ x: -1, y: 1 },
				];
		}
	}
}

const Pieces = [TPiece, IPiece, JPiece, LPiece, OPiece, SPiece, ZPiece];

export default Pieces;

export { Piece };
