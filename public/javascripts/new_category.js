const LOCALHOST = 'http://localhost:3000/categories';

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
    let categoryName = document.getElementById('category-name').value.trim();

    if(categoryName.length < 2)
        return;

    categoryName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

    let url_query =`?category=${categoryName}`;
    $.ajax({
        url: LOCALHOST + url_query,
        type: 'POST',
        success: function (data, textStatus, xhr) {
            if(data){
                parent.removeAllOptions();
                parent.getCategories();
                parent.closeIFrame();
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log('Error in Operation');
        }
    });

});
