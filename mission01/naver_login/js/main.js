const user = {
  id: "asd@naver.com",
  pw: "spdlqj123!@",
};

/*

1. email 정규표현식을 사용한 validation
2. pw 정규표현식을 사용한 validation
3. 상태 변수 관리
4. 로그인 버튼을 클릭시 조건처리

*/

function emailReg(text) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(text).toLowerCase());
}

function pwReg(text) {
  const re = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{6,16}$/;
  return re.test(String(text).toLowerCase());
}

/*

Mission-0
1. 객체에서 특정 키 값을 안전하게 가져오는 함수

*/

function getValueAtObject(obj, key) {
  if (!obj[key]) throw new Error("해당 키는 객체 내에 없습니다.");
  else return obj[key];
}

const person = {
  name: "Alice",
  age: 25,
  city: "Wonderland",
};

console.log(getValueAtObject(person, "name")); // 'Alice'
console.log(getValueAtObject(person, "age")); // 25
console.log(getValueAtObject(person, "city")); // 'Wonderland'
// console.log(getValueAtObject(person, "country")); // Error !

/*

2. 배열에서 특정 인덱스의 값을 안전하게 가져오는 함수

*/

function getNumberAtArray(arr, index) {
  if (0 <= index && index < arr.length) return arr[index];
  else throw new Error("유효하지 않은 인덱스 입니다.");
}

function getNumberAtArray2(arr, index) {
  return arr[index] ?? undefined; // 하지만 이는 에러를 핸들링하는 것이 아닌, 단순히 값이 있으면 해당 값을, 없으면 undefined를 발생시킴.
}

const getNumberAtArray3 = (arr, index) => {
  if (0 <= index && index < arr.length) return arr[index];
  else throw new Error("유효하지 않은 인덱스 입니다.");
};

const numbers = [10, 20, 30, 40, 50];

console.log(getNumberAtArray(numbers, 2)); // 30
console.log(getNumberAtArray(numbers, 4)); // 50
// console.log(getNumberAtArray(numbers, 5)); // Error!
// console.log(getNumberAtArray(numbers, -1)); // Error!
