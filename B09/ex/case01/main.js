const text = ["HTML CSS","Javascript","C#","Python"];
const timeReplay = 1000;

function randomItem(){
    return Math.floor(Math.random()*text.length);
}

function showText() {
    let idx = randomItem();
    document.querySelector('.content').innerHTML = text[idx];
}

showText();

setInterval(showText, timeReplay);