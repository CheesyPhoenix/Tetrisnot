import Game from "./Game";
import "./style.css";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;

const width = 12;
const height = 20;

const scale = 25;

const fps = 5;

const game = new Game(width, height, scale, canvas, fps);
