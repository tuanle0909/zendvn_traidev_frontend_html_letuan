$(document).ready(function () {
    const API_URL = 'http://apiforlearning.zendvn.com/api/';
    const API_CATEGORY = API_URL + 'categories_news';
    const API_ARTICLES = API_URL + 'articles';
    let categories = $('#zvn-menu-desktop');
    let categoriesMobile = $('#zvn-menu-mobile');
    let newestBlog = $('#newest');
    let lastestBlog = $('#lastest');
    let goldContent = $('#get-gold');
    let coinContent = $('#coin-content');

    let favItem = JSON.parse(localStorage.getItem('FAV_LIST')) || [];
    console.log(favItem);

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
        url: API_ARTICLES,
        data: { offset: 0, limit: 3 },
        dataType: 'json',
        beforeSend: function () {
            newestBlog.html('<img width="500" src="images/0_ptDX0HfJCYpo9Pcs.gif">');
        },
        success: function (response) {
            let content = '';
            response.forEach(function (ele) {
                let idCategory = ele.category_id;
                $.ajax({
                    type: 'GET',
                    url: API_CATEGORY + `/${idCategory}`,
                    dataType: 'json',
                    success: function (response) {
                        let isActive = favItem.indexOf(ele.id) != -1 ? 'active-icon-fav' : '';
                        content += `
                                  <div class="col-md-4 p-rl-1 p-b-2">
                                  <button data-id="${ele.id}" class="btn-like-article head"><i class="fa-solid fa-heart icon-wishlist ${isActive}" id="heartWish${ele.id}"></i></button>
                                    <div class="bg-img1 size-a-11 how1 bg-image" style="background-image: url(${ele.thumb});">
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
                                  `;
                        newestBlog.html(content);
                    },
                });
            });
        },
    });

    function loadLastestArticle() {
        $.ajax({
            type: 'GET',
            url: API_ARTICLES,
            data: { offset: 3, limit: 3 },
            dataType: 'json',
            success: function (response) {
                let content = '';
                response.forEach(function (ele, index) {
                    let isActive = favItem.indexOf(ele.id) != -1 ? 'active-icon-fav' : '';
                    content += `
                    <div class="col-sm-6 col-md-4">
                      <div class="m-b-45">
                          <a href="detail.html?id=${ele.id}" class="wrap-pic-w hov1 trans-03">
                            <img src="${ele.thumb}" alt="IMG">
                          </a>
                          <button data-id="${ele.id}" class="btn-like-article"><i class="fa-solid fa-heart icon-wishlist ${isActive}" id="heartWish${ele.id}"></i></button>
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
                    lastestBlog.html(content);
                });
            },
        });
    }

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
							<ul class="p-t-15">
								<li class="flex-wr-sb-c p-b-20">

									<div class="size-w-3 flex-wr-sb-c">
										<p href="#" class="f1-s-9 text-uppercase cl3">
											${ele.type}
										</p>

                    <div class="gold-content">
                      <span class="f1-s-8 cl3 p-r-20">
                        Mua vào: ${priceRound}
                      </span>

                      <span class="f1-s-8 cl3 p-r-20">
                        Bán ra: ${priceCellRound}
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
              let price = parseFloat(ele.price);
              let priceChange = parseFloat(ele.percent_change_24h);
              let priceChangeRound = priceChange.toFixed(2);
              let priceRound = price.toFixed(2);
                content += `
        <li class="flex-wr-sb-c p-b-20">
									<div class="size-w-3 flex-wr-sb-c">
										<p href="#" class="f1-s-9 text-uppercase cl3">
											${ele.name}
										</p>
                  </div>
                  
                  <div>
                    <p class="f1-s-8 cl3 p-r-20">
                      Giá: ${priceRound}
                    </p>
                    <p class="f1-s-8 cl3 p-r-20">
                      Tỉ giá thay đổi trong 24 giờ: ${priceChangeRound}%
                    </p>
                  </div>
				</li>
        `;
            });
            coinContent.html(content);
        },
    });

    loadLastestArticle();

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
        } else {
            $(this).find(`#heartWish${id}`).addClass('active-icon-fav');
            favItem.push(id);
        }
        localStorage.setItem('FAV_LIST', JSON.stringify(favItem));
    });
});
