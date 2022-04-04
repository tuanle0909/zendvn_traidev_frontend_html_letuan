document.addEventListener("click", function (e) {
  let el = e.target;
  if (el.classList.contains("btn-background")) {
    document.getElementById("content").style.backgroundColor = el.dataset.value;
  }
  const sbackgroundColor = String(el.dataset.value);
  saveData("backgroundColor", sbackgroundColor);
});

const valueOption = document.querySelector(".slb-line-spacing");
valueOption.addEventListener("change", function (i) {
  const value = i.target.value;
  document.getElementById("content").style.lineHeight = value;
  saveData("lineHeight", value);
});

const valOption = document.querySelector(".slb-align");
valOption.addEventListener("change", function (a) {
  const value = a.target.value;
  document.getElementById("content").style.textAlign = value;
  saveData("textAlign", value);
});

document.addEventListener("click", function (f) {
  const text = document.getElementById("content");
  const style = window
    .getComputedStyle(text, null)
    .getPropertyValue("font-size");
  let fontSize = parseFloat(style);
  const element = f.target;
  const data = element.getAttribute("data-value");

  if (data == "zoom-in") {
    if (fontSize < 30) fontSize++;
  }

  if (data == "zoom-out") {
    if (fontSize > 16) fontSize--;
  }

  document.getElementById("content").style.fontSize = fontSize + "px";
  const sFontSize = String(fontSize) + "px";
  saveData("fontSize", sFontSize);
});

function init() {
  let settings = JSON.parse(localStorage.getItem("DATA_SETTINGS"));
  if (!settings) {
    settings = {
      backgroundColor: 'white',
      textAlign: 'left',
      lineHeight: '1.5',
      fontSize: '16px',
    };
    localStorage.setItem("DATA_SETTINGS", JSON.stringify(settings));
    init();
  } else {
    let content = document.getElementById("content").style;
    content.backgroundColor = settings.backgroundColor;
    content.textAlign = settings.textAlign;
    content.lineHeight = settings.lineHeight;
    content.fontSize = settings.fontSize;
  }
}

function saveData(key, value) {
  let settings = JSON.parse(localStorage.getItem("DATA_SETTINGS"));
  settings[key] = value;
  localStorage.setItem("DATA_SETTINGS", JSON.stringify(settings));
}

document.getElementById("reset").addEventListener("click", function () {
  localStorage.removeItem("DATA_SETTINGS");
  init();
});

init();
