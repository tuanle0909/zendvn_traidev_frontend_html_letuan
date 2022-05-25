$(document).ready(function () {
  const API_URL = "http://apiforlearning.zendvn.com/api/";
  const API_ARTICLES = API_URL + "articles";
  const API_CATEGORY = API_URL + "categories_news";
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const stringId = urlParams.getAll("id").toString();
  const blogDetail = $("#blog-detail");
  const breadcrumb = $("#breadcrumb");
  const title = $("#title");
  const categories = $("#zvn-menu-desktop");
  const categoriesMobile = $("#zvn-menu-mobile");
  const sidebarCate = $("#sidebar-cate");
  const inputCmt = $(".cmt");
  const inputCmtEmail = $(".cmt-email");
  const btnCmt = $(".btn-cmt");
  const cmtContent = $('#cmt-content');
  const lCmt = $('.length-cmt')
  let comments = loadCmt();

  let favItem = JSON.parse(localStorage.getItem("FAV_LIST")) || [];
  console.log(favItem);

  function loadCmt() {
    return JSON.parse(localStorage.getItem("COMMENTS")) || [];
  }

  function saveCmt(data) {
    localStorage.setItem("COMMENTS", JSON.stringify(data));
  }

  $("#btn-search").on("click", function () {
    let value = $("#search").val();
    window.location.href = "searchresults.html?keyword=" + value;
  });

  $(document).on("click", ".m-all-5", function () {
    let text = $(this).text();
    window.location.href = "searchresults.html?keyword=" + text;
  });

  // ======================== LOAD MENU DESKTOP =================== //
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

  // ======================== LOAD BLOG DETAIL =================== //
  $.ajax({
    type: "GET",
    url: API_ARTICLES + `/${stringId}`,
    dataType: "json",
    beforeSend: function () {
      blogDetail.html('<img width="500" src="images/0_ptDX0HfJCYpo9Pcs.gif">');
    },
    success: function (ele) {
      let isActive = favItem.indexOf(ele.id) != -1 ? "active-icon-fav" : "";
      let date = moment(ele.publish_date);
            let time = date.fromNow();
      idCate = ele.category_id;
      // Page Title
      title.html(`<title>${ele.title}</title>`);
      
      // Blog Detail
      let content = `
            <div class="detail-flex">
            <h3 class="f1-l-3 cl2 p-b-16 p-t-33 respon2 title-detail">
            ${ele.title}
            </h3>
            <button data-id="${ele.id}" class="btn-like-article heart-detail"><i class="fa-solid fa-heart icon-wishlist ${isActive}" id="heartWish${ele.id}"></i></button>  
            </div>
        
            <div class="flex-wr-s-s p-b-40">
                <span class="f1-s-3 cl8 m-r-15">
                    <span>
                        ${time}
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
        type: "GET",
        url: API_CATEGORY + `/${idCate}`,
        dataType: "json",
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

  function showCmt (){
    let idx = comments.find( x => x.id == stringId);
    let content = '';
    let lengthCmt = '';
    if (!idx) {
      content = content + `
      <h5 class="unfound-cmt">*Bài viết chưa có bình luận</h5>
      `;
      lengthCmt = '(0)'
    } else {
      let info = idx.comment;
      lengthCmt = lengthCmt + `
        (${info.length})
        `
      for (let i = 0; i < info.length; i++) {
        content = content + `
        <li>
          <div class="border-cmt">
            <div class="email-i">
              ${info[i].email}
            </div>
            <div class="content-i">
              <p>${info[i].content}</p>
            </div>
          </div>
        </li>
        `;
      } 
    }
    lCmt.html(lengthCmt)
    cmtContent.html(content);
  }
  showCmt(comments);


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
  
  btnCmt.on("click", function () {
    let cmtValue = inputCmt.val();
    let emailValue = inputCmtEmail.val();
    let infoCmt = {
      "email": emailValue,
      "content": cmtValue,
    };

    let idx = comments.findIndex((item) => item.id == stringId);
    if (idx > -1) {
      comments[idx].comment.push(infoCmt);
    } else {
      let comment = [infoCmt];
      let newCmt = {
        id: stringId,
        comment,
      };
      comments.push(newCmt);
    }
    location.reload();
    saveCmt(comments);
  });
});
