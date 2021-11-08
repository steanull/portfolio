document.addEventListener('DOMContentLoaded', () => {
    gsap.to('.savosko__text', {opacity: 1, duration: 2});
    gsap.to('.savosko__title', {opacity: 1, duration: 3, delay: .3});
    gsap.to('.savosko__link', {opacity: .9, duration: .9});
    gsap.to('.savosko__button', {opacity: 1, duration: 1.5, delay: 0.8});
    gsap.to('.savosko__description', {opacity: 1, duration: .8, delay: .7});
    gsap.to('.social-links__item', {opacity: 1, duration: 2, delay: 1.5});
});