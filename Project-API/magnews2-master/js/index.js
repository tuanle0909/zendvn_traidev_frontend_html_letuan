$(document).ready(function () {
  const API_URL = "http://apiforlearning.zendvn.com/api/";
  const API_CATEGORY = API_URL + "categories_news";
  const API_ARTICLES = API_URL + "articles";
  const lat = "10.762622";
  const lon = "106.660172";
  const API_KEY = "3ea9c5b8bd7273745d804ed32bd2bcfe";
  const API_WEATHER = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  let categories = $("#zvn-menu-desktop");
  let categoriesMobile = $("#zvn-menu-mobile");
  let newestBlog = $("#newest");
  let lastestBlog = $('#lastest');
  let goldContent = $('#get-gold');
  let coinContent = $('#coin-content')
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
    url: API_ARTICLES,
    data: { offset: 0, limit: 3 },
    dataType: "json",
    success: function (response) {
      let content = '';
      response.forEach(function (ele) {
        let idCategory = ele.category_id;
        $.ajax({
          type: "GET",
          url: API_CATEGORY + `/${idCategory}`,
          dataType: "json",
          success: function (response) {
              content += `
              <div class="col-md-4 p-rl-1 p-b-2">
                <div class="bg-img1 size-a-11 how1 pos-relative" style="background-image: url(${ele.thumb});">
                  <a href="detail.html?id=${ele.id}" class="dis-block how1-child1 trans-03"></a>

                  <div class="flex-col-e-s s-full p-rl-25 p-tb-18">
                    <a href="category.html?id=${response.id}" class="dis-block how1-child2 f1-s-2 cl0 bo-all-1 bocl0 hov-btn1 trans-03 p-rl-5 p-t-2">
                      ${response.name}
                    </a>

                    <h3 class="how1-child2 m-t-14 m-b-10">
                      <a href="detail.html?id=${ele.id}" class="f1-l-1 cl0 hov-cl10 trans-03 respon1">
                        ${ele.title}
                      </a>
                    </h3>
                </div>
              </div>
              </div>
              `
              newestBlog.html(content)
          }
        });
      });
    },
  });

  $.ajax({
    type: "GET",
    url: API_ARTICLES,
    data: {offset: 0, limit:6},
    dataType: "json",
    success: function (response) {
      let content = '';
      response.forEach(function (ele, index){
          if ( index > 2 ){
            content += `
            <div class="col-sm-6 col-md-4">
              <div class="m-b-45">
                  <a href="blog-detail-02.html" class="wrap-pic-w hov1 trans-03">
                    <img src="${ele.thumb}" alt="IMG">
                  </a>
                <div class="p-t-16">
                  <h5 class="p-b-5">
                    <a href="blog-detail-02.html" class="f1-m-3 cl2 hov-cl10 trans-03">
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
            lastestBlog.html(content)
          }
      })
    }
  });

  $.ajax({
    type: "GET",
    url: API_URL + "get-gold",
    dataType: "json",
    success: function (response) {
      let content = '';
      response.forEach(function(ele){
        content += `
							<ul class="p-t-15">
								<li class="flex-wr-sb-c p-b-20">

									<div class="size-w-3 flex-wr-sb-c">
										<p href="#" class="f1-s-9 text-uppercase cl3">
											${ele.type}
										</p>

                    <div class="gold-content">
                      <span class="f1-s-8 cl3 p-r-20">
                        Mua vào: ${ele.buy}
                      </span>

                      <span class="f1-s-8 cl3 p-r-20">
                        Bán ra: ${ele.sell}
                      </span>
                    </div>
									</div>  
								</li>
							</ul>
        `
      });
      goldContent.html(content);
    }
  });

  $.ajax({
    type: "GET",
    url: API_URL + "get-coin",
    dataType: "json",
    success: function alo (response) {
      let content = '';
      response.forEach(function (ele){
        function parse () {
    
        }
        content += `
        <li class="flex-wr-sb-c p-b-20">
									<div class="size-w-3 flex-wr-sb-c">
										<p href="#" class="f1-s-9 text-uppercase cl3">
											${ele.name}
										</p>
                  </div>
                  
                  <div>
                    <p class="f1-s-8 cl3 p-r-20">
                      Giá: ${ele.price}
                    </p>
                    <p class="f1-s-8 cl3 p-r-20">
                      Tỉ giá thay đổi trong 24 giờ: ${ele.percent_change_24h}%
                    </p>
                    <p class="f1-s-8 cl3 p-r-20">
                      Tỉ giá thay đổi trong 1 giờ: ${ele.percent_change_1h}%
                    </p>
                  </div>
				</li>
        `
      });
      coinContent.html(content);
    }
  });

  $(document).on("click", ".arrow-main-menu-m", function () {
    $(this).parent().find(".sub-menu-m").slideToggle();
    $(this).toggleClass("turn-arrow-main-menu-m");
  });
});

