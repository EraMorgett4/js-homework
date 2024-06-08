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
  return arr[index] ?? "undefined"; // 하지만 이는 에러를 핸들링하는 것이 아닌, 단순히 값이 있으면 해당 값을, 없으면 "undefined" 텍스트를 반환시킴.
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
