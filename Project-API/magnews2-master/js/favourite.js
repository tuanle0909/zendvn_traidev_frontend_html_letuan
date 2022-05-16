$(document).ready(function () {
  const API_URL = "http://apiforlearning.zendvn.com/api/";
  const API_CATEGORY = API_URL + "categories_news";
  const API_ARTICLES = API_URL + "articles";
  let categories = $("#zvn-menu-desktop");
  let categoriesMobile = $("#zvn-menu-mobile");
  const favContent = $("#fav-list");
  let favItem = JSON.parse(localStorage.getItem("FAV_LIST")) || [];
  
  $.ajax({
    type: "GET",
    url: API_CATEGORY,
    data: { offset: 0, limit: 20 },
    dataType: "json",
    success: function (response) {
      let content = "";
      let oMenu = "";
      response.forEach(function (ele, index) {
        let menuItem = `<li><a href="category.html?id=${ele.id}" class="disable-after">${ele.name}</a></li>`;
        if (index < 4) {
          content += menuItem;
        } else {
          oMenu += menuItem;
        }
      });
      if (oMenu) {
        content += ` <li><a href="#">Danh mục khác</a> <ul class="sub-menu">${oMenu}</ul></li>`;
      }
      content += `<li><a href="favourite.html" class="disable-after">Danh sách yêu thích</a></li>`;
      categories.html(content);
    },
  });

  $.ajax({
    type: "GET",
    url: API_CATEGORY,
    data: { offset: 0, limit: 20 },
    dataType: "json",
    success: function (response) {
      let content = "";
      let oMenu = "";
      response.forEach(function (ele, index) {
        let menuItem = `<li><a href="category.html?id=${ele.id}" class="category">${ele.name}</a></li>`;
        if (index < 4) {
          content += menuItem;
        } else {
          oMenu += menuItem;
        }
      });
      if (oMenu) {
        content += `
                    <li>
                        <a href="#">Danh mục khác</a>
                        <ul class="sub-menu-m">
                            ${oMenu}
                        </ul>
                        <span class="arrow-main-menu-m">
                            <i class="fa fa-angle-right" aria-hidden="true"></i>
                        </span>
                    </li>
                `;
      }
      categoriesMobile.html(content);
    },
  });

  function loadFavItem(favItem) {
    let content = "";
    favItem.forEach((element, index) => {
      $.ajax({
        type: "GET",
        url: API_ARTICLES + `/${element}`,
        dataType: "json",
        success: function (response) {
          content += `<div key=${index} class="col-sm-6 p-r-25 p-r-15-sr991">
                        <div class="m-b-45">
                          <a href="detail.html?id=${response.id}" class="wrap-pic-w hov1 trans-03">
                            <img src="${response.thumb}">
                          </a>
                          <div class="p-t-16">
                            <h5 class="p-b-5">
                              <a href="detail.html?id=${response.id}" class="f1-m-3 cl2 hov-cl10 trans-03">
                                ${response.title}
                              </a>
                            </h5>
                            <span class="f1-s-3">${response.publish_date}</span>
                          </div>
                        </div>
                      </div>
          `
          favContent.html(content);
        },
      });
    });
  }

  loadFavItem(favItem);
});
