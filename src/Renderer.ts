import Grid from "./Grid";

export default class Rendrer {
	widthpx: number;
	heightpx: number;
	scale: number;
	ctx: CanvasRenderingContext2D;

	constructor(
		width: number,
		height: number,
		scale: number,
		canvas: HTMLCanvasElement
	) {
		this.widthpx = width * scale;
		this.heightpx = height * scale;
		this.scale = scale;

		canvas.width = this.widthpx;
		canvas.height = this.heightpx;

		this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
	}

	draw(grid: Grid) {
		grid.iterateAll((cell, x, y) => {
			this.ctx.beginPath();
			this.ctx.fillStyle = cell.color;

			this.ctx.fillRect(
				x * this.scale,
				y * this.scale,
				this.scale,
				this.scale
			);

			this.ctx.strokeStyle = "#00000033";
			this.ctx.strokeRect(
				x * this.scale,
				y * this.scale,
				this.scale,
				this.scale
			);
		});
	}

	gameOver() {
		this.ctx.fillStyle = "#00000088";
		this.ctx.fillRect(0, 0, this.widthpx, this.heightpx);

		this.ctx.fillStyle = "#ff0000ff";
		this.ctx.textAlign = "center";
		this.ctx.font = "45px Fantasy";
		this.ctx.fillText("Game Over!", this.widthpx / 2, this.heightpx / 2);
	}
}
