$(document).ready(function () {
  const API_URL = 'http://apiforlearning.zendvn.com/api/';
  const API_CATEGORY = API_URL + 'categories_news';
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const stringId = urlParams.getAll('id').toString();
  const breadcrumb = $('#breadCrumb');
  const pageheading = $('#pageHeading');
  const title = $('#title');
  const btnPre = $('.btn-pre');
  const btnNext = $('.btn-next');
  let categories = $('#zvn-menu-desktop');
  let categoriesMobile = $('#zvn-menu-mobile');
  let articles = $('#articles');
  let feature1stArticle = $('#firstArticle');
  let subFeature = $('#sub-articles');
  let offset = 5;
  let itemOfPage = 10;
  let goldContent = $('#get-gold');
  let coinContent = $('#coin-content');

  let arr = [
    
  ];

  console.log(arr.findIndex(fruit => fruit.article_id === 2));

  getItems();

  

    btnNext.on('click', function () {
        btnPre.removeClass('btn-disable');
        offset = offset + 10;
        getItems();
    });

    btnPre.on('click', function () {
        offset -= 10;
        if (offset === 5) $(this).addClass('btn-disable');
        getItems();
    });

    $('#btn-search').on('click', function () {
        let value = $('#search').val();
        window.location.href = 'searchresults.html?keyword=' + value;
    });

    $.ajax({
        type: 'GET',
        url: API_CATEGORY + `/${stringId}`,
        dataType: 'json',
        success: function (response) {
            let content = '';
            let article = '';
            let subArticles = '';
            content += `
              <a href="index.html" class="breadcrumb-item f1-s-3 cl9">
                  Trang chủ
                </a>
                <span class="breadcrumb-item f1-s-3 cl9">
                  ${response.name}
                </span>
              `;
            let pageHeading = '';
            pageHeading += `
      <h2 class="f1-l-1 cl2">
			${response.name}
		  </h2>
      `;

            let webtitle = '';
            webtitle += `
      <title>${response.name}</title>
      `;
            $.ajax({
                type: 'GET',
                url: API_CATEGORY + `/${stringId}` + '/articles',
                data: { offset: 0, limit: 1 },
                dataType: 'json',
                beforeSend: function () {
                    feature1stArticle.html('<img width="500" src="images/0_ptDX0HfJCYpo9Pcs.gif">');
                },
                success: function (feature) {
                    feature.forEach(function (ele) {
                        article += `
            <div class="bg-img1 size-a-3 how1 pos-relative"
						style="background-image: url(${ele.thumb});">
						<a href="detail.html?id=${ele.id}" class="dis-block how1-child1 trans-03"></a>

						<div class="flex-col-e-s s-full p-rl-25 p-tb-20">
							<h3 class="how1-child2 m-t-14 m-b-10">
								<a href="detail.html?id=${ele.id}" class="how-txt1 size-a-6 f1-l-1 cl0 hov-cl10 trans-03">
									${ele.title}
								</a>
							</h3>
						</div>
					</div>
            `;
                    });
                    feature1stArticle.html(article);
                },
            });

            $.ajax({
                type: 'GET',
                url: API_CATEGORY + `/${stringId}` + '/articles',
                data: { offset: 1, limit: 4 },
                dataType: 'json',
                beforeSend: function () {
                    subFeature.html('<img width="500" src="images/0_ptDX0HfJCYpo9Pcs.gif">');
                },
                success: function (subfeature) {
                    subfeature.forEach(function (ele) {
                        subArticles += `
            <div class="col-sm-6 p-rl-1 p-b-2">
							<div class="bg-img1 size-a-14 how1 pos-relative"
								style="background-image: url(${ele.thumb});">
								<a href="detail.html?id=${ele.id}" class="dis-block how1-child1 trans-03"></a>

								<div class="flex-col-e-s s-full p-rl-25 p-tb-20">
									<h3 class="how1-child2 m-t-14">
										<a href="detail.html?id=${ele.id}"
											class="how-txt1 size-h-1 f1-m-1 cl0 hov-cl10 trans-03">
											${ele.title}
										</a>
									</h3>
								</div>
							</div>
						</div>
            `;
                    });
                    subFeature.html(subArticles);
                },
            });

            title.html(webtitle);
            pageheading.html(pageHeading);
            breadcrumb.html(content);
        },
    });

    $.ajax({
        type: 'GET',
        url: API_CATEGORY,
        data: { offset: 0, limit: 20 },
        dataType: 'json',
        success: function (response) {
            let content = '';
            let oMenu = '';
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
        type: 'GET',
        url: API_CATEGORY,
        data: { offset: 0, limit: 20 },
        dataType: 'json',
        success: function (response) {
            let content = '';
            let oMenu = '';
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
        type: 'GET',
        url: API_URL + 'get-gold',
        dataType: 'json',
        success: function (response) {
            let content = '';
            response.forEach(function (ele) {
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
        `;
            });
            goldContent.html(content);
        },
    });

    $.ajax({
        type: 'GET',
        url: API_URL + 'get-coin',
        dataType: 'json',
        success: function alo(response) {
            let content = '';
            response.forEach(function (ele) {
                function parse() {}
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
        `;
            });
            coinContent.html(content);
        },
    });

    $(document).on('click', '.arrow-main-menu-m', function () {
        $(this).parent().find('.sub-menu-m').slideToggle();
        $(this).toggleClass('turn-arrow-main-menu-m');
    });

    function getItems() {
      $.ajax({
        type: 'GET',
        url: API_CATEGORY + `/${stringId}` + '/articles',
        data: { offset: offset, limit: itemOfPage },
        dataType: 'json',
        beforeSend: function () {
          articles.html('<img width="500" src="images/0_ptDX0HfJCYpo9Pcs.gif">');
        },
        success: function (response) {
          let content = '';
          response.forEach(function (ele) {
              content += `
                <div class="col-sm-6 p-r-25 p-r-15-sr991">
                  <div class="m-b-45">
                      <a href="detail.html?id=${ele.id}" class="wrap-pic-w hov1 trans-03">
                        <img src="${ele.thumb}">
                      </a>
                      <div class="p-t-16">
                        <h5 class="p-b-5">
                          <a href="detail.html?id=${ele.id}" class="f1-m-3 cl2 hov-cl10 trans-03">
                            ${ele.title}
                          </a>
                        </h5>
                          <span class="f1-s-3">
                            ${ele.publish_date}
                          </span>
                        </div>
                  </div>
                </div>
                `;
          });
          articles.html(content);
        },
      });
    }
});
