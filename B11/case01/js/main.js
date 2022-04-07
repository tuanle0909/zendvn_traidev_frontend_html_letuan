const btnZoom = $('.btn-zoom');
const btnBackground = $('.btn-background');
const slbLineSpacing = $('.slb-line-spacing');
const slbAlign = $('.slb-align');
const content = $('#content');

btnZoom.on('click', function () {
  let value = $(this).data('value');
  let fontSize = parseInt(content.css('font-size'));
  if (value == "zoom-in") {
    if (fontSize < 30) fontSize++;
  }

  if (value == "zoom-out") {
    if (fontSize > 16) fontSize--;
  }
  content.css('font-size', fontSize);
  saveData('fontSize', fontSize);
});

btnBackground.on('click', function () {
  let color = $(this).data('value');
  content.css('background-color', color);
  saveData('backgroundColor', color);
});

slbLineSpacing.on('change', function () {
  let option = $(this).val();
  content.css('line-height', option);
  saveData('lineHeight', option);
});

slbAlign.on('change', function () {
  let option = $(this).val();
  content.css('text-align', option);
  saveData('textAlign', option);
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
  } else {
    content.css('background-color', settings.backgroundColor);
    content.css('text-align', settings.textAlign);
    content.css('line-height', settings.lineHeight);
    content.css('font-size', settings.fontSize);
  }
}

function saveData(key, value) {
  let settings = JSON.parse(localStorage.getItem("DATA_SETTINGS"));
  settings[key] = value;
  localStorage.setItem("DATA_SETTINGS", JSON.stringify(settings));
  console.log(key, value);
}

document.getElementById("reset").addEventListener("click", function () {
  localStorage.removeItem("DATA_SETTINGS");
  init();
});

init();
