const send = document.getElementById("btn-send-contact");
var eleFullname = document.getElementById("fullname");
var eleEmail = document.getElementById("email");
var elePhone = document.getElementById("phone");
var eleJob = document.getElementById("job");
var eleMess = document.getElementById("message");

eleFullname.value = localStorage.getItem('fullname');
eleEmail.value = localStorage.getItem('email');
elePhone.value = localStorage.getItem('phone');
eleJob.value = localStorage.getItem('job');
eleMess.value = localStorage.getItem('message');

function getInfo() {
  localStorage.setItem("fullname", eleFullname.value);
  localStorage.setItem("email", eleEmail.value);
  localStorage.setItem("phone", elePhone.value);
  localStorage.setItem("job", eleJob.value);
  localStorage.setItem("message", eleMess.value);

  alert("thanh cong");
}

send.addEventListener("click", getInfo);
