$(document).ready(function () {
  const API_URL = "http://apiforlearning.zendvn.com/api/";
  const API_CATEGORY = API_URL + "categories_news";
  const API_ARTICLES = API_URL + "articles";
  const sidebarCate = $('#sidebar-cate')
  let categories = $("#zvn-menu-desktop");
  let categoriesMobile = $("#zvn-menu-mobile");
  const favContent = $("#fav-list");
  let favItem = JSON.parse(localStorage.getItem("FAV_LIST")) || [];

  $('#btn-search').on('click', function () {
    let value = $('#search-input').val();
    window.location.href = 'searchresults.html?keyword=' + value;
});
  
  $.ajax({
    type: "GET",
    url: API_CATEGORY,
    data: { offset: 0, limit: 20 },
    dataType: "json",
    success: function (response) {
      let content = "";
      let oMenu = "";
      let sMenu = '';
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

  function loadFavItem(favItem) {
    let content = "";
    favItem.forEach((element, index) => {
      $.ajax({
        type: "GET",
        url: API_ARTICLES + `/${element}`,
        dataType: "json",
        success: function (response) {
          let isActive = favItem.indexOf(response.id) != -1 ? 'active-icon-fav' : '';
          let date = moment(response.publish_date);
            let time = date.fromNow();
          content += `<div class="col-sm-6 p-r-25 p-r-15-sr991" id="${response.id}">
          <div class="m-b-45">
          <a href="detail.html?id=${response.id}" class="wrap-pic-w hov1 trans-03">
            <img src="${response.thumb}" alt="IMG">
          </a>
          <button data-id="${response.id}" class="btn-like-article cate"><i class="fa-solid fa-heart icon-wishlist ${isActive}" id="heartWish${response.id}"></i></button>
        <div class="p-t-16">
          <h5 class="p-b-5">
            <a href="detail.html?id=${response.id}" class="f1-m-3 cl2 hov-cl10 trans-03">
              ${response.title}
            </a>
          </h5>
          <span class="f1-s-3">
            ${time}
          </span>
        </div>
      </div>
          </div>
          `
          favContent.html(content);
        },
      });
    });
  }

  $(document).on('click', '.btn-like-article', function(){
    let id = $(this).data('id');
    $(`#${id}`).remove();
    if (favItem.indexOf(id) != -1) {
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
    }
    localStorage.setItem('FAV_LIST', JSON.stringify(favItem));
  })

  loadFavItem(favItem);
});
