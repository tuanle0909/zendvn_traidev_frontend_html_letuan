function hightText() {
    let text = document.getElementById('h').innerHTML.split(" ");
    for (let i = 0; i<text.length; i++) {
        if (text[i].toLowerCase() == "frontend") {
            text[i] = "<span class='hu'>"+text[i]+"</span>"
        }
    }
    document.getElementById("h").innerHTML = text.join(" ");
}