// let items = [
//     {
//         id: getRandomID(),
//         name: "Task 1",
//         level: 1
//     },

//     {
//         id: getRandomID(),
//         name: "Task 2",
//         level: 2
//     },

//     {
//         id: getRandomID(),
//         name: "Task 3",
//         level: 3
//     }
// ];

// saveStorage(items);

let items = loadStorage();
console.log(items);

const nameTask = document.getElementById("input-name");
const submit = document.getElementById("btn-submit");
const level = document.getElementById("input-level");
const searchKey = document.getElementById("search-input");

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
  let areaList = document.getElementById("area-list-task");
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
  areaList.innerHTML = content;
}

function saveStorage(data) {
  localStorage.setItem("TODO_SETTINGS", JSON.stringify(data));
}

function loadStorage() {
  return JSON.parse(localStorage.getItem("TODO_SETTINGS"));
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

document.getElementById("btn-submit").addEventListener("click", function () {
  const getName = nameTask.value;
  const getLevel = parseInt(level.value);
  let newItem = {
    id: getRandomID(),
    name: getName,
    level: getLevel,
  };
  items.push(newItem);
  saveStorage(items);
  showItems();
});

document.addEventListener("click", function (e) {
  let el = e.target;
  if (el.classList.contains("btn-delete")) {
    const id = el.getAttribute("data-id");
    const index = items.findIndex((x) => x.id === id);
    items.splice(index, 1);
    saveStorage(items);
    showItems();
  }
});

document.getElementById('btn-search').addEventListener('click',function(){
  let searchValue = searchKey.value;
  let 
})


