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
}