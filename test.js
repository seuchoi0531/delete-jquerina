var character; // 선택된 캐릭터 종류. brave, smart, bully.
var paddle; // 선택된 패들 종류. green, pink, blue.
var stage; // 스테이지 단계. 1,2,3.
var bgm; // 배경음악 종류. 1,2,3.

$(document).ready(function () {
  $("#scene1").show();

  // title 색 변경 함수
  var titleColorIndex = 0;
  setInterval(function () {
    var color_arr = ["#FF0404", "#FFE604", "#FF04E6", "#00FF66"];
    if (titleColorIndex > color_arr.length) {
      titleColorIndex = 0;
    }
    $(".title").css("color", color_arr[titleColorIndex++]);
  }, 300);

  // 마지막 장면 폭죽 관련 함수
  var particles = [];
  const colors = ["#eb6383", "#fa9191", "#ffe9c5", "#b4f2e1"];
  function makeParticle() {
    for (var i = 0; i < 150; i++) {
      const p = document.createElement("particle");
      p.x = window.innerWidth * 0.5;
      p.y = window.innerHeight + Math.random() * window.innerHeight * 0.3;
      p.vel = {
        x: (Math.random() - 0.5) * 10,
        y: Math.random() * -30,
      };
      p.mass = Math.random() * 0.2 + 0.8;
      particles.push(p);
      p.style.transform = `translate(${p.x}px, ${p.y}px)`;
      const size = Math.random() * 15 + 5;
      p.style.width = size + "px";
      p.style.height = size + "px";
      p.style.background = colors[Math.floor(Math.random() * colors.length)];
      document.body.appendChild(p);
    }
  }
  function render() {
    for (var i = particles.length - 1; i--; i > -1) {
      const p = particles[i];
      p.style.transform = `translate3d(${p.x}px, ${p.y}px, 1px)`;

      p.x += p.vel.x;
      p.y += p.vel.y;

      p.vel.y += 0.5 * p.mass;
      if (p.y > window.innerHeight * 2) {
        p.remove();
        particles.splice(i, 1);
      }
    }
    requestAnimationFrame(render);
  }

  // scene 변경
  $("#scene1Btn1").click(function () {
    $("#scene1").hide();
    $("#scene2").show();
  });
  $("#scene1Btn2").click(function () {
    $("#scene1").hide();
    $("#settingScene").show();
  });
  $("#settingSaveBtn").click(function () {
    $("#settingScene").hide();
    $("#scene1").show();
    bgm = $("input[name=bgm]:checked").val();
  });
  $("#scene2Btn1").click(function () {
    $("#scene2").hide();
    $("#scene3").show();
  });
  $("#scene3Btn1").click(function () {
    $("#scene3").hide();
    $("#scene4").show();
  });
  $("#scene4Btn1").click(function () {
    $("#scene4").hide();
    $("#scene5").show();
    character = $("input[name=character]:checked").val();
  });
  $("#scene5Btn1").click(function () {
    $("#scene5").hide();
    $("#scene6").show();
    paddle = $("input[name=paddle]:checked").val();
  });
  // scene6에서 대사 변경 후 scene7로 이동
  var activeScene7 = false;
  $("#scene6Btn1").click(function () {
    if (activeScene7) {
      $("#scene6").hide();
      $("#scene7").show();
    }
    activeScene7 = true;
    $("#scene6 .speach").html(
      "심장에 가장 가까운 바이러스를 없애면 그 외의 모든 바이러스가 사라져 빨리<br>돌아올 수 있지만, 그만큼 강하니 조심하게나.<br>그럼 행운을 빌지..!"
    );
  });
  // stage 선택 시 시작 버튼 활성화
  $("input[name=stage]").change(function () {
    $("#startBtn").removeClass("disableStartBtn");
  });
  $("#startBtn").click(function () {
    // 선택한 stage로 이동
    // stage에 맞는 게임을 실행시켜주시면 됩니다. 임시로 마지막 장면이랑 연결시켰습니다.
    if ($("input[name=stage]").is(":checked")) {
      stage = $("input[name=stage]:checked").val();
      $("#scene7").hide();

      //목으로 가는 이미지
      if(stage==1){
        $("#rect1").show();
      }


      //폐로 가는 이미지
      if(stage==2){
        $("#rect2").show();
      }

      //심장으로 가는 이미지
      if(stage==3){
        $("#rect3").show();
      }

      // $("#lastScene").show();

      // 이 아래는 마지막 장면에서만 사용되는 코드입니다.
      // makeParticle();
      // window.setTimeout(render, 200);
      // $("#lastScene .titleBox").css("cursor", "pointer");
      // $("#lastScene .titleBox").click(makeParticle);
      // 마지막 장면에서 welcome!을 클릭하면 커서 모양이 변하고 폭죽이 다시 터집니다.
    }
  });

  //폐로가는 애니메이트
  $("#box1").click(function(){
    $("#box1").text("")
    $("#box1").animate({height:40, width:40, top:168, left:250})
    $("#oval1").fadeIn('slow');
    $("#rect1").fadeOut(2000);
    $('canvas').show();
    $("#info").show();
  })

  $("#box2").click(function(){
    $("#box2").text("")
    $("#box2").animate({height:40, width:40, top:290, left:213})
    $("#oval2").fadeIn('slow');
    $("#rect2").fadeOut(2000);
    $('canvas').show();
    $("#info").show();
  })

  $("#box3").click(function(){
    $("#box3").text("")
    $("#box3").animate({height:40, width:40, top:322, left:268})
    $("#oval3").fadeIn('slow');
    $("#rect3").fadeOut(2000);
    $('canvas').show();
    $("#info").show();
  })

  // 여기서부터 준원님 코드입니다
  document.body.style.overflow = "hidden"; //스크롤바 제거
  var canvasWidth = 850; // 캔버스 폭
  var canvasHeight = 800; // 캔버스 높이
  window.onresize = function (event) {
    //창 크기 변경하면 작동하는 함수, 작동안됨
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
  };
  document.getElementById("myCanvas").width = canvasWidth;
  document.getElementById("myCanvas").height = canvasHeight;
  var canvas = document.getElementById("myCanvas"); //캔버스
  var ctx = canvas.getContext("2d"); //캔버스컨텍트

  //캔버스 기준으로 좌표설정됨.
  var ballRadius = (1 / 32) * canvas.height;
  var x = canvas.width / 2;
  var y = (15 / 16) * canvas.height;
  var vel = 20;
  var dx = 0;
  var dy = vel;
  var paddleHeight = (1 / 32) * canvas.height;
  var paddleWidth = (10 / 32) * canvas.width;
  var paddleX = (canvas.width - paddleWidth) / 2;
  var brickWidth = (5 / 32) * canvas.width;
  var brickHeight = (1 / 16) * canvas.height;
  var brickUDPadding = (1 / 48) * canvas.height;
  var brickRLPadding = (1 / 32) * canvas.width;
  var brickOffsetTop = (3 / 32) * canvas.height;
  var brickOffsetLeft = (1 / 16) * canvas.width;
  var rightPressed = false; //오른쪽 방향키
  var leftPressed = false; //왼쪽 방향키
  var brickRowCount = 5; //벽돌 열개수
  var brickColumnCount = 2; //벽돌 행개수
  var score = 0; //점수
  var lives = 3; //목숨
  var stage = 1; //난이도
  var winscore = 0; //승리점수
  var breeding_level = 0; // 번식 횟수
  var start_time; // start 버튼을 누른 시간
  var time_limit = 100; //타임 리미트
  var play_time = -1; // 남은 게임 시간

  // bgm
  var audio_breeding = new Audio("breeding_bgm.mp3"); // 번식 이펙트 -> 번식 5초전에 경고.

  // 타이머
  function Timer() {
    var now = new Date();
    var interval = start_time - now.getTime();
    play_time = parseFloat(interval / 1000 + time_limit);
    document.getElementById("timer").innerText = play_time.toFixed(3);
    document.getElementById("progress").value = play_time.toFixed(3);
  }

  // 셔플
  function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i -= 1) {
      j = Math.floor(Math.random() * i);
      x = a[i - 1];
      a[i - 1] = a[j];
      a[j] = x;
    }
    return a;
  }

  // 난이도에 따른 벽돌 체력 설정
  var s_index = 0;
  var bricks = []; //벽돌 배열
  var shuffle_list = [];
  if (stage == 1) shuffle_list = [3, 3, 3, 3, 3, 3, 3, 1, 1, 1];
  else if (stage == 2) shuffle_list = [1, 1, 1, 1, 1, 1, 1, 2, 2, 2];
  else {
  } //보스 스테이지
  shuffle_list = shuffle(shuffle_list);

  for (var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRowCount; r++) {
      bricks[c][r] = { x: 0, y: 0, status: shuffle_list[s_index++] }; //status는 벽돌목숨
      winscore += bricks[c][r].status;
    }
  }

  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);
  document.addEventListener("mousemove", mouseMoveHandler, false);

  //키를 누르고 있을 때 작동
  function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
      rightPressed = true;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
      leftPressed = true;
    }
  }

  //키를 뗐을 때 작동
  function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
      rightPressed = false;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
      leftPressed = false;
    }
  }

  //마우스를 움직일 때 작동
  function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
      paddleX = relativeX - paddleWidth / 2;
    }
  }

  //공이 벽돌에 닿을 때 작동
  function collisionDetection() {
    for (var c = 0; c < brickColumnCount; c++) {
      for (var r = 0; r < brickRowCount; r++) {
        var b = bricks[c][r];
        if (b.status > 0) {
          if (
            collision(
              x,
              y,
              ballRadius,
              bricks[c][r].x,
              bricks[c][r].y,
              brickWidth,
              brickHeight
            )
          ) {
            b.status--; //벽돌 목숨 감소
            score++; //점수 증가
            if (score == winscore) {
              //벽돌이 다 부서지면
              alert("YOU WIN, CONGRATS!");
              // stage++;
              document.location.reload();
            }
          }
        }
      }
    }
  }

  function collision(x, y, r, bx, by, bw, bh) {
    if (x + r > bx && x - r < bx + bw && y + r > by && y - r < by + bh) {
      if (x > bx && x < bx + bw) {
        dy *= -1;
        return true;
      } else if (y > by && y < by + bh) {
        dx *= -1;
        return true;
      }
    } else if (distance(x, y, bx, by) <= r + 2) {
      var temp = dx;
      dx = dy * -1;
      dy = temp * -1;
      return true;
    } else if (distance(x, y, bx + bw, by) <= r + 2) {
      var temp = dx;
      dx = dy;
      dy = temp;
      return true;
    } else if (distance(x, y, bx, by + bh) <= r + 2) {
      var temp = dx;
      dx = dy;
      dy = temp;
      return true;
    } else if (distance(x, y, bx + bw, by + bh) <= r + 2) {
      var temp = dx;
      dx = dy * -1;
      dy = temp * -1;
      return true;
    }
    return false;
  }

  function distance(x, y, a, b) {
    return Math.sqrt((x - a) * (x - a) + (y - b) * (y - b));
  }

  //공 그리기
  function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
  }

  //패들 그리기
  function drawPaddle() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, canvas.height - paddleHeight, canvas.width, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fillRect(
      paddleX,
      canvas.height - paddleHeight,
      paddleWidth,
      paddleHeight
    );
  }

  // 번식
  function breeding() {
    breeding_level++;
    // 이펙트 및 효과음 주기. 번식 횟수마다 다르게 하려면 breeding level 활용하기
    // 추후 논의

    for (var c = 0; c < brickColumnCount; c++) {
      for (var r = 0; r < brickRowCount; r++) {
        if (bricks[c][r].status == 0) {
          var breeding_status;
          var random_status = Math.floor(Math.random() * 10); // 0~9
          if (random_status == 0 || random_status >= 7) breeding_status = 0;
          else if (random_status >= 5) breeding_status = 3;
          else if (random_status >= 3) breeding_status = 2;
          else breeding_status = 1;
          bricks[c][r].status = breeding_status;
          winscore += bricks[c][r].status;
        }
      }
    }
  }

  //벽돌 그리기
  function drawBricks() {
    for (var c = 0; c < brickColumnCount; c++) {
      for (var r = 0; r < brickRowCount; r++) {
        if (bricks[c][r].status > 0) {
          var brickX = r * (brickWidth + brickRLPadding) + brickOffsetLeft;
          var brickY = c * (brickHeight + brickUDPadding) + brickOffsetTop;
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          if (bricks[c][r].status == 3) ctx.fillStyle = "red";
          else if (bricks[c][r].status == 2) ctx.fillStyle = "orange";
          else if (bricks[c][r].status == 1) ctx.fillStyle = "yellow";
          ctx.fillRect(brickX, brickY, brickWidth, brickHeight);
        }
      }
    }
  }

  //점수 그리기
  function drawScore() {
    var str = score + "point";
    document.getElementById("score_div").innerText = str;
  }

  //목숨 그리기
  function drawLives() {
    var str = "<img src='images/heart.png'>" + " " + lives;
    document.getElementById("lives_div").innerHTML = str;
  }

  //타이머 이미지 그리기
  function drawTimerImg() {
    var str = "<img src='images/timer.png' />";
    document.getElementById("timer_img_div").innerHTML = str;
  }

  //번식 이미지 그리기
  function drawBreedingImg() {
    var str = "<img src='images/timeVirus.png' />";
    if (play_time >= 75)
      document.getElementById("breeding_img1").innerHTML = str;
    else document.getElementById("breeding_img1").innerHTML = "";
    if (play_time >= 50)
      document.getElementById("breeding_img2").innerHTML = str;
    else document.getElementById("breeding_img2").innerHTML = "";
    if (play_time >= 25)
      document.getElementById("breeding_img3").innerHTML = str;
    else document.getElementById("breeding_img3").innerHTML = "";
  }

  // 프로그레스 바 그리기
  function drawProgressBar() {
    var obj = document.getElementById("progress_div");
    obj.innerHTML =
      "<progress id='progress' value='100' min='0' max='100'></progress>";
  }

  //main
  function draw() {
    drawProgressBar();
    Timer();

    // 게임시간이 0 이되면 게임종료.
    if (play_time < 0) {
      alert("GAME OVER");
      document.location.reload();
      return;
    }

    // breeding bgm, breeding 5초 전에 play
    if (
      Math.floor(play_time) == 80 ||
      Math.floor(play_time) == 55 ||
      Math.floor(play_time) == 30 ||
      Math.floor(play_time) == 5
    ) {
      audio_breeding.play();
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    drawTimerImg();
    drawBreedingImg();
    collisionDetection();

    //캔버스 좌우에 공이 닿을 때
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
      dx = -dx;
    }
    //캔버스 위에 공이 닿을 때
    if (y + dy < ballRadius) {
      dy = -dy;
    } else if (y + dy > canvas.height - ballRadius - paddleHeight) {
      // 캔버스 아래에 공이 닿을 때
      if (x > paddleX && x < paddleX + paddleWidth) {
        // 패들위치라면
        var signX;
        var m;
        var n;
        var angle;
        if (x < paddleX + paddleWidth / 2) {
          signX = -1;
          m = x - paddleX;
          n = paddleX + paddleWidth / 2 - x;
        } else if (x > paddleX + paddleWidth / 2) {
          signX = 1;
          m = paddleX + paddleWidth - x;
          n = paddleX + paddleWidth / 2 + x;
        } else {
          signX = 0;
          m = 89;
          n = -1;
        }
        angle = (((90 * m) / (m + n)) * 70) / 90 + 10;
        dx = Math.cos((angle * Math.PI) / 180) * signX * vel;
        dy = -Math.sin((angle * Math.PI) / 180) * vel;
      } else {
        lives--;
        if (!lives) {
          alert("GAME OVER");
          document.location.reload();
        } else {
          x = canvas.width / 2;
          y = canvas.height - 100;
          dx = 0;
          dy = vel;
          paddleX = (canvas.width - paddleWidth) / 2;
        }
      }
    }

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
      paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
      paddleX -= 7;
    }

    x += dx;
    y += dy;
    requestAnimationFrame(draw);
  }

  //setting
  function setting() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "40px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Setting", (canvas.width * 2) / 5 - 10, canvas.height / 4);
  }

  var cx = -1;
  var cy = -1;
  //menu
  function menu() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "40px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Destoy", (canvas.width * 2) / 5 - 10, canvas.height / 4);
    ctx.fillText(
      "Jquerina",
      (canvas.width * 2) / 5 - 25,
      canvas.height / 4 + 40
    );

    ctx.fillStyle = "#0095DD";
    ctx.fillRect(
      (canvas.width * 3) / 8,
      (canvas.height * 3) / 7,
      canvas.width / 4,
      canvas.height / 7
    );
    ctx.fillRect(
      (canvas.width * 3) / 8,
      (canvas.height * 5) / 7,
      canvas.width / 4,
      canvas.height / 7
    );
    ctx.fillRect(0, 0, canvas.width / 6, canvas.height / 7);

    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Start", (canvas.width * 4) / 9, (canvas.height * 4) / 7 - 20);
    ctx.fillText(
      "Setting",
      (canvas.width * 4) / 9,
      (canvas.height * 6) / 7 - 20
    );

    canvas.onMouseOver = function (event) {
      // 커서변경, 작동안됨
      var x = event.clientX;
      var y = event.clientY;
      if (x >= (canvas.width * 3) / 8 && x <= (canvas.width * 5) / 8) {
        if (y >= (canvas.height * 3) / 7 && y <= (canvas.width * 4) / 7)
          canvas.cursor = "pointer";
      }
    };
    canvas.onclick = function (event) {
      // start클릭
      cx = event.clientX;
      cy = event.clientY;
      if (cx >= 0 && cx <= canvas.width / 6) {
        if (cy >= 0 && cy <= canvas.height / 7) {
          window.resizeTo(
            window.screen.availWidth / 2,
            window.screen.availWHeight / 2
          );
        }
      } else if (cx >= (canvas.width * 3) / 8 && cx <= (canvas.width * 5) / 8) {
        if (cy >= (canvas.height * 3) / 7 && cy <= (canvas.width * 4) / 7) {
          // 스테이지 바뀔 떄
          start_time = new Date().getTime();
          setInterval(breeding, 25000); //번식 타이머 작동
          draw();
        } else if (
          cy >= (canvas.height * 5) / 7 &&
          cy <= (canvas.width * 6) / 7
        )
          setting();
      }
    };
  }
  menu();
});
