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
  let goldContent = $('#gold-content');
  let coinContent = $('#coin-content');

  let favItem = JSON.parse(localStorage.getItem('FAV_LIST')) || [];
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
                      let isActive = favItem.indexOf(ele.id) != -1 ? 'active-icon-fav' : '';
                        article += `
                      <div class="bg-img1 size-a-3 how1 pos-relative"
                      style="background-image: url(${ele.thumb});">
                      <a href="detail.html?id=${ele.id}" class="dis-block how1-child1 trans-03"></a>
                      <div class="flex-col-e-s s-full p-rl-25 p-tb-20">
                        <h3 class="how1-child2 m-t-14 m-b-10">
                        <button data-id="${ele.id}" class="btn-like-article"><i class="fa-solid fa-heart icon-wishlist ${isActive}" id="heartWish${ele.id}"></i></button>
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
                      let isActive = favItem.indexOf(ele.id) != -1 ? 'active-icon-fav' : '';
                        subArticles += `
            <div class="col-sm-6 p-rl-1 p-b-2">
							<div class="bg-img1 size-a-14 how1 pos-relative"
								style="background-image: url(${ele.thumb});">
								<a href="detail.html?id=${ele.id}" class="dis-block how1-child1 trans-03"></a>

								<div class="flex-col-e-s s-full p-rl-25 p-tb-20">
									<h3 class="how1-child2 m-t-14">
                  <button data-id="${ele.id}" class="btn-like-article"><i class="fa-solid fa-heart icon-wishlist ${isActive}" id="heartWish${ele.id}"></i></button>
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
            let allMenu = ''
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
              let price = parseFloat(ele.buy);
                let priceRound = price.toFixed(2);
                let priceSell = parseFloat(ele.sell);
                let priceCellRound = priceSell.toFixed(2);
                 content += `
                 <div class="gold-info">
                    <div class="gold-type">${ele.type}</div>
                    <div class="gold-buy">${priceRound}</div>
                    <div class="gold-cell">${priceCellRound}</div>
                 </div>
                
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
              let price = parseFloat(ele.price);
              let priceChange = parseFloat(ele.percent_change_24h);
              let priceChangeRound = priceChange.toFixed(2);
              let priceRound = price.toFixed(2);
                content += `
                <div class="gold-info">
                <div class="gold-type">${ele.name}</div>
                <div class="gold-buy">${priceRound} USD</div>
                <div class="gold-cell">${priceChangeRound}</div>
                </div>
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
            let date = moment(ele.publish_date);
            let time = date.fromNow();
              let isActive = favItem.indexOf(ele.id) != -1 ? 'active-icon-fav' : '';
              content += `
                <div class="col-sm-6 p-r-25 p-r-15-sr991">
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
          });
          articles.html(content);
        },
      });
    }

    $(document).on('click', '.arrow-main-menu-m', function () {
      $(this).parent().find('.sub-menu-m').slideToggle();
      $(this).toggleClass('turn-arrow-main-menu-m');
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
