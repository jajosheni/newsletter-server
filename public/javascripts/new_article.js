const LOCALHOST = '../../categories';

function newCategory(obj){
    event.preventDefault();
    let iframe = document.createElement('iframe');
    iframe.setAttribute('src', `${LOCALHOST}?category=addnewcategory`);
    $('body').append(iframe);
}

function closeIFrame(){
    $('iframe').remove();
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
    getData(query, addResults);
}

function getData(aquery, callback) {
    const query = {
        category: aquery,
    };

    $.getJSON(LOCALHOST, query, callback);
}

function addResults(categories){
    categories.forEach((ctg) => {
        addOption(ctg['category'], ctg['category']);
    });
}

$(()=>{
    removeAllOptions();
    document.querySelector("#publishing").valueAsDate = new Date();
    getCategories();
});


