import Grid from "./Grid";
import { Piece, TPiece } from "./Pieces";
import Rendrer from "./Renderer";

export default class Game {
	width: number;
	height: number;
	renderer: Rendrer;
	grid: Grid;
	activePiece: Piece;

	loopInterval: number;

	constructor(
		width: number,
		height: number,
		scale: number,
		canvas: HTMLCanvasElement,
		fps: number
	) {
		this.width = width;
		this.height = height;

		this.renderer = new Rendrer(width, height, scale, canvas);
		this.grid = new Grid(width, height);

		this.activePiece = new TPiece(width / 2, 2);

		this.grid.updateActive(this.activePiece);
		this.renderer.draw(this.grid);

		this.setupInput();

		//start game loop
		this.loopInterval = setInterval(() => {
			this.update();
		}, 1000 / fps);
	}

	private update() {
		//movement
		this.movePieceBy(0, 1, true);

		//draw
		this.draw();
	}

	private draw() {
		this.grid.updateActive(this.activePiece);
		this.renderer.draw(this.grid);
	}

	private setupInput() {
		document.addEventListener("keypress", (ev) => {
			switch (ev.key) {
				case "a":
					this.movePieceBy(-1, 0, false);
					break;
				case "d":
					this.movePieceBy(1, 0, false);
					break;

				case " ":
					this.dropPiece();
					break;

				case "s":
					this.rotatePiece("left");
					break;
				case "w":
					this.rotatePiece("right");
					break;

				default:
					return;
			}

			this.draw();
		});
	}

	private dropPiece() {
		while (this.movePieceBy(0, 1, true)) {}
	}

	private movePieceBy(x: number, y: number, fatal: boolean) {
		this.activePiece.y += y;
		this.activePiece.x += x;

		if (this.isPieceColliding()) {
			this.activePiece.x -= x;
			this.activePiece.y -= y;

			if (fatal) {
				this.grid.passifyPiece(this.activePiece);
				this.generateNewPiece();
			}

			return false;
		} else {
			return true;
		}
	}

	private rotatePiece(dir: "left" | "right") {
		if (dir == "left") {
			this.activePiece.rotateLeft();
		} else {
			this.activePiece.rotateRight();
		}

		if (this.isPieceColliding()) {
			if (dir == "left") {
				this.activePiece.rotateRight();
			} else {
				this.activePiece.rotateLeft();
			}
		}
	}

	private isPieceColliding() {
		let collided = false;
		this.activePiece.offsets.forEach((offset) => {
			if (
				this.activePiece.x + offset.x < 0 ||
				this.activePiece.x + offset.x >= this.width ||
				this.activePiece.y + offset.y < 0 ||
				this.activePiece.y + offset.y >= this.height
			) {
				collided = true;
				return;
			}

			if (
				this.grid.grid[this.activePiece.x + offset.x][
					this.activePiece.y + offset.y
				].occupied
			) {
				collided = true;
			}
		});

		return collided;
	}

	private generateNewPiece() {
		this.activePiece = new TPiece(2, 2);
	}
}
