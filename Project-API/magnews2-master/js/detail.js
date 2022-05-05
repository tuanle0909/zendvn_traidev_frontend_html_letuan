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

    $('#btn-search').on('click', function () {
      let value = $('#search').val();
      window.location.href = "searchresults.html?keyword=" + value;
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

    // ======================== LOAD BLOG DETAIL =================== //
    $.ajax({
        type: 'GET',
        url: API_ARTICLES + `/${stringId}`,
        dataType: 'json',
        success: function (ele) {
            idCate = ele.category_id;
            // Page Title
            title.html(`<title>${ele.title}</title>`);

            // Blog Detail
            let content = `
            <h3 class="f1-l-3 cl2 p-b-16 p-t-33 respon2">
                ${ele.title}
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
});
