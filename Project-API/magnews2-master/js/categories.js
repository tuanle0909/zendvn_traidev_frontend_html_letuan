$(document).ready(function () {
  const API_URL = "http://apiforlearning.zendvn.com/api/";
  const API_CATEGORY = API_URL + "categories_news";
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const stringId = urlParams.getAll("id").toString();
  const breadcrumb = $('#breadCrumb');
  const pageheading = $('#pageHeading');
  const title = $('#title')
  let categories = $("#zvn-menu-desktop");
  let categoriesMobile = $("#zvn-menu-mobile");
  let articles = $("#articles");

  $.ajax({
    type: "GET",
    url: API_CATEGORY + `/${stringId}`,
    dataType: "json",
    success: function (response) {
      let content = '';
      content += `
      <a href="index.html" class="breadcrumb-item f1-s-3 cl9">
					Trang chủ
				</a>
				<span class="breadcrumb-item f1-s-3 cl9">
					${response.name}
				</span>
      `
      let pageHeading ='';
      pageHeading += `
      <h2 class="f1-l-1 cl2">
			${response.name}
		  </h2>
      `

      let webtitle = '';
      webtitle += `
      <title>${response.name}</title>
      `
      
      title.html(webtitle);
      pageheading.html(pageHeading);
      breadcrumb.html(content);
    }
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

  $.ajax({
    type: "GET",
    url: API_CATEGORY + `/${stringId}` + "/articles",
    data: { offset: 0, limit: 10 },
    dataType: "json",
    success: function (response) {
      console.log(response);
      let content = "";
      response.forEach(function (ele) {
        content += `
        <div class="col-sm-6 p-r-25 p-r-15-sr991">
          <div class="m-b-45">
							<a href="detail.html?id=${ele.id}" class="wrap-pic-w hov1 trans-03">
								<img src="${ele.thumb}">
							</a>
							<div class="p-t-16">
								<h5 class="p-b-5">
									<a href="blog-detail-01.html" class="f1-m-3 cl2 hov-cl10 trans-03">
										${ele.title}
									</a>
								</h5>
									<span class="f1-s-3">
										${ele.publish_date}
									</span>
								</div>
					</div>
        </div>
        `
      })
      articles.html(content);
    },
  });

});
