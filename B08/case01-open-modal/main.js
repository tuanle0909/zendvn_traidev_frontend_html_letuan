const open = document.getElementById('open');
const modal = document.getElementById('modal');
const close = document.getElementById('close');


open.addEventListener('click', function(){
    modal.classList.add('show')
})

close.addEventListener('click', function(){
    modal.classList.remove('show')  
})






