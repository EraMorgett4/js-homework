/*

Mission-0
1. 객체에서 특정 키 값을 안전하게 가져오는 함수

*/

function getValueAtObject(obj, key) {
  if (!obj[key]) throw new Error("해당 키는 객체 내에 없습니다.");
  else return obj[key];
}

// function getValueAtObject(obj, key) {
//   if (
//     typeof key === "string" &&
//     Object.prototype.toString.call(obj) === "[object Object]"
//   ) {
//     for (const value of Object.keys(obj)) {
//       if (value === key) return obj[value];
//     }
//   }
//   throw new Error("Error !");
// }

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

// function getNumberAtArray(arr, index) {
//   let num = 0;
//   if (
//     Array.isArray(arr) &&
//     typeof index === "number" &&
//     arr.length > index &&
//     index >= 0
//   ) {
//     arr.forEach((v, i) => {
//       if (i === index) num = v;
//     });
//   } else {
//     throw new Error("Error!");
//   }

//   return num;
// }

const numbers = [10, 20, 30, 40, 50];

console.log(getNumberAtArray(numbers, 2)); // 30
console.log(getNumberAtArray(numbers, 4)); // 50
// console.log(getNumberAtArray(numbers, 5)); // Error!
// console.log(getNumberAtArray(numbers, -1)); // Error!

//범쌤 코드

function getValueAtObject(obj, key) {
  if (typeof key !== "string") {
    throw new TypeError("getValueAtObject 함수의 두 번째 인수는 문자 타입 이어야 합니다.");
  }

  if (typeof obj === "object") {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return obj[key];
    } else {
      throw new Error(`getValueAtObject 함수의 해당 ${key}가 존재하지 않습니다.`);
    }
  } else {
    throw new TypeError("getValueAtObject 함수의 첫 번째 인수는 객체 타입 이어야 합니다.");
  }
}

// 1. arr 변수가 배열인지 확인하기
// 2. 0보다 크거나 같음 && 배열의 길이보다 작을 때

function getNumberAtArray(arr, index) {
  if (Array.isArray(arr)) {
    if (index >= 0 && index < arr.length) {
      return arr[index];
    } else {
      throw new Error("배열에 없는 index입니다.");
    }
  } else {
    throw new TypeError("getNumberAtArray 함수의 첫 번째 인수는 배열 타입 이어야 합니다.");
  }
}
