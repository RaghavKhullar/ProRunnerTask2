var modal = document.getElementById("modal");
var tune_f = new Audio("tune_fail.wav");
var tune_s = new Audio("gta_san_andreas.mp3");
var modal2 = document.getElementById("modal2");

var count = 0;
var speed = 10;

function start() {
  modal2.style.display = "none";
  animate1();
  animate2();
  animate3();
  animate4();
  animate5();
  circle();
  slow();
  life();
}

var highscore = window.localStorage.getItem("highscore");
if (highscore == null) {
  document.getElementById("hiscore").innerHTML = "Hi-Score:";
} else {
  document.getElementById("hiscore").innerHTML = "Hi-Score: " + highscore;
}

var dist = 0;
var score = 0;
var can = document.getElementById("canvas");

can.width = window.innerWidth;
can.height = window.innerHeight;
c = can.getContext("2d");

c.fillStyle = "black";
c.fillRect(0, 0, window.innerWidth, window.innerHeight / 4);
c.fillRect(
  0,
  window.innerHeight * 0.75,
  window.innerWidth,
  window.innerHeight / 4
);

c.fillStyle = "blue";
var b = window.innerHeight * 0.75 - 50;
c.fillRect(100, b, 50, 50);

can.addEventListener("click", function () {
  m = (m + 1) % 2;
  moving();
});
var m = 1;

document.body.onkeyup = function (e) {
  if (e.keyCode == 32) {
    m = (m + 1) % 2;
    moving();
  }
};
var y = b;
var move = null;

function moving() {
  if (m == 0) {
    window.cancelAnimationFrame(move);

    if (y >= window.innerHeight * 0.75 - 60) {
      c.clearRect(100, y + 10, 50, window.innerHeight * 0.75 - 11 - y);
    } else {
      c.clearRect(100, y + 10, 50, 52);
    }

    c.fillStyle = "blue";
    c.fillRect(100, y, 50, 49);
    y = y - 10;
    move = window.requestAnimationFrame(moving);
    if (y <= window.innerHeight / 4) {
      window.cancelAnimationFrame(move);
      b = window.innerHeight / 4;
      y = b;
      c.clearRect(100, y + 10, 50, window.innerHeight * 0.75 - 11 - y);
      c.fillStyle = "blue";
      c.fillRect(100, y, 50, 49);
    }
  } else if (m == 1) {
    window.cancelAnimationFrame(move);

    if (y <= window.innerHeight / 4 + 10) {
      c.clearRect(
        100,
        window.innerHeight / 4,
        50,
        y - window.innerHeight / 4 - 1
      );
    } else {
      c.clearRect(100, y - 20, 50, 52);
    }

    c.fillStyle = "blue";
    c.fillRect(100, y, 50, 49);
    y = y + 10;
    move = window.requestAnimationFrame(moving);
    if (y >= window.innerHeight * 0.75 - 50) {
      window.cancelAnimationFrame(move);
      b = window.innerHeight * 0.75 - 50;
      y = b;
      c.clearRect(
        100,
        window.innerHeight / 4 + 10,
        50,
        y - window.innerHeight / 4
      );
      c.fillStyle = "blue";
      c.fillRect(100, y, 50, 50);
    }
  }
}

var r1 = 1;
var x1 = window.innerWidth;
var id1 = null;
function animate1() {
  if (r1 <= 2) {
    id1 = window.requestAnimationFrame(animate1);

    c.fillStyle = "grey";
    c.fillRect(
      x1 - 1,
      window.innerHeight * 0.75 - 1,
      100,
      window.innerHeight * 0.25 + 3
    );

    c.fillStyle = "black";
    c.fillRect(
      x1 + 90,
      window.innerHeight * 0.75,
      150,
      window.innerHeight * 0.25
    ); //ensuring that when obstacle moves forward,the previous square is black again
    if (x1 + 99 <= 0) {
      x1 = window.innerWidth;
      r1 = Math.floor(Math.random() * 4);
    }
    if (check1()) {
      stop();
    }
    dist += 0.01;
    score = Math.floor(dist * 10);
    if (score % 5 == 0 && count == 0) {
      speed = speed + 0.1;
      ++count;
    } else if (score % 10 != 0) {
      count = 0;
    }

    document.getElementById("score").innerHTML = "Score: " + score;

    x1 = x1 - speed;
  } else {
    id1 = window.requestAnimationFrame(animate1);
    c.fillStyle = "black";
    c.fillRect(
      x1 + 90,
      window.innerHeight * 0.75,
      150,
      window.innerHeight * 0.25
    ); //ensuring that when obstacle moves forward,the previous square is black again
    if (x1 + 199 <= 0) {
      x1 = window.innerWidth;
      r1 = Math.floor(Math.random() * 4);
    }
    dist += 0.01;
    score = Math.floor(dist * 10);

    if (score % 5 == 0 && count == 0) {
      speed = speed + 0.1;
      ++count;
    } else if (score % 10 != 0) {
      count = 0;
    }

    document.getElementById("score").innerHTML = "Score: " + score;
    x1 = x1 - speed;
  }
}

function check1() {
  if (x1 <= 100 && x1 >= 50 && y >= window.innerHeight * 0.75 - 50 && r1 <= 2) {
    if (highscore <= score) {
      window.localStorage.removeItem("highscore");
      window.localStorage.setItem("highscore", score);
      document.getElementById("hiscore").innerHTML = "Hi-Score: " + score;
      document.getElementById("modal-content").innerHTML =
        "Congrats!!You have beaten the Hi-score.The new record is:" + score;
      tune_s.play();
    } else {
      document.getElementById("modal-content").innerHTML =
        "Your score is:" + score + " and Hi-score is:" + highscore;
      tune_f.play();
    }
    modal.style.display = "block";

    return true;
  }
}

var r3 = 3;
var x3 = window.innerWidth - 1000;
var id3 = null;
function animate3() {
  if (r3 <= 2) {
    id3 = window.requestAnimationFrame(animate3);

    c.fillStyle = "grey";
    c.fillRect(
      x3 - 1,
      window.innerHeight * 0.75 - 1,
      100,
      window.innerHeight * 0.25 + 3
    );

    c.fillStyle = "black";
    c.fillRect(
      x3 + 90,
      window.innerHeight * 0.75,
      150,
      window.innerHeight * 0.25
    ); //ensuring that when obstacle moves forward,the previous square is black again
    if (x3 + 99 <= 0) {
      x3 = window.innerWidth;
      r3 = Math.floor(Math.random() * 4);
    }
    if (check3()) {
      stop();
    }

    x3 = x3 - speed;
  } else {
    id3 = window.requestAnimationFrame(animate3);
    c.fillStyle = "black";
    c.fillRect(
      x3 + 90,
      window.innerHeight * 0.75,
      150,
      window.innerHeight * 0.25
    ); //ensuring that when obstacle moves forward,the previous square is black again
    if (x3 + 199 <= 0) {
      x3 = window.innerWidth;
      r3 = Math.floor(Math.random() * 4);
    }
    x3 = x3 - speed;
  }
}

function check3() {
  if (x3 <= 100 && x3 >= 50 && y >= window.innerHeight * 0.75 - 50 && r3 <= 2) {
    if (highscore <= score) {
      window.localStorage.removeItem("highscore");
      window.localStorage.setItem("highscore", score);
      document.getElementById("hiscore").innerHTML = "Hi-Score: " + score;
      document.getElementById("modal-content").innerHTML =
        "Congrats!!You have beaten the Hi-score.The new record is:" + score;
      tune_s.play();
    } else {
      document.getElementById("modal-content").innerHTML =
        "Your score is:" + score + " and Hi-score is:" + highscore;
      tune_f.play();
    }
    modal.style.display = "block";

    return true;
  }
}

var r5 = 1;
var x5 = window.innerWidth - 300;
var id5 = null;
function animate5() {
  if (r5 <= 2) {
    id5 = window.requestAnimationFrame(animate5);

    c.fillStyle = "grey";
    c.fillRect(
      x5 - 1,
      window.innerHeight * 0.75 - 1,
      100,
      window.innerHeight * 0.25 + 3
    );

    c.fillStyle = "black";
    c.fillRect(
      x5 + 90,
      window.innerHeight * 0.75,
      150,
      window.innerHeight * 0.25
    ); //ensuring that when obstacle moves forward,the previous square is black again
    if (x5 + 99 <= 0) {
      x5 = window.innerWidth;
      r5 = Math.floor(Math.random() * 4);
    }
    if (check5()) {
      stop();
    }

    x5 = x5 - speed;
  } else {
    id5 = window.requestAnimationFrame(animate5);
    c.fillStyle = "black";
    c.fillRect(
      x5 + 90,
      window.innerHeight * 0.75,
      150,
      window.innerHeight * 0.25
    ); //ensuring that when obstacle moves forward,the previous square is black again
    if (x5 + 199 <= 0) {
      x5 = window.innerWidth;
      r5 = Math.floor(Math.random() * 4);
    }

    x5 = x5 - speed;
  }
}

function check5() {
  if (x5 <= 100 && x5 >= 50 && y >= window.innerHeight * 0.75 - 50 && r5 <= 2) {
    if (highscore <= score) {
      window.localStorage.removeItem("highscore");
      window.localStorage.setItem("highscore", score);
      document.getElementById("hiscore").innerHTML = "Hi-Score: " + score;
      document.getElementById("modal-content").innerHTML =
        "Congrats!!You have beaten the Hi-score.The new record is:" + score;
      tune_s.play();
    } else {
      document.getElementById("modal-content").innerHTML =
        "Your score is:" + score + " and Hi-score is:" + highscore;
      tune_f.play();
    }
    modal.style.display = "block";

    return true;
  }
}

var r2 = 1;
var x2 = window.innerWidth - 600;
var id2 = null;
function animate2() {
  if (r2 <= 1) {
    id2 = window.requestAnimationFrame(animate2);

    c.fillStyle = "grey";
    c.fillRect(x2, 0, 100, window.innerHeight * 0.25 + 1);

    c.fillStyle = "black";
    c.fillRect(x2 + 90, 0, 150, window.innerHeight * 0.25); //ensuring that when obstacle moves forward,the previous square is black again
    if (x2 + 99 <= 0) {
      x2 = window.innerWidth;
      r2 = Math.floor(Math.random() * 3);
    }
    if (check2()) {
      stop();
    }
    x2 = x2 - speed;
  } else {
    id2 = window.requestAnimationFrame(animate2);
    c.fillStyle = "black";
    c.fillRect(x2 + 90, 0, 150, window.innerHeight * 0.25); //ensuring that when obstacle moves forward,the previous square is black again

    if (x2 + 199 <= 0) {
      x2 = window.innerWidth;
      r2 = Math.floor(Math.random() * 3);
    }
    x2 = x2 - speed;
  }
}

function check2() {
  if (x2 < 100 && x2 > 50 && y <= window.innerHeight * 0.25 && r2 <= 1) {
    if (highscore < score) {
      window.localStorage.removeItem("highscore");
      window.localStorage.setItem("highscore", score);
      document.getElementById("hiscore").innerHTML = "Hi-Score: " + score;
      document.getElementById("modal-content").innerHTML =
        "Congrats!!You have beaten the Hi-score.The new record is:" + score;
      tune_s.play();
    } else {
      document.getElementById("modal-content").innerHTML =
        "Your score is:" + score + " and Hi-score is:" + highscore;
      tune_f.play();
    }
    modal.style.display = "block";
    2;

    return true;
  }
}

var r4 = 1;
var x4 = window.innerWidth - 1300;
var id4 = null;
function animate4() {
  if (r4 <= 1) {
    id4 = window.requestAnimationFrame(animate4);

    c.fillStyle = "grey";
    c.fillRect(x4, 0, 100, window.innerHeight * 0.25 + 1);

    c.fillStyle = "black";
    c.fillRect(x4 + 90, 0, 150, window.innerHeight * 0.25); //ensuring that when obstacle moves forward,the previous square is black again
    if (x4 + 99 <= 0) {
      x4 = window.innerWidth;
      r4 = Math.floor(Math.random() * 3);
    }
    if (check4()) {
      stop();
    }
    x4 = x4 - speed;
  } else {
    id4 = window.requestAnimationFrame(animate4);
    c.fillStyle = "black";
    c.fillRect(x4 + 90, 0, 150, window.innerHeight * 0.25); //ensuring that when obstacle moves forward,the previous square is black again

    if (x4 + 199 <= 0) {
      x4 = window.innerWidth;
      r4 = Math.floor(Math.random() * 3);
    }
    x4 = x4 - speed;
  }
}

function check4() {
  if (x4 < 100 && x4 > 50 && y <= window.innerHeight * 0.25 && r4 <= 1) {
    if (highscore < score) {
      window.localStorage.removeItem("highscore");
      window.localStorage.setItem("highscore", score);
      document.getElementById("hiscore").innerHTML = "Hi-Score: " + score;
      document.getElementById("modal-content").innerHTML =
        "Congrats!!You have beaten the Hi-score.The new record is:" + score;
      tune_s.play();
    } else {
      document.getElementById("modal-content").innerHTML =
        "Your score is:" + score + " and Hi-score is:" + highscore;
      tune_f.play();
    }
    modal.style.display = "block";

    return true;
  }
}

var id6 = null;
var x6 = window.innerWidth - 400;
var r6 = 100;
var x8 = window.innerHeight - 350; //y cordinate of ball's centre

var y1 = 1;
var y2 = -1;
var random1 = Math.floor(Math.random() * 9);
function circle() {
  if (random1 <= 5) {
    id6 = window.requestAnimationFrame(circle);

    c.beginPath();
    c.arc(x6 + 4, x8 - y1, 26, 0, Math.PI * 2, true);

    c.fillStyle = "grey";
    c.fill();

    c.beginPath();
    c.arc(x6, x8, 20, 0, Math.PI * 2, true);

    c.fillStyle = "blue";
    c.fill();
    if (check_circle()) {
      stop();
    }

    x8 = x8 + y1;

    x6 = x6 - 4;
    if (x8 <= window.innerHeight / 4 + 32) {
      y1 = 4;
    } else if (x8 >= window.innerHeight * 0.75 - 31) {
      y1 = -4;
    }
    if (x6 <= -100) {
      var z = Math.floor(Math.random() * 400);
      x6 = window.innerWidth - z;
      random1 = Math.floor(Math.random() * 9);
    }
  } else {
    x6 = x6 - 10;
    if (x6 <= -200) {
      var z = Math.floor(Math.random() * 400);
      x6 = window.innerWidth - z;
      random1 = Math.floor(Math.random() * 9);
    }
    id6 = window.requestAnimationFrame(circle);
  }
}

function check_circle() {
  if (x6 <= 170 && x6 >= 80) {
    if (x8 <= window.innerHeight * 0.75 - 29 && x8 >= y - 20 && x8 <= y + 71) {
      //b+51+20
      if (highscore < score) {
        window.localStorage.removeItem("highscore");
        window.localStorage.setItem("highscore", score);
        document.getElementById("hiscore").innerHTML = "Hi-Score: " + score;
        document.getElementById("modal-content").innerHTML =
          "Congrats!!You have beaten the Hi-score.The new record is:" + score;
        tune_s.play();
      } else {
        document.getElementById("modal-content").innerHTML =
          "Your score is:" + score + " and Hi-score is:" + highscore;
        tune_f.play();
      }
      modal.style.display = "block";

      return true;
    }
  }
}

function stop() {
  window.cancelAnimationFrame(move);
  window.cancelAnimationFrame(id1);
  window.cancelAnimationFrame(id2);
  window.cancelAnimationFrame(id3);
  window.cancelAnimationFrame(id4);
  window.cancelAnimationFrame(id5);
  window.cancelAnimationFrame(id6);
  window.cancelAnimationFrame(slow_id);
  window.cancelAnimationFrame(life_id);
}

var img = document.getElementById("slow");
var slow1 = Math.floor(Math.random() * 9);
var slow_x = Math.floor(
  Math.random() * (window.innerWidth * 0.25) + window.innerWidth * 0.75
);
var slow_y = Math.floor(
  Math.random() * (window.innerHeight * 0.35) + window.innerHeight * 0.3
);
var slow_id = null;
function slow() {
  if (slow1 <= 2) {
    slow_id = window.requestAnimationFrame(slow);
    c.clearRect(slow_x + 6, slow_y, 50, 50);
    c.drawImage(img, slow_x, slow_y, 50, 50);
    slow_x -= 6;

    if (slow_check()) {
      speed = Math.floor(speed / 10) * 10;
    }

    if (slow_x <= -100) {
      slow_x = Math.floor(
        Math.random() * (window.innerWidth * 0.25) + window.innerWidth * 0.75
      );
      slow_y = Math.floor(
        Math.random() * (window.innerHeight * 0.35) + window.innerHeight * 0.3
      );
      slow1 = 4;
    }
  } else {
    slow_id = window.requestAnimationFrame(slow);
    slow_x -= 6;
    if (slow_x <= -100) {
      slow_x = Math.floor(
        Math.random() * (window.innerWidth * 0.25) + window.innerWidth * 0.75
      );
      slow_y = Math.floor(
        Math.random() * (window.innerHeight * 0.35) + window.innerHeight * 0.3
      );
      slow1 = Math.floor(Math.random() * 9);
    }
  }
}

var powerup = new Audio(
  "[Super Mario Bros] PowerUp Sound Effect [Free Ringtone Download].mp3"
);

function slow_check() {
  if (slow_x > 50 && slow_x < 150 && slow_y >= y - 50 && slow_y <= y + 50) {
    powerup.play();
    return true;
  }
}

var img_life = document.getElementById("life");
var life1 = Math.floor(Math.random() * 9);
var life_x = Math.floor(
  Math.random() * (window.innerWidth * 0.25) + window.innerWidth * 0.75
);
var life_y = Math.floor(
  Math.random() * (window.innerHeight * 0.35) + window.innerHeight * 0.3
);
var life_id = null;
function life() {
  if (life1 <= 3) {
    life_id = window.requestAnimationFrame(life);
    c.clearRect(life_x + 6, life_y, 50, 50);
    c.drawImage(img_life, life_x, life_y, 50, 50);
    life_x -= 6;
    if (life_check()) {
      life_support();
    }

    if (life_x <= -100) {
      life_x = Math.floor(
        Math.random() * (window.innerWidth * 0.25) + window.innerWidth * 0.75
      );
      life_y = Math.floor(
        Math.random() * (window.innerHeight * 0.35) + window.innerHeight * 0.3
      );
      life1 = 4;
    }
  } else {
    life_id = window.requestAnimationFrame(life);
    life_x -= 6;
    if (life_x <= -100) {
      life_x = Math.floor(
        Math.random() * (window.innerWidth * 0.25) + window.innerWidth * 0.75
      );
      life_y = Math.floor(
        Math.random() * (window.innerHeight * 0.35) + window.innerHeight * 0.3
      );
      life1 = Math.floor(Math.random() * 9);
    }
  }
}

var powerup = new Audio(
  "[Super Mario Bros] PowerUp Sound Effect [Free Ringtone Download].mp3"
);

function life_check() {
  if (life_x > 50 && life_x < 150 && life_y >= y - 50 && life_y <= y + 50) {
    powerup.play();
    return true;
  }
}

function life_support() {
  r1 = 6;
  r2 = 6;
  r3 = 6;
  r4 = 6;
  r5 = 6;
  c.beginPath();
  c.arc(x6 + 4, x8 - y1, 26, 0, Math.PI * 2, true);

  c.fillStyle = "grey";
  c.fill();
  random1 = 7;
}
