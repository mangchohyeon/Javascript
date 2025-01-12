let roadNum = 0;
let carNum = 0;
const functions = []; // 각 도로의 f(x) 표현을 저장

// 캔버스 초기화 및 기본 원 그리기
const canvas = document.getElementById("myCanvas");
canvas.width = 600;
canvas.height = 400;
const ctx = canvas.getContext("2d");

function drawInitialCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 두 원
  const centerA = { x: 100, y: 200 };
  const centerB = { x: 500, y: 200 };

  ctx.beginPath();
  ctx.arc(centerA.x, centerA.y, 50, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(centerB.x, centerB.y, 50, 0, Math.PI * 2);
  ctx.stroke();
}
drawInitialCanvas(); // 처음 캔버스를 초기화하고 기본 원을 그림

// 도로 개수와 차의 수를 입력받음
document.getElementById("road_num").addEventListener("input", (e) => {
  roadNum = parseInt(e.target.value) || 0;
});

document.getElementById("car_num").addEventListener("input", (e) => {
  carNum = parseInt(e.target.value) || 0;
});

function gen_road() {
  if (roadNum < 1 || roadNum > 10) {
    alert("도로의 수는 1이상 10 이하 이어야 합니다!");
    return;
  }

  // 캔버스 초기화
  drawInitialCanvas();

  // 두 원 사이에 곡선을 그림
  const centerA = { x: 100, y: 200 };
  const centerB = { x: 500, y: 200 };

  for (let i = 0; i < roadNum; i++) {
    const t = (i + 1) / (roadNum + 1); // 비율에 따라 위치 계산
    const controlX = canvas.width / 2; // 중앙 제어점 x좌표
    const controlY = 100 + t * 200;   // y좌표는 비율에 따라 변화

    ctx.beginPath();
    ctx.moveTo(centerA.x, centerA.y);
    ctx.quadraticCurveTo(controlX, controlY, centerB.x, centerB.y);
    ctx.strokeStyle = "black";
    ctx.stroke();
  }

  // 기존 입력창 초기화
  const canvasContainer = document.getElementById("canvas-container");
  canvasContainer.querySelectorAll("input, p").forEach((el) => el.remove());

  // 설명 텍스트 추가
  canvasContainer.innerHTML += `<p>
    각각의 도로에서의 차가 x대 지나갈 때 걸리는 시간(f(x))를 입력하세요.<br>
    형식: f(x) = ax, y = f(x), f(x)
  </p>`;

  // 도로 개수에 따른 입력창 생성
  for (let i = 0; i < roadNum; i++) {
    canvasContainer.innerHTML += `<input 
      type="text" 
      id="func_${i}" 
      placeholder="도로 ${i + 1}의 f(x)를 입력하세요">
    <br>`;
  }
}

// 차량 분배 조합 생성 함수
function generateDistributions(totalCars, roadCount) {
  const distributions = [];
  const current = Array(roadCount).fill(0);

  function backtrack(index, remaining) {
    if (index === roadCount - 1) {
      current[index] = remaining;
      distributions.push([...current]);
      return;
    }

    for (let i = 0; i <= remaining; i++) {
      current[index] = i;
      backtrack(index + 1, remaining - i);
    }
  }

  backtrack(0, totalCars);
  return distributions;
}

function cal_res() {
  if (!roadNum || !carNum) {
    alert("도로의 수와 차의 수를 모두 입력한 후 계산하여 주십시오!");
    return;
  }

  // f(x) 함수들 수집
  for (let i = 0; i < roadNum; i++) {
    const funcInput = document.getElementById(`func_${i}`);
    if (!funcInput || !funcInput.value) {
      alert(`도로 ${i + 1}의 f(x)를 입력해주세요.`);
      return;
    }
    functions[i] = new Function("x", `return ${funcInput.value}`);
  }

  // 모든 가능한 분배 조합 탐색
  const carDistributions = generateDistributions(carNum, roadNum);
  let minTime = Infinity;
  let bestDistribution = [];

  carDistributions.forEach((distribution) => {
    let totalTime = 0;

    // 각 도로의 f(x)를 계산
    for (let i = 0; i < roadNum; i++) {
      const cars = distribution[i]; // 각 도로의 차량 수
      totalTime += functions[i](cars);
    }

    if (totalTime < minTime) {
      minTime = totalTime;
      bestDistribution = distribution;
    }
  });

  // 결과 출력
  let resultMessage = "최적의 차 분배:\n";
  bestDistribution.forEach((cars, index) => {
    resultMessage += `도로 ${index + 1}: ${cars}대\n`;
  });
  resultMessage += `최소 시간: ${minTime}분`;

  alert(resultMessage);
}

