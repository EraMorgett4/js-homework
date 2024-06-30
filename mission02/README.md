# Mission - 2

썸네일 이미지를 클릭하면 메인 이미지와 배경이 바뀔 수 있도록 코드 로직을 작성해주세요.

## 요구사항에 따른 구현

1. 이벤트 처리 방식을 사용하여 클릭 이벤트를 걸어주세요.

   1. 이벤트 위임
      &emsp;본래 이벤트 위임은 부모요소에 EventListener를 설정하여 이벤트가 발생할 때 그 자식요소를 확인하도록 한다. 해당 과제에선 부모요소인 `<ul> thumbnails`에 `EventListener`를 설정하고, 자식요소인 `<li>`에 `EventListener`를 적용하도록 하였다.

      ```js
      document.addEventListener("DOMContentLoaded", () => {
        const thumbnails = document.getElementById("thumbnails");

        function handleThumbnailClick(event) {
          const target = event.target.closest("li");
          if (!target) return;

          // (중략...)
          target.classList.add("selected");

          const index = target.getAttribute("data-index");
          const selectedData = data[index];

          setBgColor(selectedData.colorA, selectedData.colorB);
          setImage(selectedData.src, selectedData.alt);
          // (중략...)
        }

        thumbnails.addEventListener("click", handleThumbnailClick);
      });
      ```

   2. 반복문
      &emsp;반복문을 통하여 선택하지 않은 나머지 요소에 대해 `class`를 관리하여 `EventListener`를 설정하였다.
      ```js
      // 모든 li 요소에서 selected 클래스를 제거하는 반복문
      document.querySelectorAll(".thumbnails li").forEach((li) => {
        li.classList.remove("selected");
      });
      ```

2. 이미지와 색상의 데이터는 `data.js` 에서 불러와주세요.

   - `data.js`파일을 생성하여 데이터를 다음과 같이 관리하였다.

     ```js
     const data = [
        {
           name: "Baram",
           colorA: "#a31f1f",
           colorB: "#c58633",
           alt: "Baram",
           src: "./images/image1.png",
           url: "https://baram.nexon.com",
        },
        // (후략...)
     ```

3. 각 li 항목들을 클릭하면 배경 색상과 메인 비주얼 이미지를 변경해주세요.

   a. 배경색 변경 ( colorB의 기본값은 `#000` 으로 한다 )

   배경색을 변경하는 함수 `setBgColor()`로 이를 관리하였다.

   ```js
   const body = document.body;

   function setBgColor(colorA, colorB = "#000") {
     body.style.background = `linear-gradient(to bottom, ${colorA}, ${colorB})`;
   }
   ```

   b. 이미지 변경
   이미지를 변경하는 함수 `setImage()`로 이를 관리하였다.

   ```js
   const mainImage = document.getElementById("main-image");
   function setImage(src, alt) {
     mainImage.src = src;
     mainImage.alt = alt;
   }
   const selectedData = data[index];
   setImage(selectedData.src, selectedData.alt);
   ```

4. 비주얼이 변경되면 상단에 비주얼에 맞는 이름으로 변경해주세요.

   - 타이틀을 변경하는 함수 `setNameText()`로 이를 관리하였다.

     ```js
     const imageName = document.getElementById("image-name");
     function setNameText(name) {
       imageName.textContent = name;
     }
     const selectedData = data[index];
     setNameText(selectedData.name);
     ```

5. 함수를 분리시켜주세요.
   - 3, 4번에 표기되어있듯, 함수로 기능을 분리시켜 관리하였다.
6. 가독성이 좋은 코드로 리팩토링 해주세요.
   - index.js
     - 큰 틀에서 `document.addEventListener("DOMContentLoaded", () => {})`형태로 묶음으로써, DOM 요소가 온전히 준비된 상태에서 실행 될 수 있도록 하였다.
     - 그 내부에 변수 선언부, 함수 선언부, Event함수부로 나누어 리팩토링하였다.

---

## 추가 구현

1. 썸네일 클릭 시 관련된 음악이 재생되도록 함.

   `<audio id="audio-player" src="" type="audio/mpeg"></audio>`

   - `index.html`에 위 태그를 추가하였고, `src`부분은 공란으로 남겨, 맨 처음 실행될 때 노래가 재생되지 않도록 하였다.

   - 이후 썸네일을 클릭하면, 해당 `src`부분에 곡의 경로를 추가하여 재생하도록 하였다.

   ```js
   const audioPlayer = document.getElementById("audio-player");
   function setAudio(src) {
     audioPlayer.src = src;
     audioPlayer.play();
   }
   function handleThumbnailClick(event) {
     const target = event.target.closest("li");
     if (!target) return;

     document.querySelectorAll(".thumbnails li").forEach((li) => li.classList.remove("selected"));

     target.classList.add("selected");

     const index = target.getAttribute("data-index");
     setAudio(`./music/music${index}.mp3`);
   }
   ```

2. 음악 재생 효과 구현

   ![Result](images/Result.gif)

   - 썸네일을 선택하면 노래재생과 함께 썸네일 테두리를 회전하는 무늬를 통해 음악이 재생되고 있음을 표현하였다.

   - 가상요소선택자를 활용하여 지정한 점 기준으로 정사각형을 회전시켜, 마치 테두리가 돌아가는 것처럼 보이게 하였고, `overflow:hidden` 속성을 사용하여 `li`요소의 크기를 초과하지 않도록 하여 이를 표현하였다.

   ```css
   .selected {
     position: relative;
     border-radius: 10px;
     overflow: hidden;
     padding: 0.3rem;
     display: flex;
     justify-content: center;
     align-items: center;
     transition: transform 1s;
   }

   .selected::before {
     content: "";
     position: absolute;
     z-index: -1;
     left: -50%;
     top: -50%;
     width: 200%;
     height: 200%;
     background-color: var(--colorA, #fbb300);
     background-repeat: no-repeat;
     background-size: 50% 50%, 50% 50%;
     background-position: 0 0, 100% 0, 100% 100%, 0 100%;
     background-image: linear-gradient(var(--colorA, #fbb300), var(--colorA, #fbb300)), linear-gradient(var(--colorB, #d53e33), var(--colorB, #d53e33));
     animation: rotate 3s linear infinite;
   }
   ```

### 후기

&emsp;매번 새로운 기능과 활용에 대해 알아가는 것에 기쁨을 느낍니다. 비동기 부분은 아직 복습중이라 함수를 비동기화하지 않았고, 또한 이번에 제가 구현한 정도에선 웹에서 직접 받아오는 것이 아니면 굳이 비동기함수를 작성할 필요는 없었다 느껴서 `then`, `async`, `await`를 활용해보지 못한 것이 아쉽습니다. 바닐라 프로젝트 때 머리 깨지면서 사용할 것으로 보이긴 합니다만.. 아무튼 그렇습니다.

&emsp;참고로 사진들은 제가 일전에 졸업전시회를 하면서 Stable Diffusion AI를 이용하여 생성하였던 QR Code Art입니다. 해당 사진을 촬영하시면 사진 내에 표현되어있는 QR코드를 인식합니다. 일전에 시도해보다 실패했던 것에 차츰 다가가는 것 같아 감회가 새롭습니다.
