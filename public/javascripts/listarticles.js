const LOCALHOST_API = 'http://localhost:3000/articles';

function getDataFromApi(query, callback) {

    $.getJSON(LOCALHOST_API, query, callback);
}

function renderResult(result) {
    return `<div class="container ${result['_id']}">
        <div class="img-container"><img class="a-image" src="/images/${result['image_url']}"></div>
        <div class="article-card">
            <div class="a-title">${result['title']}</div>
            <div class="a-content">${result['content'].toString().substring(0, 140)}</div>
            <div>
                <div class="a-category">${result['category']}</div>
                <div class="a-date">${result['date'].toString().substring(0, 10)}</div>
            </div>
            <div class="controls" id="js-controls">
                <button class="a-change control" id="changebtn" onclick="changeArticle('${result['_id']}')">Change</button>
                <button class="a-delete control" id="deletebtn" onclick="removeArticle('${result['_id']}')">Delete</button>
            </div>
        </div>
    </div>`;
}

function displayData(data) {
    const results = data.map((item, index) => renderResult(item));
    $('#js-items').append(results);
}

function getArticles(page) {
    const query = {
        articleID: 'all',
        page: page
    };
    $('#js-items').empty();
    getDataFromApi(query, displayData);
}

function changeArticle(id){
    /* let url_query =`?_id=${id}`;
    $.ajax({
        url: "http://localhost:3000/list" + url_query,
        type: 'GET',
        success: function (data, textStatus, xhr) {
            console.log(data);
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log('Error in Operation');
        }
    }); */
}

function removeArticle(id){
    if(confirm("Do you want to delete this article?")) {
        let url_query =`?articleID=${id}`;
        $.ajax({
            url: LOCALHOST_API + url_query,
            type: 'DELETE',
            success: function (data, textStatus, xhr) {
                if(data) $(`.${id}`).remove();
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log('Error in Operation');
            }
        });
    }
}

function addPages(){
    let pages = $('.pages');
    let total = pages[0].id;
    let results = [];
    for(let i = 0; i< total; i++){
        let p = `<li><button class="control" onclick="getArticles(${i+1})">${i+1}</button></li>`;
        results.push(p);
    }
    pages.append(results);
}

$(() => {
    addPages();
    getArticles(1);
});




