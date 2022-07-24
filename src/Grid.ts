import Cell from "./Cell";
import { Piece } from "./Pieces";

export default class Grid {
	grid: Cell[][];

	constructor(width: number, height: number) {
		this.grid = [];

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

		piece.offsets.forEach((offset) => {
			this.grid[piece.x + offset.x][piece.y + offset.y].makePassive();
		});
	}

	clearGrid() {
		this.iterateAll((cell) => {
			cell.reset();
		});
	}
}
