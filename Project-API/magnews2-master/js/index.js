$(document).ready(function () {
    const API_URL = 'http://apiforlearning.zendvn.com/api/';
    const API_CATEGORY = API_URL + 'categories_news';
    let categories = $('#zvn-menu-desktop');
    let categoriesMobile = $('#zvn-menu-mobile');
    let articles = $('#articles');
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

    $(document).on('click', '.arrow-main-menu-m', function () {
        $(this).parent().find('.sub-menu-m').slideToggle();
        $(this).toggleClass('turn-arrow-main-menu-m');
    });
});
