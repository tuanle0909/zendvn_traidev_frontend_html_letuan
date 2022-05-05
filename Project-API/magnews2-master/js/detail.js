$(document).ready(function () {
  const API_URL = "http://apiforlearning.zendvn.com/api/";
  const API_ARTICLES = API_URL + "articles";
  const API_CATEGORY = API_URL + "categories_news";
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const stringId = urlParams.getAll("id").toString();
  const blogDetail = $("#blog-detail");
  const breadcrumb = $("#breadcrumb");
  const title = $('#title')

  $.ajax({
    type: "GET",
    url: API_ARTICLES + `/${stringId}`,
    dataType: "json",
    success: function (ele) {
      idCate = ele.category_id;
      let content = '';
      content += `<title>${ele.title}</title>`
      title.html(content);
      $.ajax({
        type: "GET",
        url: API_CATEGORY + `/${idCate}`,
        dataType: "json",
        success: function (response) {
          let content = ""; 
          content += `
                  <a href="index.html" class="breadcrumb-item f1-s-3 cl9">
					Trang chủ 
				  </a>

				<a href="category.html?id=${idCate}" class="breadcrumb-item f1-s-3 cl9">
					${response.name} 
				</a>

				<span class="breadcrumb-item f1-s-3 cl9">
					 ${ele.title}
				</span>
                  `;
          breadcrumb.html(content);
        },
      });
    },
  });

  $.ajax({
    type: "GET",
    url: API_ARTICLES + `/${stringId}`,
    dataType: "json",
    success: function (ele) {
      idCate = ele.category_id;
      $.ajax({
        type: "GET",
        url: API_CATEGORY + `/${idCate}`,
        dataType: "json",
        success: function (response) {
          let content = "";
          content += `
        <a href="#" class="f1-s-10 cl2 hov-cl10 trans-03 text-uppercase">
            ${response.name}
        </a>

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
        ${ele.content}
    </div>  
    `;
          blogDetail.html(content);
        },
      });
    },
  });
});
