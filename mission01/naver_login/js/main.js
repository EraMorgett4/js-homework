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

// - 로그인 입력형식 검증함수
function validInput() {
  const emailInput = document.getElementById("userEmail");
  const pwInput = document.getElementById("userPassword");
  const emailError = document.getElementById("userEmailError");
  const pwError = document.getElementById("userPasswordError");
  const loginFailedMessage = document.getElementById("login-failed");

  // - validation 변수
  const isEmailValid = emailReg(emailInput.value);
  const isPwValid = pwReg(pwInput.value);

  // 초기화
  emailError.classList.remove("error-message-visible");
  pwError.classList.remove("error-message-visible");
  loginFailedMessage.classList.remove("error-message-visible");

  if (!isEmailValid) {
    emailInput.classList.add("is--invalid");
    emailError.classList.add("error-message-visible");
  } else {
    emailInput.classList.remove("is--invalid");
    emailError.classList.remove("error-message-visible");
  }

  if (!isPwValid) {
    pwInput.classList.add("is--invalid");
    pwError.classList.add("error-message-visible");
  } else {
    pwInput.classList.remove("is--invalid");
    pwError.classList.remove("error-message-visible");
  }

  return isEmailValid && isPwValid;
}

//    로그인 처리 함수
function loginHandler(event) {
  event.preventDefault();

  const emailInput = document.getElementById("userEmail");
  const pwInput = document.getElementById("userPassword");
  const loginFailedMessage = document.getElementById("login-failed");

  if (validInput()) {
    if (emailInput.value === user.id && pwInput.value === user.pw) {
      window.location.href = "welcome.html";
    } else {
      loginFailedMessage.classList.add("error-message-visible");
    }
  } else {
    loginFailedMessage.classList.remove("error-message-visible");
  }
}

document.querySelector(".login-form").addEventListener("submit", loginHandler);
