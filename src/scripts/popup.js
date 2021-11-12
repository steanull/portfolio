let popup = document.querySelectorAll('.popup');
let popupCloseBtn = document.querySelectorAll('.popup__button');
let popupBtn = document.querySelectorAll('.savosko__item');


function togglePopup(){
    let index = Array.from(popupBtn).indexOf(this);
    popup[index].classList.add("popup_opened");
    popupCloseBtn.forEach(item => {
        item.addEventListener('click', function () {
            popup[index].classList.remove('popup_opened');
        });
    });
}

popupBtn.forEach( btn => btn.addEventListener( 'click', togglePopup ) );

