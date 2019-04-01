function newCategory(obj){
    event.preventDefault();
    let iframe = document.createElement('iframe');
    iframe.setAttribute('src', '/iframe');
    document.body.appendChild(iframe);
}

function closeIFrame(obj){
    console.log(obj);
    document.querySelector('iframe').remove();
}

function addOption(text, value){
    let select = document.getElementById("category");
    select.options[select.options.length] = new Option(text, value);
}

function removeAllOptions(){
    let select = document.getElementById("category");
    select.options.length = 1;
}

function getCategories(){
    let categories = null;
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            categories = JSON.parse(xmlhttp.responseText);

            categories.forEach((ctg) => {
                addOption(ctg['category'], ctg['category']);
            });
        }
    };
    const url="http://localhost:3000/new/category";
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

document.querySelector("#publishing").valueAsDate = new Date();

removeAllOptions();
getCategories();


