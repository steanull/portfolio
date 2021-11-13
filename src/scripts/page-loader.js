window.onload = function () {
    document.body.classList.add('load_hidden');
    window.setTimeout(function () {
        document.body.classList.add('load');
        document.body.classList.remove('load_hidden');
    }, 700);
}