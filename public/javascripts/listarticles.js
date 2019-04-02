const LOCALHOST_API = 'http://localhost:3000/api/articles';
let PAGE = 1;

function getDataFromApi(aquery, callback) {
    const query = {
        articleID: aquery,
        page: PAGE
    };

    $.getJSON(LOCALHOST_API, query, callback);
}

function renderResult(result) {
    console.log(result);
    return `<div class="container">
        <div class="img-container"><img class="a-image" src="/images/${result['image_url']}"></div>
        <div class="article-card">
            <div class="a-title">${result['title']}</div>
            <div class="a-content">${result['content'].toString().substring(0, 140)}</div>
            <div>
                <div class="a-category">${result['category']}</div>
                <div class="a-date">${result['date'].toString().substring(0, 10)}</div>
            </div>
            <div class="controls" id="js-controls"><a href="#">
                <div class="a-change control" id="${result['_id']}">Change</div></a>
                <div class="a-delete control" id="d-${result['_id']}">Delete</div>
            </div>
        </div>
    </div>`;
}

function displayData(data) {
    const results = data.map((item, index) => renderResult(item));
    $('body').append(results);
}

function getArticles() {
    const query = "all";
    getDataFromApi(query, displayData);
}

$(getArticles);




