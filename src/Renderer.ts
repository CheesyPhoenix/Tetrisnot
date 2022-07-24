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
		});
	}
}
