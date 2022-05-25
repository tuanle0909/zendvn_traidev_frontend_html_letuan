$(document).ready(function () {
  const API_URL = "http://apiforlearning.zendvn.com/api/";
  const API_ARTICLES = API_URL + "articles";
  const API_SEARCH = API_ARTICLES + "/search";
  const API_CATEGORY = API_URL + "categories_news";
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const searchVal = urlParams.getAll("keyword").toString();
  let searchContent = $("#search-list");
  let heading = $("#pageHeading");
  let categories = $("#zvn-menu-desktop");
  let categoriesMobile = $("#zvn-menu-mobile");
  let title = $("#title");
  const sidebarCate = $("#sidebar-cate");
  let favItem = JSON.parse(localStorage.getItem("FAV_LIST")) || [];

  $(document).on("click", ".m-all-5", function () {
    let text = $(this).text();
    window.location.href = "searchresults.html?keyword=" + text;
  });

  $.ajax({
    type: "GET",
    url: API_SEARCH + `?q=${searchVal}`,
    data: { offset: 0, limit: 10 },
    dataType: "json",
    success: function (response) {
      let content = "";
      let pageHeading = "";
      let webtitle = "";
      response.forEach(function (ele) {
        let isActive = favItem.indexOf(ele.id) != -1 ? "active-icon-fav" : "";
        let date = moment(ele.publish_date);
        let time = date.fromNow();
        content += `<div class="col-sm-6 p-r-25 p-r-15-sr991" id="${ele.id}">
        <div class="m-b-45">
        <a href="detail.html?id=${ele.id}" class="wrap-pic-w hov1 trans-03">
          <img src="${ele.thumb}" alt="IMG">
        </a>
        <button data-id="${ele.id}" class="btn-like-article cate"><i class="fa-solid fa-heart icon-wishlist ${isActive}" id="heartWish${ele.id}"></i></button>
      <div class="p-t-16">
        <h5 class="p-b-5">
          <a href="detail.html?id=${ele.id}" class="f1-m-3 cl2 hov-cl10 trans-03">
            ${ele.title}
          </a>
        </h5>
        <span class="f1-s-3">
          ${time}
        </span>
      </div>
    </div>
        </div>
        `;
        webtitle += `<title>Tìm kiếm cho từ khóa '${searchVal}'</title>`;
      });
      pageHeading += `<h2 class="f1-l-1 cl2">Kết quả tìm kiếm cho '${searchVal}'</h2>`;
      searchContent.html(content);
      heading.html(pageHeading);
      title.html(webtitle);
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
      let sMenu = "";
      response.forEach(function (ele, index) {
        let menuItem = `<li><a href="category.html?id=${ele.id}" class="disable-after">${ele.name}</a></li>`;
        if (index < 4) {
          content += menuItem;
        } else {
          oMenu += menuItem;
        }
        sMenu += `
                <li class="how-bor3 p-rl-4">
									<a href="category.html?id=${ele.id}" class="dis-block f1-s-10 text-uppercase cl2 hov-cl10 trans-03 p-tb-13">
										${ele.name}
									</a>
								</li>
          `;
        sidebarCate.html(sMenu);
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
  $(document).on('click', '.btn-like-article', function () {
    let id = $(this).data('id');
    console.log(id, favItem);
    if (favItem.indexOf(id) != -1) {
        $(this).find(`#heartWish${id}`).removeClass('active-icon-fav');
        favItem = jQuery.grep(favItem, function (value) {
            return value != id;
        });
        Toastify({
            text: "Bạn đã bỏ yêu thích bài viết này",
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
            onClick: function(){} // Callback after click
          }).showToast();
    } else {
        $(this).find(`#heartWish${id}`).addClass('active-icon-fav');
        favItem.push(id);
        Toastify({
            text: "Bạn đã yêu thích bài viết này",
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
            onClick: function(){} // Callback after click
          }).showToast();
    }
    localStorage.setItem('FAV_LIST', JSON.stringify(favItem));
  });
});
