function getNumber()  {
  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
    };
}

function GetColor() {
  const r = getNumber(0, 255);
  const g = getNumber(0, 255);
  const b = getNumber(0, 255);
  return `rgb(${r}, ${g}, ${b})`;
}

console.log(GetColor());