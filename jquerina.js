// 2022 web programming team project
var character = "brave"; // 선택된 캐릭터 종류. brave, smart, bully.
var paddle = "green"; // 선택된 패들 종류. green, pink, blue.
var stage = 1; // 스테이지 단계. 1,2,3.
var bgm = 1; // 배경음악 종류. 1,2,3.
var start_time; // start 버튼을 누른 시간
var time_limit = 100; //타임 리미트
var play_time = -1; // 남은 게임 시간
var start = 0; //draw함수를 반복하는 requestAnimationFrame함수를 제어하는 변수
var winscore = 0; //승리점수
var canvasWidth = 850; // 캔버스 폭
var canvasHeight = 740; // 캔버스 높이
var x = canvasWidth / 2;
var y = canvasHeight - 400;
var vel = 13; // 공 속도
var dx = 0; // 공의 x축 방향 속도
var dy = vel;// 공의 y축 방향 속도
var bdinterval1; // 1스테이지 번식 interval
var bdinterval2; // 2스테이지 번식 interval
var isPlayed = 0; // 게임 진행 여부

// bgm 관련
var audio_breeding = new Audio("audio/breeding_bgm.mp3"); // 번식 이펙트 -> 번식 5초전에 경고.
var wall_bgm = new Audio("audio/wall_bgm.mp3"); //벽, 패들에 공이 닿을 때
var background1 = new Audio("audio/background1.mp3"); //배경음악1
var background2 = new Audio("audio/background2.mp3"); //배경음악2
var background3 = new Audio("audio/background3.wav"); //배경음악3
var brick_hit1 = new Audio("audio/brick_hit1.wav"); //1레벨 벽돌 맞을 때
var brick_hit2 = new Audio("audio/brick_hit2.wav"); //2레벨 벽돌 맞을 때
var brick_hit3 = new Audio("audio/brick_hit3.wav"); //3레벨 벽돌 맞을 때
var doctor_bgm = new Audio("audio/doctor_bgm.mp3"); //scene 배경음악
var setting_bgm = new Audio("audio/setting_bgm.mp3"); //설정창 배경음악
var challenge1 = new Audio("audio/challenge1.mp3"); //scene에서 게임으로 넘어가는 화면 배경음악
challenge1.volume = 0.5;
var button = new Audio("audio/button.wav"); //scene에서 버튼 누를 때
var clear = new Audio("audio/complete.ogg"); //이겼을 때
var lose = new Audio("audio/fail.ogg"); //졌을 때

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
      p.mass = Math.random() * 0.2 + 0.8; // 속도 변화 관련
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
        p.remove(); // 일정 범위 벗어나면 삭제
        particles.splice(i, 1);
      }
    }
    requestAnimationFrame(render);
  }

  setInterval(function () {
    setTimeout(function () {
      document.getElementById("closeddoctor2").style.display = "block";
      setTimeout(function () {
        document.getElementById("closeddoctor2").style.display = "none";
        setTimeout(function () {
          document.getElementById("closeddoctor2").style.display = "block";
          setTimeout(function () {
            document.getElementById("closeddoctor2").style.display = "none";
          }, 500);
        }, 200);
      }, 500);
    }, 0);
  }, 3000);
  setInterval(function () {
    setTimeout(function () {
      document.getElementById("closeddoctor3").style.display = "block";
      setTimeout(function () {
        document.getElementById("closeddoctor3").style.display = "none";
        setTimeout(function () {
          document.getElementById("closeddoctor3").style.display = "block";
          setTimeout(function () {
            document.getElementById("closeddoctor3").style.display = "none";
          }, 500);
        }, 200);
      }, 500);
    }, 0);
  }, 3000);
  setInterval(function () {
    setTimeout(function () {
      document.getElementById("closeddoctor4").style.display = "block";
      setTimeout(function () {
        document.getElementById("closeddoctor4").style.display = "none";
        setTimeout(function () {
          document.getElementById("closeddoctor4").style.display = "block";
          setTimeout(function () {
            document.getElementById("closeddoctor4").style.display = "none";
          }, 500);
        }, 200);
      }, 500);
    }, 0);
  }, 3000);
  setInterval(function () {
    setTimeout(function () {
      document.getElementById("closeddoctor5").style.display = "block";
      setTimeout(function () {
        document.getElementById("closeddoctor5").style.display = "none";
        setTimeout(function () {
          document.getElementById("closeddoctor5").style.display = "block";
          setTimeout(function () {
            document.getElementById("closeddoctor5").style.display = "none";
          }, 500);
        }, 200);
      }, 500);
    }, 0);
  }, 3000);
  setInterval(function () {
    setTimeout(function () {
      document.getElementById("closeddoctor6").style.display = "block";
      setTimeout(function () {
        document.getElementById("closeddoctor6").style.display = "none";
        setTimeout(function () {
          document.getElementById("closeddoctor6").style.display = "block";
          setTimeout(function () {
            document.getElementById("closeddoctor6").style.display = "none";
          }, 500);
        }, 200);
      }, 500);
    }, 0);
  }, 3000);
  setInterval(function () {
    setTimeout(function () {
      document.getElementById("closeddoctor7").style.display = "block";
      setTimeout(function () {
        document.getElementById("closeddoctor7").style.display = "none";
        setTimeout(function () {
          document.getElementById("closeddoctor7").style.display = "block";
          setTimeout(function () {
            document.getElementById("closeddoctor7").style.display = "none";
          }, 500);
        }, 200);
      }, 500);
    }, 0);
  }, 3000);
  setInterval(function () {
    setTimeout(function () {
      document.getElementById("closeddoctor8").style.display = "block";
      setTimeout(function () {
        document.getElementById("closeddoctor8").style.display = "none";
        setTimeout(function () {
          document.getElementById("closeddoctor8").style.display = "block";
          setTimeout(function () {
            document.getElementById("closeddoctor8").style.display = "none";
          }, 500);
        }, 200);
      }, 500);
    }, 0);
  }, 3000);

  // scene 변경
  $("#scene1Btn1").click(function () {
    button.play();
    $("#scene1").hide();
    $("#scene2").show();
    doctor_bgm.play();
  });
  // 배경음악 설정
  $("#scene1Btn2").click(function () {
    button.play();
    $("#scene1").hide();
    $("#settingScene").show();
    setting_bgm.play();

    $("#bgm1").click(function () {
      if (!setting_bgm.paused) setting_bgm.pause();
      if (!background2.paused) background2.pause();
      if (!background3.paused) background3.pause();
      background1.load();
      background1.play();
    });
    $("#bgm2").click(function () {
      if (!setting_bgm.paused) setting_bgm.pause();
      if (!background1.paused) background1.pause();
      if (!background3.paused) background3.pause();
      background2.load();
      background2.play();
    });
    $("#bgm3").click(function () {
      if (!setting_bgm.paused) setting_bgm.pause();
      if (!background1.paused) background1.pause();
      if (!background2.paused) background2.pause();
      background3.load();
      background3.play();
    });
  });
  $("#settingSaveBtn").click(function () {
    button.play();
    $("#settingScene").hide();

    if (!setting_bgm.paused) {
      setting_bgm.pause();
      setting_bgm.load();
    }
    if (!background1.paused) {
      background1.pause();
      background1.load();
    }
    if (!background2.paused) {
      background2.pause();
      background2.load();
    }
    if (!background3.paused) {
      background3.pause();
      background3.load();
    }
    setting_bgm.pause();
    $("#scene1").show();
    bgm = parseInt($("input[name=bgm]:checked").val());
  });

  // 스킵 버튼
  $("#skipBtn2").click(function () {
    button.play();
    $("#scene2").hide();
    $("#scene7").show();
    activeScene7 = true;
  });
  $("#scene2Btn1").click(function () {
    button.play();
    $("#scene2").hide();
    $("#scene3").show();
  });
  $("#scene2Btn2").click(function () {
    button.play();
    $("#scene2").hide();
    $("#scene1").show();
    doctor_bgm.pause();
    doctor_bgm.currentTime = 0;
  });
  $("#skipBtn3").click(function () {
    button.play();
    $("#scene3").hide();
    $("#scene7").show();
    activeScene7 = true;
  });
  $("#scene3Btn1").click(function () {
    button.play();
    $("#scene3").hide();
    $("#scene4").show();
  });
  $("#scene3Btn2").click(function () {
    button.play();
    $("#scene3").hide();
    $("#scene2").show();
  });
  $("#skipBtn4").click(function () {
    button.play();
    $("#scene4").hide();
    $("#scene7").show();
    activeScene7 = true;
  });
  $("#scene4Btn1").click(function () {
    button.play();
    $("#scene4").hide();
    $("#scene5").show();
    character = $("input[name=character]:checked").val();
  });
  $("#scene4Btn2").click(function () {
    button.play();
    $("#scene4").hide();
    $("#scene3").show();
  });
  $("#skipBtn5").click(function () {
    button.play();
    $("#scene5").hide();
    $("#scene7").show();
    activeScene7 = true;
  });
  $("#scene5Btn1").click(function () {
    button.play();
    $("#scene5").hide();
    $("#scene6").show();
    paddle = $("input[name=paddle]:checked").val();
  });
  $("#scene5Btn2").click(function () {
    button.play();
    $("#scene5").hide();
    $("#scene4").show();
  });
  // scene6에서 대사 변경 후 scene7로 이동
  var activeScene7 = false;
  $("#scene6Btn1").click(function () {
    button.play();
    if (activeScene7) {
      $("#scene6").hide();
      $("#scene7").show();
    }
    activeScene7 = true;
    $("#scene6 .speach").html(
      "심장에 가장 가까운 바이러스를 없애면 그 외의 모든 바이러스가 사라져 빨리<br>돌아올 수 있지만, 그만큼 강하니 조심하게나.<br>그럼 행운을 빌지..!"
    );
  });
  $("#scene6Btn2").click(function () {
    button.play();
    if (!activeScene7) {
      $("#scene6").hide();
      $("#scene5").show(); // 동일한 화면 재사용
    }
    activeScene7 = false;
    $("#scene6 .speach").html(
      "이제 준비는 다 되었군. 이것이 자네가 없애야 할 바이러스의 모습이네.<br>각각 항생 물질을 1번, 2번, 10번 맞아야 사라지고 심장에 가까워질수록 강해지지..."
    );
  });
  // stage 선택 시 시작 버튼 활성화
  $("input[name=stage]").change(function () {
    $("#startBtn").removeClass("disableStartBtn");
  });
  $("#scene7Btn2").click(function () {
    button.play();
    $("#scene7").hide();
    $("#scene6").show();
  });
  // 난이도에 따른 바이러스 체력 설정
  var s_index = 0; // 바이러스 배열의 인덱스
  var bricks = []; // 바이러스 배열
  var shuffle_list = []; // 바이러스 체력 관련 배열

  // 게임 시작 버튼 클릭
  $("#startBtn").click(function () {
    button.play();
    doctor_bgm.pause();
    // 선택한 stage로 이동
    if ($("input[name=stage]").is(":checked")) {
      stage = parseInt($("input[name=stage]:checked").val());
      $("#scene7").hide();
      //목으로 이동
      challenge1.play();
      if (stage == 1) {
        $("#rect1").show();
      }
      //폐로 이동
      if (stage == 2) {
        $("#rect2").show();
      }
      //심장으로 이동
      if (stage == 3) {
        $("#rect3").show();
      }
    }
  });
  // 게임 다시하기
  $("#resetBtn").click(function () {
    document.location.reload();
  });
  // 공 설정 초기화
  function resetBall() {
    x = canvasWidth / 2;
    y = canvasHeight - 400;
    dx = 0;
    dy = vel;
  }
  //목으로 이동하는 화면
  $("#box1").click(function () {
    resetBall();
    s_index = 0;
    shuffle_list1 = [1, 1, 1, 1, 1, 1, 1, 2, 2, 2];
    shuffle_list = shuffle(shuffle_list1);
    for (var c = 0; c < brickColumnCount; c++) {
      bricks[c] = [];
      for (var r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: shuffle_list[s_index++] }; //status는 바이러스 목숨
        winscore += bricks[c][r].status;
      }
    }
    button.play();
    $(".clickInfo").hide();
    $("#box1").animate({ height: 40, width: 40, top: 168, left: 250 });
    $("#oval1").fadeIn("slow");
    $("#rect1").fadeOut(2000);
    $("#myCanvas").show();
    $("#info").fadeIn(2000);
    challenge1.pause();
    start = 1;
    setTimeout(function () {
      start_time = new Date().getTime();
      draw();
      bdinterval1 = setInterval(breeding, 25000);
    }, 2000);
  });
  // 폐로 이동하는 화면
  $("#box2").click(function () {
    resetBall();
    s_index = 0;
    shuffle_list2 = [1, 1, 1, 1, 1, 2, 2, 2, 3, 3];
    shuffle_list = shuffle(shuffle_list2);
    for (var c = 0; c < brickColumnCount; c++) {
      bricks[c] = [];
      for (var r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: shuffle_list[s_index++] }; //status는 벽돌목숨
        winscore += bricks[c][r].status;
      }
    }
    button.play();
    $(".clickInfo").hide();
    $("#box2").animate({ height: 40, width: 40, top: 290, left: 213 });
    $("#oval2").fadeIn("slow");
    $("#rect2").fadeOut(2000);
    if (isPlayed) {
      canvas.style.background = "#6f74ce";
      document.getElementById("info").style.background = "#6f74ce";
      document.getElementById("progress").value = 100;
      document.getElementById("timer").innerText = "100.000";
      document.getElementsByClassName("breedingimgs")[0].style.display =
        "block";
      document.getElementsByClassName("breedingimgs")[1].style.display =
        "block";
      document.getElementsByClassName("breedingimgs")[2].style.display =
        "block";
    }
    $("#myCanvas").show();
    $("#info").fadeIn(2000);
    challenge1.pause();
    start = 1;
    setTimeout(function () {
      start_time = new Date().getTime();
      draw();
      bdinterval2 = setInterval(breeding, 25000);
    }, 2000);
  });
  // 심장으로 이동하는 화면
  $("#box3").click(function () {
    resetBall();
    winscore = score + bosslives; // 보스 체력만큼
    button.play();
    $(".clickInfo").hide();
    $("#box3").animate({ height: 40, width: 40, top: 322, left: 268 });
    $("#oval3").fadeIn("slow");
    $("#rect3").fadeOut(2000);
    if (isPlayed) {
      canvas.style.background = "#f6c03e";
      document.getElementById("info").style.background = "#f6c03e";
      document.getElementById("progress").value = 100;
      document.getElementById("timer").innerText = "100.000";
    }
    $("#myCanvas").show();
    $("#info").fadeIn(2000);
    document.getElementsByClassName("breedingimgs")[0].style.display = "none";
    document.getElementsByClassName("breedingimgs")[1].style.display = "none";
    document.getElementsByClassName("breedingimgs")[2].style.display = "none";
    challenge1.pause();
    start = 1;
    setTimeout(function () {
      start_time = new Date().getTime();
      draw();
      bdinterval2 = setInterval(function () {
          bosslives += 5;
          winscore += 5;
      }, 25000);
    }, 2000);
  });

  // canvas 관련 변수
  document.body.style.overflow = "hidden"; //스크롤바 제거
  document.getElementById("myCanvas").width = canvasWidth;
  document.getElementById("myCanvas").height = canvasHeight;
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d"); //캔버스 컨택스트
  var ballRadius = 25;
  var paddleHeight = 20;
  var paddleWidth = 350;
  var paddleX = (canvas.width - paddleWidth) / 2;
  var brickWidth = 135;
  var brickHeight = 55;
  var brickUDPadding = (1 / 48) * canvas.height; // 바이러스 간의 위아래 간격
  var brickRLPadding = (1 / 32) * canvas.width; // 바이러스 간의 좌우 간격
  var brickOffsetTop = (3 / 32) * canvas.height;
  var brickOffsetLeft = (1 / 16) * canvas.width;
  var rightPressed = false; //오른쪽 방향키
  var leftPressed = false; //왼쪽 방향키
  var brickRowCount = 5; //바이러스 열개수
  var brickColumnCount = 2; //바이러스 행개수
  var score = 0; //점수
  var lives = 3; //목숨
  var bosslives = 20; //보스 체력
  var bdx = 6; //보스 속도
  var bossX = canvas.width / 2 - 80; //보스 x좌표
  var bossY = 100; //보스 y좌표
  var bossWidth = 135; //보스 가로길이
  var bossHeight = 55; //보스 세로길이

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

  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);
  document.addEventListener("mousemove", mouseMoveHandler, false);

  //키를 누르고 있을 때 작동
  function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
      rightPressed = true;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
      leftPressed = true;
    } else if (e.key == "p") score = winscore - 1;
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
      paddleX = relativeX - (paddleWidth * 1) / 2;
    }
  }

  //공이 벽돌에 닿을 때 작동
  function collisionDetection() {
    if (stage != 3) {
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

              if (b.status == 0) brick_hit1.play();
              else {
                brick_hit2.currentTime = 0.5;
                brick_hit2.play();
              }
              score++; //점수 증가
              if (score == winscore) {
                //벽돌이 다 부서지면
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                if (stage == 1) clearInterval(bdinterval1);
                else if (stage == 2) clearInterval(bdinterval2);
                isPlayed = 1;
                start = 0;
                $("#myCanvas").fadeOut(2000);
                $("#info").fadeOut(2000);
                stage++;
                setTimeout(function () {
                  $("#rect" + stage).fadeIn(2000);
                  $(".clickInfo").show();
                }, 2000);
              }
            }
          }
        }
      }
    } else {
      // 보스 스테이지
      if (bosslives > 0) {
        if (collision(x, y, ballRadius, bossX, bossY, bossWidth, bossHeight)) {
          brick_hit3.currentTime = 3;
          brick_hit3.play();
          bosslives--;
          score++;
          if (score == winscore) {
            start = 0;
            $("#myCanvas").fadeOut(2000);
            $("#info").fadeOut(2000);
            setTimeout(function () {
              $("#container").fadeIn(2000);
              $("#lastScene").fadeIn(2000);
            }, 2000);
            makeParticle();
            if (!background1.paused) background1.pause();
            if (!background2.paused) background2.pause();
            if (!background3.paused) background3.pause();
            clear.play();
            window.setTimeout(render, 200);
            $("#lastScene .titleBox").css("cursor", "pointer");
            $("#lastScene .titleBox").click(makeParticle);
            $("#resetBtn").click(function () {
              document.location.reload();
            });
          }
        }
      }
    }
  }

  //충돌 여부
  function collision(x, y, r, bx, by, bw, bh) {
    if (x > bx && x < bx + bw && y > by - r && y < by + bh + r) {
      dy *= -1;
      return true;
    } else if (y > by && y < by + bh && x > bx - r && x < bx + bw + r) {
      if (bdx * dx < 0) bdx *= -1;
      dx *= -1;
      return true;
    } else if (distance(x, y, bx, by) <= r) {
      if (bdx * dx < 0) bdx *= -1;
      var temp = dx;
      dx = dy * -1;
      dy = temp * -1;
      return true;
    } else if (distance(x, y, bx + bw, by) <= r) {
      if (bdx * dx < 0) bdx *= -1;
      var temp = dx;
      dx = dy;
      dy = temp;
      return true;
    } else if (distance(x, y, bx, by + bh) <= r) {
      if (bdx * dx < 0) bdx *= -1;
      var temp = dx;
      dx = dy;
      dy = temp;
      return true;
    } else if (distance(x, y, bx + bw, by + bh) <= r) {
      if (bdx * dx < 0) bdx *= -1;
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
    var ballimg = new Image();
    if (character == "brave") ballimg.src = "images/ball1.png";
    else if (character == "smart") ballimg.src = "images/ball2.png";
    else if (character == "bully") ballimg.src = "images/ball3.png";
    ctx.drawImage(
      ballimg,
      x - ballRadius,
      y - ballRadius,
      ballRadius * 2,
      ballRadius * 2
    );
  }

  //패들 그리기
  function drawPaddle() {
    var paddletype = new Image();
    if (paddle == "green") paddletype.src = "images/paddle1.png";
    else if (paddle == "pink") paddletype.src = "images/paddle2.png";
    else if (paddle == "blue") paddletype.src = "images/paddle3.png";
    ctx.drawImage(
      paddletype,
      paddleX,
      canvas.height - paddleHeight,
      paddleWidth,
      paddleHeight
    );
  }

  // 번식
  function breeding() {
    var cnt = 0; // 번식된 바이러스의 갯수
    var empty_cnt = 0; // 체력 0인 바이러스의 갯수
    var empty = []; // 바이러스가 없는 위치정보
    for (var c = 0; c < brickColumnCount; c++) {
      for (var r = 0; r < brickRowCount; r++) {
        if (stage == 1) {
          if (bricks[c][r].status == 0) {
            empty[empty_cnt] = c * 1000 + r;
            empty_cnt++;
            var breeding_status;
            var random_status = Math.floor(Math.random() * 10); // 0~9
            if (random_status >= 4) breeding_status = 0; // 60%
            else if (random_status >= 2) { // 20%
              breeding_status = 1;
              cnt++;
            } else { // 20%
              breeding_status = 2;
              cnt++;
            }
            winscore += breeding_status;
            bricks[c][r].status = breeding_status;
          }
        } else if (stage == 2) {
          if (bricks[c][r].status == 0) {
            empty[empty_cnt] = c * 1000 + r;
            empty_cnt++;
            var breeding_status;
            var random_status = Math.floor(Math.random() * 10); // 0~9
            if (random_status >= 8) breeding_status = 0; // 20%
            else if (random_status >= 4) { //40%
              breeding_status = 1;
              cnt++;
            } else if (random_status >= 2) { //20%
              breeding_status = 2;
              cnt++;
            } else { //20%
              breeding_status = 3;
              cnt++;
            }
            winscore += breeding_status;
            bricks[c][r].status = breeding_status;
          }
        }
      }
    }
    //빈 공간은 있지만 번식이 안된 경우, 최소 1개는 번식.
    if (empty_cnt > 0 && cnt == 0) {
      empty = shuffle(empty);
      var locate_c = parseInt(empty[0] / 1000);
      var locate_r = parseInt(empty[0]) % 1000;
      bricks[locate_c][locate_r].status = stage;
      winscore += stage;
    }
  }

  //벽돌 그리기
  function drawBricks() {
    var virus1 = new Image();
    virus1.src = "images/virus1.png";
    var virus2 = new Image();
    virus2.src = "images/virus2.png";
    var virus3 = new Image();
    virus3.src = "images/virus3.png";
    for (var c = 0; c < brickColumnCount; c++) {
      for (var r = 0; r < brickRowCount; r++) {
        if (bricks[c][r].status > 0) {
          var brickX = r * (brickWidth + brickRLPadding) + brickOffsetLeft;
          var brickY = c * (brickHeight + brickUDPadding) + brickOffsetTop;
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          if (bricks[c][r].status == 1)
            ctx.drawImage(virus1, brickX, brickY, brickWidth, brickHeight);
          else if (bricks[c][r].status == 2)
            ctx.drawImage(virus2, brickX, brickY, brickWidth, brickHeight);
          else ctx.drawImage(virus3, brickX, brickY, brickWidth, brickHeight);
        }
      }
    }
  }

  //보스 그리기
  function drawBoss() {
    var boss = new Image();
    boss.src = "images/boss.png";
    if (bosslives > 0) ctx.drawImage(boss, bossX, bossY, bossWidth, bossHeight);
    ctx.font = "32px neodgm";
    ctx.fillStyle = "black";
    ctx.fillText(winscore - score, bossX + bossWidth / 2 - 5, bossY - 20);
  }

  //점수 그리기
  function drawScore() {
    var str = score + " point";
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
    if (bgm == 1) background1.play();
    if (bgm == 2) background2.play();
    if (bgm == 3) background3.play();
    drawProgressBar();
    Timer();

    // 게임시간이 0 이되면 게임종료.
    if (play_time < 0) {
      start = 0;
      $("#myCanvas").fadeOut(2000);
      $("#info").fadeOut(2000);
      setTimeout(function () {
        $("#failedScene").fadeIn(2000);
      }, 2000);
      if (!background1.paused) background1.pause();
      if (!background2.paused) background2.pause();
      if (!background3.paused) background3.pause();
      lose.play();
      $("#failedScene #resetBtn").click(function () {
        document.location.reload();
      });
      return;
    }

    // breeding bgm, breeding 5초 전에 play
    if (stage != 3) {
      if (
        Math.floor(play_time) == 80 ||
        Math.floor(play_time) == 55 ||
        Math.floor(play_time) == 30 ||
        Math.floor(play_time) == 5
      ) {
        audio_breeding.play();
        document.getElementById("timer").style.color = "red";
        setTimeout(function () {
          document.getElementById("timer").style.color = "black";
        }, 5000);
      }
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (stage == 1) {
      canvas.style.background = "#ff9797";
      document.getElementById("info").style.background = "#ff9797";
    } else if (stage == 2) {
      canvas.style.background = "#6f74ce";
      document.getElementById("info").style.background = "#6f74ce";
    } else if (stage == 3) {
      canvas.style.background = "#f6c03e";
      document.getElementById("info").style.background = "#f6c03e";
    }
    if (stage != 3) drawBricks();
    else drawBoss();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    drawTimerImg();
    if (stage != 3) drawBreedingImg();
    drawBall();
    collisionDetection();

    //캔버스 좌우에 공이 닿을 때
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
      wall_bgm.play();
      dx = -dx;
    }
    //캔버스 위에 공이 닿을 때
    if (y + dy < ballRadius) {
      wall_bgm.play();
      dy = -dy;
    } else if (y + dy > canvas.height - ballRadius - paddleHeight) {
      // 캔버스 아래에 공이 닿을 때
      wall_bgm.play();
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
          start = 0;
          $("#myCanvas").fadeOut(2000);
          $("#info").fadeOut(2000);
          setTimeout(function () {
            $("#failedScene").fadeIn(2000);
          }, 2000);
          if (!background1.paused) background1.pause();
          if (!background2.paused) background2.pause();
          if (!background3.paused) background3.pause();
          lose.play();
          $("#failedScene #resetBtn").click(function () {
            document.location.reload();
          });
        } else {
          x = canvas.width / 2;
          y = canvas.height - 400;
          dx = 0;
          dy = 0;
          paddleX = (canvas.width - paddleWidth) / 2;
          setTimeout(function () {
            dy = vel;
          }, 1000);
        }
      }
    }
    // 보스 움직임 제한
    if (bossX + bdx > canvas.width - bossWidth || bossX + bdx < 0) bdx = -bdx;

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
      paddleX += 20;
    } else if (leftPressed && paddleX > 0) {
      paddleX -= 20;
    }

    x += dx;
    y += dy;
    if (stage == 3) bossX += bdx;
    if (start == 1) requestAnimationFrame(draw);
  }
});
