$(document).ready(function () {
    const API_URL = 'http://apiforlearning.zendvn.com/api/';
    const API_CATEGORY = API_URL + 'categories_news';
    const API_ARTICLES = API_URL + 'articles';
    let categories = $('#zvn-menu-desktop');
    let categoriesMobile = $('#zvn-menu-mobile');
    let newestBlog = $('#newest');
    let lastestBlog = $('#lastest');
    let goldContent = $('#gold-content');
    let coinContent = $('#coin-content');
    let firstArticle = $('#1stArticle');
    let articles1 = $('#articles1')
    let secondArticle = $('#2ndArticle');
    let articles2 = $('#articles2');
    let thirdArticle = $('#conTent1');
    let thirdArticle2 = $('#conTent2');

    let favItem = JSON.parse(localStorage.getItem('FAV_LIST')) || [];

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
                                          <button data-id="${ele.id}" class="btn-like-article head"><i class="fa-solid fa-heart icon-wishlist ${isActive}" id="heartWish${ele.id}"></i></button>
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

    $.ajax({
        type: "GET",
        url: API_CATEGORY + "/1/articles",
        data: {offset: 0, limit: 3},
        dataType: "json",
        beforeSend: function () {
            firstArticle.html('<img width="500" src="images/0_ptDX0HfJCYpo9Pcs.gif">');
        },
        success: function (response) {
            let content = '';
            let con = ''
            response.forEach( function (ele, index){
                let isActive = favItem.indexOf(ele.id) != -1 ? 'active-icon-fav' : '';
                let date = moment(ele.publish_date);
                let time = date.fromNow();
                if (index == 1) {
                    content = content + `
                    <div class="m-b-30 rela">
										<a href="blog-detail-02.html" class="wrap-pic-w hov1 trans-03">
											<img src="${ele.thumb}" alt="IMG">
										</a>
                                        <button data-id="${ele.id}" class="btn-like-article head"><i class="fa-solid fa-heart icon-wishlist ${isActive}" id="heartWish${ele.id}"></i></button>
										<div class="p-t-25">
											<h5 class="p-b-5">
												<a href="blog-detail-02.html" class="f1-m-3 cl2 hov-cl10 trans-03">
													${ele.title}
												</a>
											</h5>

											<span class="cl8">
												<a href="#" class="f1-s-4 cl8 hov-cl10 trans-03">
													Thế giới
												</a>

												<span class="f1-s-3 m-rl-3">
													-
												</span>

												<span class="f1-s-3">
													${time}
												</span>
											</span>

											<p class="f1-s-1 cl6 p-t-18">
												${ele.description}
											</p>
										</div>
					</div>
                    `
                } else {
                    con = con + `
                    <div class="m-b-30 rela">
										<a href="blog-detail-02.html" class="wrap-pic-w hov1 trans-03">
											<img src="${ele.thumb}" alt="IMG">
										</a>
                                        <button data-id="${ele.id}" class="btn-like-article head"><i class="fa-solid fa-heart icon-wishlist ${isActive}" id="heartWish${ele.id}"></i></button>
										<div class="p-t-10">
											<h5 class="p-b-5">
												<a href="blog-detail-02.html" class="f1-s-5 cl3 hov-cl10 trans-03">
													${ele.title}
												</a>
											</h5>

											<span class="cl8">
												<a href="#" class="f1-s-6 cl8 hov-cl10 trans-03">
													Thế giới
												</a>

												<span class="f1-s-3 m-rl-3">
													-
												</span>

												<span class="f1-s-3">
													${time}
												</span>
											</span>
										</div>
									</div>
                    `
                }
                articles1.html(con)
                firstArticle.html(content)
            })
        }
    });

    $.ajax({
        type: "GET",
        url: API_CATEGORY + "/2/articles",
        data: {offset: 0, limit: 3},
        dataType: "json",
        beforeSend: function () {
            firstArticle.html('<img width="500" src="images/0_ptDX0HfJCYpo9Pcs.gif">');
        },
        success: function (response) {
            let content = '';
            let con = ''
            response.forEach( function (ele, index){
                let isActive = favItem.indexOf(ele.id) != -1 ? 'active-icon-fav' : '';
                let date = moment(ele.publish_date);
                let time = date.fromNow();
                if (index == 1) {
                    content = content + `
                    <div class="m-b-30 rela">
                        <a href="detail.html?id=${ele.id}" class="wrap-pic-w hov1 trans-03">
                            <img src="${ele.thumb}" alt="IMG">
                        </a>
                        <button data-id="${ele.id}" class="btn-like-article head"><i class="fa-solid fa-heart icon-wishlist ${isActive}" id="heartWish${ele.id}"></i></button>
                        <div class="p-t-25">
                            <h5 class="p-b-5">
                                <a href="detail.html?id=${ele.id}" class="f1-m-3 cl2 hov-cl10 trans-03">
                                    ${ele.title}
                                </a>
                            </h5>

                            <span class="cl8">
                                <a href="#" class="f1-s-4 cl8 hov-cl10 trans-03">
                                    Thế giới
                                </a>

                                <span class="f1-s-3 m-rl-3">
                                    -
                                </span>

                                <span class="f1-s-3">
                                    ${time}
                                </span>
                            </span>

                            <p class="f1-s-1 cl6 p-t-18">
                                ${ele.description}
                            </p>
                        </div>
					</div>
                    `
                } else {
                    con = con + `
                    <div class="m-b-30 rela">
										<a href="detail.html?id=${ele.id}" class="wrap-pic-w hov1 trans-03">
											<img src="${ele.thumb}" alt="IMG">
										</a>
                                        <button data-id="${ele.id}" class="btn-like-article head"><i class="fa-solid fa-heart icon-wishlist ${isActive}" id="heartWish${ele.id}"></i></button>
										<div class="p-t-10">
											<h5 class="p-b-5">
												<a href="detail.html?id=${ele.id}" class="f1-s-5 cl3 hov-cl10 trans-03">
													${ele.title}
												</a>
											</h5>

											<span class="cl8">
												<a href="#" class="f1-s-6 cl8 hov-cl10 trans-03">
													Thế giới
												</a>

												<span class="f1-s-3 m-rl-3">
													-
												</span>

												<span class="f1-s-3">
													${time}
												</span>
											</span>
										</div>
									</div>
                    `
                }
                articles2.html(con);
                secondArticle.html(content);
            })
        }
    });

    $.ajax({
        type: "GET",
        url: API_CATEGORY + "/5/articles",
        data: {offset: 0, limit: 4},
        dataType: "json",
        beforeSend: function () {
            thirdArticle.html('<img width="500" src="images/0_ptDX0HfJCYpo9Pcs.gif">');
            thirdArticle2.html('<img width="500" src="images/0_ptDX0HfJCYpo9Pcs.gif">');
        },
        success: function (response) {
            let content1 = '';
            let content2 = '';
            response.forEach(function (ele, index){
                let isActive = favItem.indexOf(ele.id) != -1 ? 'active-icon-fav' : '';
                let date = moment(ele.publish_date);
                let time = date.fromNow();
                if (index < 2) {
                    content1 = content1 + `
                    <div class="flex-wr-sb-s m-b-30 rela">
                        <a href="detail.html?id=${ele.id}" class="size-w-1 wrap-pic-w hov1 trans-03">
                            <img src="${ele.thumb}" alt="IMG">
                        </a>
                        <button data-id="${ele.id}" class="btn-like-article tiny"><i class="fa-solid fa-heart icon-wishlist ${isActive}" id="heartWish${ele.id}"></i></button>
                        <div class="size-w-2">
                            <h5 class="p-b-5">
                                <a href="detail.html?id=${ele.id}" class="f1-s-5 cl3 hov-cl10 trans-03">
                                    ${ele.title}
                                </a>
                            </h5>

                            <span class="cl8">
                                <a href="#" class="f1-s-6 cl8 hov-cl10 trans-03">
                                    Giải trí
                                </a>

                                <span class="f1-s-3 m-rl-3">
                                    -
                                </span>

                                <span class="f1-s-3">
                                    ${time}
                                </span>
                            </span>
                        </div>
                    </div>
                    `
                } else {
                    content2 = content2 + `
                    <div class="flex-wr-sb-s m-b-30 rela">
                    <a href="detail.html?id=${ele.id}" class="size-w-1 wrap-pic-w hov1 trans-03">
                        <img src="${ele.thumb}" alt="IMG">
                    </a>
                    <button data-id="${ele.id}" class="btn-like-article tiny"><i class="fa-solid fa-heart icon-wishlist ${isActive}" id="heartWish${ele.id}"></i></button>
                    <div class="size-w-2">
                        <h5 class="p-b-5">
                            <a href="detail.html?id=${ele.id}" class="f1-s-5 cl3 hov-cl10 trans-03">
                                ${ele.title}
                            </a>
                        </h5>

                        <span class="cl8">
                            <a href="#" class="f1-s-6 cl8 hov-cl10 trans-03">
                                Giải chí
                            </a>

                            <span class="f1-s-3 m-rl-3">
                                -
                            </span>

                            <span class="f1-s-3">
                                ${time}
                            </span>
                        </span>
                    </div>
                </div>
                    `
                }
                thirdArticle2.html(content2);
                thirdArticle.html(content1);
            });
        }
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
