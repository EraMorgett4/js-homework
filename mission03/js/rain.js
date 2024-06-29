function r(from, to) {
  return ~~(Math.random() * (to - from + 1) + from);
}
function pick() {
  return arguments[r(0, arguments.length - 1)];
}

// 이름 목록 정의
const names = ["jason", "tom", "ellma", "michelle", "andy", "hank", "bob"];

// 이름을 무작위로 선택하는 함수
function getName() {
  return pick(...names);
}

// getChar 함수를 이름 선택 함수로 대체
function getChar() {
  return getName();
}

function loop(fn, delay) {
  let stamp = Date.now();
  function _loop() {
    if (Date.now() - stamp >= delay) {
      fn();
      stamp = Date.now();
    }
    requestAnimationFrame(_loop);
  }
  requestAnimationFrame(_loop);
}

class Char {
  constructor() {
    this.element = document.createElement("span");
    this.mutate();
  }
  mutate() {
    this.element.textContent = getChar();
  }
}

class Trail {
  constructor(list = [], options) {
    this.list = list;
    this.options = Object.assign({ size: 10, offset: 0 }, options);
    this.body = [];
    this.move();
  }
  traverse(fn) {
    this.body.forEach((n, i) => {
      let last = i == this.body.length - 1;
      if (n) fn(n, i, last);
    });
  }
  move() {
    this.body = [];
    let { offset, size } = this.options;
    for (let i = 0; i < size; ++i) {
      let item = this.list[offset + i - size + 1];
      this.body.push(item);
    }
    this.options.offset = (offset + 1) % (this.list.length + size - 1);
  }
}

class Rain {
  constructor({ target, row, speed, colorHue, saturation }) {
    this.element = document.createElement("p");
    this.speed = speed; // 속도 추가
    this.colorHue = colorHue; // 색조 추가
    this.saturation = saturation; // 채도 추가
    this.build(row);
    if (target) {
      target.appendChild(this.element);
    }
    this.drop();
  }
  build(row = 20) {
    let root = document.createDocumentFragment();
    let chars = [];
    for (let i = 0; i < row; ++i) {
      let c = new Char();
      root.appendChild(c.element);
      chars.push(c);
      if (Math.random() < 0.5) {
        loop(() => c.mutate(), r(1e3, 5e3));
      }
    }
    this.trail = new Trail(chars, {
      size: r(10, 30),
      offset: r(0, 100),
    });
    this.element.appendChild(root);
  }
  drop() {
    let trail = this.trail;
    let len = trail.body.length;
    let delay = this.speed; // 속도 값 사용
    loop(() => {
      trail.move();
      trail.traverse((c, i, last) => {
        c.element.style = `
            color: hsl(${this.colorHue}, ${this.saturation}%, ${(85 / len) * (i + 1)}%)
          `;
        if (last) {
          c.mutate();
          c.element.style = `
              color: hsl(${this.colorHue}, ${this.saturation}%, 85%);
              text-shadow:
                0 0 .5em #fff,
                0 0 .5em currentColor;
            `;
        }
      });
    }, delay);
  }
}

const main = document.querySelector("main");
const columns = Math.floor(window.innerWidth / 32); // Calculate the number of columns based on window width and span width
const speed = 80; // 속도 설정 (값이 작을수록 빨라짐)
const colorHue = 240; // 색조 설정 (0은 빨간색, 120은 초록색, 240은 파란색 등)
const saturation = 20; // 채도 설정 (0은 회색, 100은 기본 색상)
for (let i = 0; i < columns; ++i) {
  new Rain({ target: main, row: 50, speed: speed, colorHue: colorHue, saturation: saturation });
}
