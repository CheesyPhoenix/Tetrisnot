import Cell from "./Cell";
import GameManager from "./GameManager";
import { Piece } from "./Pieces";

export default class Grid {
	grid: Cell[][];
	gameManager: GameManager;

	constructor(width: number, height: number, gameManager: GameManager) {
		this.grid = [];
		this.gameManager = gameManager;

		for (let x = 0; x < width; x++) {
			const col: Cell[] = [];

			for (let y = 0; y < height; y++) {
				col.push(new Cell());
			}

			this.grid.push(col);
		}
	}

	iterateAll(func: (cell: Cell, x: number, y: number) => void) {
		for (let x = 0; x < this.grid.length; x++) {
			const col = this.grid[x];

			for (let y = 0; y < col.length; y++) {
				const cell = col[y];

				func(cell, x, y);
			}
		}
	}

	updateActive(piece: Piece) {
		//clear active cells
		this.iterateAll((cell) => {
			if (cell.active) cell.reset();
		});

		//set new active cells
		piece.offsets.forEach((offset) => {
			this.grid[piece.x + offset.x][piece.y + offset.y].activate(
				piece.color
			);
		});
	}

	passifyPiece(piece: Piece) {
		this.updateActive(piece);

		let ypos: number[] = [];

		piece.offsets.forEach((offset) => {
			this.grid[piece.x + offset.x][piece.y + offset.y].makePassive();

			if (!ypos.includes(piece.y + offset.y))
				ypos.push(piece.y + offset.y);
		});

		//check if a line has been made
		ypos.forEach((y) => {
			if (this.checkForLine(y)) this.clearLine(y);
		});

		//give score
		this.gameManager.placePieceScore();
	}

	private clearLine(y: number) {
		this.grid.forEach((col) => {
			col[y].reset();

			for (let i = y; i > 0; i--) {
				col[i].copy(col[i - 1]);
			}

			col[0].reset();
		});

		//give score
		this.gameManager.clearLineScore();
	}

	private checkForLine(y: number) {
		let isLine = true;

		this.grid.forEach((row) => {
			if (!row[y].occupied) isLine = false;
		});

		if (isLine) console.log("line has been made");

		return isLine;
	}

	clearGrid() {
		this.iterateAll((cell) => {
			cell.reset();
		});
	}
}
