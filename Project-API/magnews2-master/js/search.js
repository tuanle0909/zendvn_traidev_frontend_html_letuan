const API_URL = "http://apiforlearning.zendvn.com/api/";
const API_ARTICLES = API_URL + "articles";
const API_SEARCH = API_ARTICLES + "/search";
const btnSearch = $('#btn-search')
const searchResults = $('#search-list')
let searchString = $('#search-input');


btnSearch.on('click', function(){
    let searchKey = searchString.val();
    $.ajax({
        type: "GET",
        url: API_SEARCH + `?q=${searchKey}`,
        dataType: "json",
        success: function (response) {
            let content = '';
            content += `
            <div class="col-sm-6 p-r-25 p-r-15-sr991">
              <div class="m-b-45">
                                <a href="detail.html?id=${response.id}" class="wrap-pic-w hov1 trans-03">
                                    <img src="${response.thumb}">
                                </a>
                                <div class="p-t-16">
                                    <h5 class="p-b-5">
                                        <a href="blog-detail-01.html" class="f1-m-3 cl2 hov-cl10 trans-03">
                                            ${response.title}
                                        </a>
                                    </h5>
                                        <span class="f1-s-3">
                                            ${response.publish_date}
                                        </span>
                                    </div>
                        </div>
            </div>
            `
            searchResults.html(content);
        }
    });
})