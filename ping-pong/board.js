class Board {
	constructor(w, h) {
		this.w = w;
		this.h = h;
		this.x = w / 2;
		this.y = height - h / 2;
		this.x1 = this.x - this.w / 2;
		this.x2 = this.x + this.w / 2;
		this.y1 = this.y - this.h / 2;
		this.y2 = this.y + this.h / 2;
	}

	show() {
		fill(255, 0, 0, 127);
		rectMode(CENTER);
		rect(this.x, this.y, this.w, this.h);
		stroke(255, 255, 255, 127);
		line(0, this.y1, width, this.y1);
	}

	update() {
		this.x1 = this.x - this.w / 2;
		this.x2 = this.x + this.w / 2;
		this.y1 = this.y - this.h / 2;
		this.y2 = this.y + this.h / 2;
	}

	doaction(action) {
		switch (action) {
			case "left":
				if (this.x - this.w / 2 > 0) this.x -= this.w;
				break;

			case "right":
				if (this.x + this.w / 2 < width) this.x += this.w;
				break;

			case "stay":
				break;

			default:
				break;
		}
	}
}
