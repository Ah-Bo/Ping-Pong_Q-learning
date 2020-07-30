class Ball {
	constructor(r) {
		this.x = width / 2;
		// math.randomInt(r, width - r);
		this.y = height / 2;
		// math.randomInt(r, height - r);
		this.v = [math.random(-8, 8), math.random(-8, 8)];
		this.r = r;
		this.alive = true;
		this.hit_board = false;
		this.hit_score = 0;
	}

	show() {
		fill(0, 255, 0, 127);
		ellipse(this.x, this.y, 2 * this.r, 2 * this.r);
	}

	update() {
		let dx1 = this.x - board.x1;
		let dx2 = this.x - board.x2;
		let dy = this.y + this.r - board.y1;

		if (dx1 >= 0 && dx2 <= 0 && dy >= 0) {
			this.v[1] = -this.v[1];
			this.hit_board = true;
			this.hit_score++;
			console.log("OHHHHHHHHHHHHHHHHH");
		} else if (dy > 0) {
			// console.log("game over");
			this.alive = false;
			// noLoop();
		}

		let d = [this.x - this.r, this.y - this.r, this.x + this.r - width];

		if (d[0] <= 0) {
			this.v[0] = -this.v[0];
		} else if (d[1] <= 0) {
			this.v[1] = -this.v[1];
		} else if (d[2] >= 0) {
			this.v[0] = -this.v[0];
		}

		this.x += this.v[0];
		this.y += this.v[1];
	}
}
