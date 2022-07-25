import Game from "./Game";
import "./style.css";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const scoreEl = document.getElementById("score") as HTMLElement;

const width = 12;
const height = 20;

const scale = 25;

const fps = 3;

const game = new Game(width, height, scale, canvas, fps, scoreEl);

(document.getElementById("restartBtn") as HTMLButtonElement).onclick = () => {
	game.stop();
	game.start();
};

(document.getElementById("restartBtn") as HTMLButtonElement).onmousedown = (
	ev
) => {
	ev.preventDefault();
};
