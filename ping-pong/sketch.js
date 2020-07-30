let ball = null;
let board = null;

let speed = 1;
let isshow = true;

let Qtable = {};
let alpha = 0.8;
let gama = 0.8;
let p = 0.1;

let roundnumber = 0;
let div_num_of_round = null;


function setup() {
	createCanvas(400, 300);
	ball = new Ball(5);
	board = new Board(50, 15);
	div_num_of_round = createDiv("NUM_OF_ROUND").size(width, 20);

	// frameRate(1);
}

/*
初始化 Q = {};
while Q 未收敛：
    初始化小鸟的位置S，开始新一轮游戏
    while S != 死亡状态：
        使用策略π，获得动作a=π(S)
        使用动作a进行游戏，获得小鸟的新位置S',与奖励R(S,a)
        Q[S,A] ← (1-α)*Q[S,A] + α*(R(S,a) + γ* max Q[S',a]) // 更新Q
        S ← S'
*/

function draw() {
	for (let i = 0; i < speed; i++) {
		background(0);

		//记录当前状态
		let s = ((board.x - ball.x) / 10).toFixed(0).toString() + "px";

		//选取动作
		let a = (() => {
			if (Qtable[s] == undefined) {
				Qtable[s] = {
					left: 0,
					right: 0,
					stay: 0,
				};

				return math.pickRandom(["left", "right", "stay"]);
			} else if (math.random(0, 1) <= p) {
				return math.pickRandom(["left", "right", "stay"]);
			} else {
				let tmp, a;
				for (let i of ["left", "right", "stay"]) {
					if (Qtable[s][i] > tmp || tmp == undefined) {
						tmp = Qtable[s][i];
						a = i;
					}
				}
				return a;
			}
		})();

		//执行动作
		board.doaction(a);

		board.update();
		ball.update();
		if (
			ball.x > width ||
			ball.x < 0 ||
			ball.y > height ||
			ball.y < 0 ||
			math.abs(ball.v[0]) <= 4 ||
			math.abs(ball.v[1]) <= 4 ||
			ball.hit_score >= 500
		) {
			ball = new Ball(5);
		}

		//获取下一个状态
		let s_ = ((board.x - ball.x) / 10).toFixed(0).toString() + "px";

		//获取奖励
		let r = (() => {
			if (ball.alive && ball.hit_board) {
				ball.hit_board = false;
				return 100;
			}
			// } else if (ball.alive) {
			// 	return 1;
			// } else {
			// 	return -10000;
			// }
			else if (!ball.alive) {
				return -10000;
			} else {
				return 50 - math.abs(board.x - ball.x);
			}
		})();

		//更新Q表
		// Q[S, A] ← (1 - α) * Q[S, A] + α * (R(S, a) + γ * max Q[S',a])

		let maxQs_a = (() => {
			if (Qtable[s_] == undefined) {
				Qtable[s_] = {
					left: 0,
					right: 0,
					stay: 0,
				};

				return 0;
			} else {
				return math.max(
					Qtable[s_]["left"],
					Qtable[s_]["right"],
					Qtable[s_]["stay"]
				);
			}
		})();

		Qtable[s][a] =
			(1 - alpha) * Qtable[s][a] + alpha * (r + gama * maxQs_a);

		if (isshow) {
			ball.show();
			board.show();
		}

		div_num_of_round.html("ROUNDS:" + roundnumber.toString());

		if (!ball.alive) {
			ball = new Ball(5);
			board = new Board(50, 15);
			roundnumber++;
		}
	}
}

function keyPressed() {
	switch (key) {
		case "A":
			board.doaction("left");

			break;

		case "D":
			board.doaction("right");
			break;

		case "S":
			isshow = !isshow;
			break;

		default:
			break;
	}
}
