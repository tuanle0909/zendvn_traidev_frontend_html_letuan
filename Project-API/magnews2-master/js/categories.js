$(document).ready(function () {
  const API_URL = "http://apiforlearning.zendvn.com/api/";
  const API_CATEGORY = API_URL + "categories_news";
  let categories = $("#zvn-menu-desktop");
  let categoriesMobile = $("#zvn-menu-mobile");
  let articles = $("#articles");
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
                  <ul class="sub-menu">
                      ${oMenu}
                  </ul>
              </li>
          `;
      }
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

  $(document).on("click", ".category", function () {
    var getLink = $(this).attr("href");
    var id = getLink.substr(getLink.indexOf("=") + 1);
    $.ajax({
      type: "GET",
      url: API_CATEGORY + `/${id}` + `/articles`,
      data: { offset: 0, limit: 10 },
      dataType: "json",
      success: function (response) {
        let content = "";
        response.forEach(function (ele) {
          content += `
          <div class="m-b-45">
            <a href="#" class="wrap-pic-w hov1 trans-03">
            <img src="${ele.thumb}" alt="IMG">
            </a>

            <div class="p-t-16">
              <h5 class="p-b-5">
                <a href="blog-detail-01.html" class="f1-m-3 cl2 hov-cl10 trans-03">
                ${ele.title} 
                </a>
              </h5>

              <span class="cl8">
                <a href="#" class="f1-s-4 cl8 hov-cl10 trans-03">
                  by John Alvarado
                </a>

                <span class="f1-s-3 m-rl-3">
                -
                </span>

              <span class="f1-s-3">
                Feb 18
              </span>
            </span>
          </div>
        </div>
          `;
        });
        content.html(articles);
      },
      error: function (request) {
        alert(request.responseText);
      },
    });
  });
});
