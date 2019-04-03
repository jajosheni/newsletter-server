const LOCALHOST_API = 'http://localhost:3000/categories';

function delCategory(){
    event.stopPropagation();
    event.preventDefault();
    let select = $('#category').children("option:selected");
    let url_query =`?category=${select.val()}`;
    $.ajax({
        url: LOCALHOST_API + url_query,
        type: 'DELETE',
        success: function (data, textStatus, xhr) {
            if(data){
                select.remove();
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log('Error in Operation');
        }
    });
}

function addOption(text, value){
    let select = document.getElementById("category");
    select.options[select.options.length] = new Option(text, value);
}

function removeAllOptions(){
    let select = document.getElementById("category");
    select.options.length = 1;
}

function getCategories() {
    const query = "all";
    getDataFromApi(query, addResults);
}

function getDataFromApi(aquery, callback) {
    const query = {
        category: aquery,
    };

    $.getJSON(LOCALHOST_API, query, callback);
}

function addResults(categories){
    categories.forEach((ctg) => {
        addOption(ctg['category'], ctg['category']);
    });
}

$(()=>{
    removeAllOptions();
    getCategories();
});


