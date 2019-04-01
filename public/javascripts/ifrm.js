document.querySelector('header').addEventListener('click', function(evt){
    event.stopPropagation();
});

document.querySelector('.container').addEventListener('click', function (evt) {
    event.stopPropagation();
});

document.querySelector('html, body').addEventListener('click', function(evt){
    parent.closeIFrame();
}, false);

document.querySelector('#newcategory-form').addEventListener('submit', function (evt) {
    event.preventDefault();
});

document.querySelector('#newcategory').addEventListener('click', function (evt) {
    let categoryName = document.getElementById('category-name').value;
    if(categoryName.length < 2)
        return;

    let xmlhttp;
    xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            console.log(xmlhttp.responseText);
            parent.addOption(categoryName, categoryName);
            parent.closeIFrame();
        }
    };

    let serverURL = 'http://localhost:3000/iframe';

    xmlhttp.open("POST", serverURL, true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send("new-category=" + categoryName);
});
