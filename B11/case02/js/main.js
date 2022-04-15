let items = loadStorage();
const nameTask = $('#input-name');
const submit = $('#btn-submit');
const inputLevel = $('#input-level')


function showLevel(level) {
  let color = "dark";
  let text = "Small";
  switch (level) {
    case 2:
      color = "info";
      text = "Medium";
      break;
    case 3:
      color = "danger";
      text = "High";
  }
  return `<span class="badge bg-${color}">${text}</span>`;
}

showItems();
function showItems() {
  let content = "";
  let areaList = $('#area-list-task'); 
  items.forEach(function (ele, index) {
    content += `<tr>
        <td>${index + 1}</td>
        <td>${ele.id}</td>
        <td>${ele.name}</td>
        <td>${showLevel(ele.level)}</td>
        <td>
            <button class="btn btn-warning">Edit</button>
            <button class="btn btn-danger btn-delete" data-id="${
              ele.id
            }">Delete</button>
        </td>
    </tr>
    `;
  });
  areaList.html(content);
}

function saveStorage(data) {
  localStorage.setItem("TODO_SETTINGS", JSON.stringify(data));
}

function loadStorage() {
  return JSON.parse(localStorage.getItem("TODO_SETTINGS")) || [];
}

function getRandomID(length = 10) {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

submit.on("click", function () {
  console.log(123);
  const name = nameTask.val();
  const level = inputLevel.val();
  let newItem = {
    id: getRandomID(),
    name,
    level,
  };
  items.push(newItem);
  saveStorage(items);
  showItems();
});

$(document).on('click','.btn-delete' ,'.btn-edit', function(){
    let id = $('.btn-delete').data('id');
    const index = items.findIndex((x) => x.id === id);
    items.splice(index, 1);
    saveStorage(items);
    showItems();

    let idBtnEdit = $('.btn-edit').data('id');
    showItems();
    let item = items.find((x) => x.id === idBtnEdit);
    nameTask.value = item.name;
    level.value = item.level;
    idEdit = idBtnEdit;
})




