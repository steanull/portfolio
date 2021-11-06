document.addEventListener('DOMContentLoaded', () => {

    const body = document.querySelector('body');
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorArea = document.querySelector('.cursor-area');
    const links = document.querySelectorAll('a');
    const logo = document.querySelector('.logo');
    const savoskoLink = document.querySelectorAll('.savosko__link');
    const savoskoButton = document.querySelectorAll('.savosko__button');

    let mouseX = 0;
    let mouseY = 0;
    let posX = 0;
    let posY = 0

    //Find center
    let cx = window.innerWidth / 2;
    let cy = window.innerHeight / 2;

    //Set mouse position variables
    body.addEventListener('mousemove', e => {
        let clientX = e.pageX;
        let clientY = e.pageY;

        mousePosition(e)
        cursorDot.classList.remove('cursor-dot__hidden');
        cursorArea.classList.remove('cursor-area__hidden');

    });

    function mousePosition(e) {
        mouseX = e.pageX
        mouseY = e.pageY
    }

    //Set animation and positions
    gsap.to({}, .01, {
        repeat: -1,

        onRepeat: () => {
            posX += (mouseX - posX) / 6
            posY += (mouseY - posY) / 6

            gsap.set(cursorDot, {
                css: {
                    left: mouseX,
                    top: mouseY
                }
            })

            gsap.set(cursorArea, {
                css: {
                    left: posX - 28,
                    top: posY - 28
                }
            })
        }
    })

    //Add and remove class active when mouse hovers over links
    links.forEach((item) => {

        item.addEventListener('mouseover', () => {
            cursorDot.classList.add('cursor-dot__active')
            cursorArea.classList.add('cursor-area__active')
        })

        item.addEventListener('mouseout', () => {
            cursorDot.classList.remove('cursor-dot__active')
            cursorArea.classList.remove('cursor-area__active')
        })
    })

    logo.addEventListener('mouseover', () => {
        cursorArea.classList.add('cursor-dot__active')
    })

    logo.addEventListener('mouseout', () => {
        cursorArea.classList.remove('cursor-dot__active')
    })

    savoskoLink.forEach((item) => {

        item.addEventListener('mouseover', () => {
            cursorDot.classList.add('cursor-dot__active')
            cursorArea.classList.add('cursor-area__active')
        })

        item.addEventListener('mouseout', () => {
            cursorDot.classList.remove('cursor-dot__active')
            cursorArea.classList.remove('cursor-area__active')
        })
    })

    savoskoButton.forEach((item) => {

        item.addEventListener('mouseover', () => {
            cursorDot.classList.add('cursor-dot__active')
            cursorArea.classList.add('cursor-area__active')
        })

        item.addEventListener('mouseout', () => {
            cursorDot.classList.remove('cursor-dot__active')
            cursorArea.classList.remove('cursor-area__active')
        })
    })




    //Add class hidden when mouse outside
    body.addEventListener('mouseout', () => {
        cursorDot.classList.add('cursor-dot__hidden')
        cursorArea.classList.add('cursor-area__hidden')
    })
})
;
let tabContent = document.querySelectorAll(".savosko__container");
let tabLink = document.querySelectorAll(".savosko__link");

// For each element with class 'savosko__link'
for (let i = 0; i < tabLink.length; i++) {
    // if the element was hovered\
    tabLink[i].addEventListener("mouseover", () => {
        // Clean all containers from class 'savosko__container_hidden'
        tabContent.forEach((item) => {
            item.classList.add("savosko__container_hidden");
        })
        // Clean all links from class 'savosko__link_active'
        tabLink.forEach((item) => {
            item.classList.remove("savosko__link_active");
        })
        // Make visible correct container and add class to link

        tabContent[i].classList.remove("savosko__container_hidden");
        tabLink[i].classList.add("savosko__link_active");
        gsap.to('.savosko__description', {opacity: .5, duration: 0, delay: 0});
        gsap.to('.savosko__description', {opacity: 1});
    });
};
document.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector('.page')
    const cx = window.innerWidth / 2
    const cy = window.innerHeight / 2
    let clientX;
    let clientY;
    let dx, dy, tiltx, tilty, radius, degree, request;

    body.addEventListener('mousemove', e => {
        clientX = e.pageX - 300;
        clientY = e.pageY - 300;
        request = requestAnimationFrame(parallax);
    })
    function parallax() {
        dx     = clientX - cx;
        dy     = clientY - cy;
        tiltx  = dy / cy;
        tilty  = dx / cx;
        radius = Math.sqrt(Math.pow(tiltx, 2) + Math.pow(tilty, 2));
        degree = radius * 12;
        gsap.to('.savosko', 1, { transform: `rotate3d( ${tiltx}, ${tilty}, 0, ${degree}deg )` });
    }
})
;
document.addEventListener('DOMContentLoaded', () => {
    gsap.to('.savosko__text', {opacity: 1, duration: 2});
    gsap.to('.savosko__title', {opacity: 1, duration: 3, delay: .3});
    gsap.to('.savosko__link', {opacity: .9, duration: .9});
    gsap.to('.savosko__button', {opacity: 1, duration: 1.5, delay: 1.2});
    gsap.to('.savosko__description', {opacity: 1, duration: .8, delay: .7});
});;