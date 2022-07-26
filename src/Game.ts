import GameManager from "./GameManager";
import Grid from "./Grid";
import Pieces, { Piece } from "./Pieces";
import Rendrer from "./Renderer";

export default class Game {
	width: number;
	height: number;
	renderer: Rendrer;
	grid: Grid;
	activePiece!: Piece;

	loopInterval!: number;
	fps: number;

	gameManager: GameManager;

	constructor(
		width: number,
		height: number,
		scale: number,
		canvas: HTMLCanvasElement,
		fps: number,
		scoreElement: HTMLElement
	) {
		this.width = width;
		this.height = height;

		this.gameManager = new GameManager(scoreElement);
		this.renderer = new Rendrer(width, height, scale, canvas);
		this.grid = new Grid(width, height, this.gameManager);

		this.setupInput();

		this.fps = fps;

		//start game loop
		this.start();
	}

	start() {
		this.grid.clearGrid();

		this.generateNewPiece();

		this.grid.updateActive(this.activePiece);
		this.renderer.draw(this.grid);

		this.loopInterval = setInterval(() => {
			this.update();
		}, 1000 / this.fps);

		this.gameManager.restart();
	}

	stop() {
		clearInterval(this.loopInterval);

		this.gameManager.gameOver();

		this.renderer.gameOver();
	}

	private update() {
		//movement
		this.movePieceBy(0, 1, true);

		//draw
		this.draw();
	}

	private draw() {
		if (!this.gameManager.running) return;

		this.grid.updateActive(this.activePiece);
		this.renderer.draw(this.grid);
	}

	private setupInput() {
		document.addEventListener("keypress", (ev) => {
			if (!this.gameManager.running) return;

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
		this.activePiece = new Pieces[
			Math.floor(Math.random() * Pieces.length)
		](this.width / 2 - 1, 2);

		if (this.isPieceColliding()) this.stop();
	}
}
