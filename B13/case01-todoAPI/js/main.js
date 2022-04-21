const API_URL = "https://625e2a626c48e8761ba603da.mockapi.io/";
const nameTask = $("#input-name");
const submit = $("#btn-submit");
const inputLevel = $("#input-level");
const areaListTask = $("#area-list-task");
let idEdit = "";

getItems();

$(document).on("click", ".btn-delete", function () {
  let id = $(this).data("id");
  deleteItem(id);
});

$(document).on("click", ".btn-edit", function () {
  idEdit = $(this).data("id");
  $.ajax({
    url: API_URL + `todos/${idEdit}`,
    method: "GET",
  }).done(function (data) {
    nameTask.val(data.name);
    inputLevel.val(data.level);
  });
});

submit.on("click", function () {
  const name = nameTask.val();
  const level = inputLevel.val();
  if (idEdit) {
    editItem({ name, level }, idEdit);
  } else {
    postItem({ name, level });
  }
  idEdit = "";
});

function editItem(data, id) {
  $.ajax({
    url: API_URL + `todos/${id}`,
    method: "PUT",
    data: data,
  })
    .done(function (data) {
      console.log(data);
      getItems();
    })
}

function postItem(item) {
  $.ajax({
    url: API_URL + "todos",
    method: "POST",
    data: item,
  }).done(function (data) {
    console.log(data);
    getItems();
  });
}

function deleteItem(id) {
  $.ajax({
    url: API_URL + `todos/${id}`,
    method: "DELETE",
  }).done(function (data) {
    getItems();
  });
}

function getItems() {
  $.ajax({
    url: API_URL + "todos",
    method: "GET",
  }).done(function (data) {
    showItems(data);
  });
}

function showLevel(level) {
  let color = "dark";
  let text = "Small";
  level = parseInt(level);
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

function showItems(items) {
  let content = "";
  let areaList = $("#area-list-task");
  items.forEach(function (ele, index) {
    content += `<tr>
        <td>${index + 1}</td>
        <td>${ele.id}</td>
        <td>${ele.name}</td>
        <td>${showLevel(ele.level)}</td>
        <td>
            <button class="btn btn-warning btn-edit"data-id="${
              ele.id
            }">Edit</button>
            <button class="btn btn-danger btn-delete" data-id="${
              ele.id
            }">Delete</button>
        </td>
    </tr>
    `;
  });
  areaList.html(content);
}
