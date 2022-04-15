let items = loadStorage();
let idEdit = "";
let idx = "";

const nameTask = document.getElementById("input-name");
const submit = document.getElementById("btn-submit");
const level = document.getElementById("input-level");
const searchKey = document.getElementById("search-input");
const sortDisplay = document.getElementById("sort-display");
const search = document.getElementById("btn-search");

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

showItems(items);

function showItems(data) {
  let content = "";
  let areaList = document.getElementById("area-list-task");
  data.forEach((ele, index) => {
    content += `<tr id=${index}>
        <td>${index + 1}</td>
        <td>${ele.id}</td>
        <td id="elemname${index}">${ele.name}</td>
        <td>${showLevel(ele.level)}</td>
        <td>
            <button class="btn btn-warning btn-edit" data-id="${
              ele.id
            }">Edit</button>
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
    id: idEdit ? idEdit : getRandomID(),
    name: getName,
    level: getLevel,
  };

  if (idEdit) {
    const index = items.findIndex((x) => x.id === idEdit);
    items[index].name = getName;
    items[index].level = getLevel;
  } else {
    items.push(newItem);
  }

  idEdit = "";
  nameTask.value = "";
  level.value = 1;
  saveStorage(items);
  showItems(items);
});

document.addEventListener("click", function (e) {
  let el = e.target;
  if (el.classList.contains("btn-delete")) {
    const id = el.getAttribute("data-id");
    const index = items.findIndex((x) => x.id === id);
    items.splice(index, 1);
    saveStorage(items);
    showItems(items);
  }

  if (el.classList.contains("btn-edit")) {
    showItems(items);
    let id = el.dataset.id;
    let item = items.find((x) => x.id === id);
    nameTask.value = item.name;
    level.value = item.level;
    idEdit = id;
  }

  if (el.classList.contains("sort-value")) {
    let orderBy = el.dataset.orderBy;
    let orderDir = el.dataset.orderDir;
    sortDisplay.innerHTML = `${orderBy} - ${orderDir}`.toUpperCase();
    items.sort(function (x, y) {
      let firstValue = (x[orderBy] + "").toLowerCase();
      let secondValue = (y[orderBy] + "").toLowerCase();
      if (firstValue < secondValue) {
        return orderDir === "asc" ? -1 : 1;
      }
      if (firstValue > secondValue) {
        return orderDir === "asc" ? 1 : -1;
      }
      return 0;
    });
    showItems(items);
  }
});

search.addEventListener("click", function () {
  const searchString = searchKey.value;
  let listSearch = [...items];
  listSearch.forEach((elem, index) => {
    elem.name = elem.name.replace(
      searchString,
      `<span class="highlight">${searchString}</span>`
    );
  });
  showItems(listSearch);
});
