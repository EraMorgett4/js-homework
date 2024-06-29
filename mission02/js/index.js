document.addEventListener("DOMContentLoaded", () => {
  const thumbnails = document.getElementById("thumbnails");
  const mainImage = document.getElementById("main-image");
  const imageName = document.getElementById("image-name");
  const qrInstruction = document.querySelector(".qr-instruction");
  const audioPlayer = document.getElementById("audio-player");
  const body = document.body;
  let currentUrl = data[0].url;

  function setBgColor(colorA, colorB = "#000") {
    body.style.background = `linear-gradient(to bottom, ${colorA}, ${colorB})`;
  }

  function setImage(src, alt) {
    mainImage.src = src;
    mainImage.alt = alt;
  }

  function setNameText(name) {
    imageName.textContent = name;
  }

  function setH1Color(colorA, colorB = "#000") {
    imageName.style.background = `linear-gradient(to right, ${colorA}, ${colorB})`;
  }

  function setAudio(src) {
    audioPlayer.src = src;
    audioPlayer.play();
  }

  function setBorderColor(element, colorA, colorB) {
    element.style.setProperty("--colorA", colorA);
    element.style.setProperty("--colorB", colorB);
  }

  function handleThumbnailClick(event) {
    const target = event.target.closest("li");
    if (!target) return;

    // Remove 'selected' class from all thumbnails
    document.querySelectorAll(".thumbnails li").forEach((li) => li.classList.remove("selected"));

    // Add 'selected' class to the clicked thumbnail
    target.classList.add("selected");

    const index = target.getAttribute("data-index");
    const selectedData = data[index];

    setBgColor(selectedData.colorA, selectedData.colorB);
    setImage(selectedData.src, selectedData.alt);
    setNameText(selectedData.name);
    setH1Color(selectedData.colorA, selectedData.colorB);
    setBorderColor(target, selectedData.colorA, selectedData.colorB);
    setAudio(`./music/music${index}.mp3`); // Example path to the music file
    currentUrl = selectedData.url;
  }

  function handleMainImageClick() {
    window.location.href = currentUrl;
  }

  thumbnails.addEventListener("click", handleThumbnailClick);
  mainImage.addEventListener("click", handleMainImageClick);
});
