document.querySelector('.select-selected').addEventListener('click', function(){
    let selected = this.nextElementSibling;
    let show = selected.classList.toggle('show');
    let arrow = this.children[0];
    arrow.classList.toggle('fa-circle-chevron-down');
    arrow.classList.toggle('fa-circle-chevron-up');
})

document.addEventListener('click', function(ele){
    let e = ele.target;
    if (e.classList.contains('item')){
        let selectItems = e.parentElement;
        let selectSelected = selectItems.previousElementSibling;
        let eleSelect = selectSelected.previousElementSibling;
        let idx = Array.from(selectItems.children).indexOf(e);

        eleSelect.children[idx].selected = true
        e.parentElement.classList.toggle('show');
        e.parentElement.previousElementSibling.innerHTML = e.innerHTML + `<i class="fa-solid fa-circle-chevron-down"></i>`;
    }
})