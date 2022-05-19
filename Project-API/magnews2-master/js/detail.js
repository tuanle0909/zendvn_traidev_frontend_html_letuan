$(document).ready(function () {
    const API_URL = 'http://apiforlearning.zendvn.com/api/';
    const API_ARTICLES = API_URL + 'articles';
    const API_CATEGORY = API_URL + 'categories_news';
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const stringId = urlParams.getAll('id').toString();
    const blogDetail = $('#blog-detail');
    const breadcrumb = $('#breadcrumb');
    const title = $('#title');
    const categories = $("#zvn-menu-desktop");
    const categoriesMobile = $("#zvn-menu-mobile");
    const sidebarCate = $('#sidebar-cate');
    const inputCmt = $('.cmt');
    const inputCmtEmail = $('.cmt-email');
    const btnCmt = $('.btn-cmt');
    let comments = loadCmt();

    let favItem = JSON.parse(localStorage.getItem('FAV_LIST')) || [];
    console.log(favItem);

    function loadCmt (){
      return JSON.parse(localStorage.getItem('COMMENTS')) || [];
    }

    function saveCmt(data) {
      localStorage.setItem("COMMENTS", JSON.stringify(data));
    }

    $('#btn-search').on('click', function () {
      let value = $('#search').val();
      window.location.href = "searchresults.html?keyword=" + value;
    })

    $(document).on('click', '.m-all-5', function(){
      let text = $(this).text();
      window.location.href = "searchresults.html?keyword=" + text;
    })

    // ======================== LOAD MENU DESKTOP =================== //
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
          `
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

    // ======================== LOAD BLOG DETAIL =================== //
    $.ajax({
        type: 'GET',
        url: API_ARTICLES + `/${stringId}`,
        dataType: 'json',
        beforeSend: function () {
          blogDetail.html(
            '<img width="500" src="images/0_ptDX0HfJCYpo9Pcs.gif">'
          );
        },
        success: function (ele) {
            let isActive = favItem.indexOf(ele.id) != -1 ? 'active-icon-fav' : '';
            idCate = ele.category_id;
            // Page Title
            title.html(`<title>${ele.title}</title>`);

            // Blog Detail
            let content = `
            <h3 class="f1-l-3 cl2 p-b-16 p-t-33 respon2">
                ${ele.title}
                <button data-id="${ele.id}" class="btn-like-article heart-detail"><i class="fa-solid fa-heart icon-wishlist ${isActive}" id="heartWish${ele.id}"></i></button>
            </h3>
            
        
            <div class="flex-wr-s-s p-b-40">
                <span class="f1-s-3 cl8 m-r-15">
                    <span>
                        ${ele.publish_date}
                    </span>
                </span>
            </div>

            <div class="wrap-pic-max-w p-b-30">
                <img src=${ele.thumb} alt="IMG">
            </div>
            <div>${ele.content}</div>
            `;
            blogDetail.html(content);

            // Breadcrumb
            $.ajax({
                type: 'GET',
                url: API_CATEGORY + `/${idCate}`,
                dataType: 'json',
                success: function (response) {
                    let content = `
                      <a href="index.html" class="breadcrumb-item f1-s-3 cl9">Trang chủ</a>
                      <a href="category.html?id=${idCate}" class="breadcrumb-item f1-s-3 cl9">${response.name}</a>
                      <span class="breadcrumb-item f1-s-3 cl9">${ele.title}</span>
                      `;
                    breadcrumb.html(content);
                },
            });
        },
    });

    $(document).on("click", ".arrow-main-menu-m", function () {
      $(this).parent().find(".sub-menu-m").slideToggle();
      $(this).toggleClass("turn-arrow-main-menu-m");
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

    btnCmt.on('click', function(){
      let cmtValue = inputCmt.val();
      let emailValue = inputCmtEmail.val();
      let infoCmt = {
        "email": emailValue,
        "content": cmtValue,
      };
      
      let comment = [infoCmt];
      let newCmt = {
        id: stringId,
        comment,
      };
      saveCmt(newCmt)
      console.log(newCmt);
    })
});
