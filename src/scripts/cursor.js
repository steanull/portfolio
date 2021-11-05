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
