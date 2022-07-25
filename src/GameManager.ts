export default class GameManager {
	running: boolean;
	private _score: number;
	scoreDisplay: HTMLElement;

	constructor(scoreDisplayEl: HTMLElement) {
		this._score = 0;
		this.running = true;
		this.scoreDisplay = scoreDisplayEl;

		this.scoreDisplay.innerText = this.score.toString();
	}

	gameOver() {
		this.running = false;
	}

	restart() {
		this.score = 0;
		this.running = true;
	}

	private set score(newScore) {
		this._score = newScore;

		this.scoreDisplay.innerText = this.score.toString();
	}

	private get score(): number {
		return this._score;
	}

	clearLineScore() {
		this.score += 100;
	}
	placePieceScore() {
		this.score += 10;
	}
}
