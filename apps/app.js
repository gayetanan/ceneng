const burger = document.querySelector("#trigger");
const topnav = document.querySelector("#topnav");
const header = document.querySelector("#header");
const contactWrapper = document.querySelector("#contact");
const socialMediaWrapper = document.querySelector("#social-media");
const links = document.querySelectorAll(".navlink");
const linkAnchor = document.querySelectorAll(".navlink a");
const filterbuttons = document.querySelectorAll("#filter-btns button");
const flItems = document.querySelectorAll(".porfolio-article");
const form = document.querySelector("#form");
const button = document.querySelector("#submit")
let showBoxFlag = false;



const submitionValidation = (() => {
    let validName = false;
    let validMessage = false;
    let validEmail = false
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    function toggler() {
        if (validName && validMessage && validEmail) {
            button.removeAttribute("disabled")
        } else {
            button.setAttribute("disabled", true)
        }
    }
    function vN() {
        if (this.value.trim() !== "") {
            validName = true
        } else {
            validName = false
        }
        toggler()
    }
    function vM() {
        if (this.value.trim().length > 0) {
            validMessage = true;
        } else {
            validMessage = false;
        }
        toggler()
    }
    function vE() {
        if (emailRegex.test(this.value)) {
            validEmail = true;
        } else {
            validEmail = false;
        }
        toggler()
    }
    return { vN, vM, vE }
})()

document.querySelector("#name").addEventListener("input", submitionValidation.vN);
document.querySelector("#email").addEventListener("input", submitionValidation.vE);
document.querySelector("#message").addEventListener("input", submitionValidation.vM)

// Collapse the navigation bar
function collapsingNav() {
    // add open-nav class to the header
    header.classList.toggle("open-nav");
    slideAnimation(contactWrapper, "contactAnim")
    slideAnimation(socialMediaWrapper, "socialtAnim")
}

// handle sliding animation for infos
function slideAnimation(item, animName) {
    if (item.style.animation) {
        item.style.animation = ``;
    } else {
        item.style.animation = `${animName} 1s ease forwards 1s`;
    }
}
// add sticky class to the navbar at giving position
function stickyNav(item, classElement, position) {
    const currentWindowPostion = window.pageYOffset;
    // closing nav menu when scrolling
    header.classList.remove("open-nav");
    // reset animation
    contactWrapper.style.animation = "";
    socialMediaWrapper.style.animation = "";

    if (currentWindowPostion > position) {
        item.classList.add(classElement);
    } else {
        item.classList.remove(classElement);
    }
}
window.addEventListener('scroll', () => stickyNav(header, "sticky", 150));

// handle scolling effect Accordingly
function scrollToSectionAccordingly(linkList) {
    linkList.forEach((link) => {
        link.addEventListener("click", (e) => {
            // prevent default scroll behavior
            e.preventDefault();
            // remove animation to nav content
            contactWrapper.style.animation = "";
            socialMediaWrapper.style.animation = "";
            // get attibute of navigation links
            let getAttr = e.target.getAttribute("href").slice(1);
            //select each section according on attibute of my links
            let section = document.querySelector(`#${getAttr}`);
            // hearder height
            let headerHeight = header.getBoundingClientRect().height;
            //get position of each section
            let sectionPosition = section.offsetTop;
            if (header.classList.contains("sticky")) {
                sectionPosition = sectionPosition + headerHeight;
            }
            window.scrollTo({
                left: 0, top: sectionPosition - (headerHeight * 2)
            })
        })
    })
}
// Navigation links
scrollToSectionAccordingly(links);
// Call To Action Links
scrollToSectionAccordingly(document.querySelectorAll(".ctn-btn"));

function showBox() {
    document.getElementById("box").setAttribute("aria-hidden", false)
    document.body.style.overflow = "hidden"
}
function hiddenBox() {
    document.getElementById("box").setAttribute("aria-hidden", true)
    document.body.style.overflow = "scroll"
}
document.querySelector("#box button").addEventListener("click", hiddenBox)
// remove class to a certian element
function removeActiveLink(link, className) {
    link.classList.remove(`${className}`)
}
// get current section when scrolling, and add active class to nav link
function currentActiveSection() {
    trick('.swiper')
    const sections = document.querySelectorAll("section");
    sections.forEach(section => {
        const scrollY = window.pageYOffset;
        // Get section id
        const sectionId = section.getAttribute("id");
        const sectionHeight = section.offsetHeight;
        let headerHeight = header.getBoundingClientRect().height;
        const sectionTop = section.offsetTop - headerHeight - 2;
        // Get element according to section current section id
        let navLinkOfTheCurrentSection = document.querySelector(".navlink a[href*=" + sectionId + "]");
        if (scrollY > sectionTop && scrollY < sectionTop + sectionHeight && navLinkOfTheCurrentSection !== null) {
            // get the current active link
            const currentActiveLink = document.querySelector(".active-link");
            // unactive the current section;
            removeActiveLink(currentActiveLink, "active-link");

            navLinkOfTheCurrentSection.classList.add("active-link");

            if (navLinkOfTheCurrentSection.getAttribute("href").slice(1) === 'getintouch' && !showBoxFlag) {
                setTimeout(() => {
                    showBox();
                    showBoxFlag = true
                }, 2000)

            }


        }

    })
};
window.addEventListener('scroll', currentActiveSection);

// add current active filter button 
filterbuttons.forEach(btn => {
    btn.addEventListener('click', function () {
        // get the current active button
        const currentButton = document.querySelector(".fl-active");
        // remove fl-active to it.
        removeActiveLink(currentButton, "fl-active");
        // add active class the active class to clicked button
        this.classList.add("fl-active");
    })
})


// Handle FILERT animattion with mixItUp
const porfolioItems = document.querySelector('.porfolio-bd');
const mixer = mixitup(porfolioItems,
    {
        "animation": {
            "duration": 550,
            "nudge": true,
            "reverseOut": false,
            "effects": "fade translateZ(-100px)"
        }
    });

// swiper js
let swiperObj = {
    // Optional parameters
    direction: 'horizontal',
    spaceBetween: 20,
    slidesPerView: 'auto',
    centeredSlides: true,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        "768": { spaceBetween: 50 },
    },
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    //If we need pagination
}
const swiper = new Swiper('.swiper', swiperObj);

swiper.disable();

function trick(element) {
    // disable swiper when element is hidden by scrollReveal
    if (document.querySelector(element).style.opacity == 0) {
        swiper.disable()
    } else {
        swiper.enable()
        // swiper.attachEvents()
    }
}
function countjs(items, speed) {
    const counters = document.querySelectorAll(items);

    counters.forEach(counter => {
        counter.innerText = 0;
        const updateCount = () => {
            const target = +counter.getAttribute("data-count");
            const count = +counter.innerText;
            const increment = Math.ceil(target / speed);


            if (count < target) {
                counter.innerText = count + increment
                setTimeout(updateCount, 1)
            } else {
                counter.innerText = target;
            }
        }

        updateCount()
    })

}
// scrollreveal
const sr = ScrollReveal({
    origin: "bottom",
    distance: "40px",
    duration: 2500,
    delay: 400,
    reset: true,
})

sr.reveal(".swiper", {
    distance: "50px", beforeReveal: () => {
        trick('.swiper')
    }
})
// left
sr.reveal(document.querySelectorAll(".sub-title-1"), {
    origin: "left"
})
sr.reveal(".about-infos p, .about-content .btn-primary, .contact-infos p, .infos", {
    origin: "left",
    distance: "55px"
})
// right
sr.reveal(".about-content .about-img", {
    origin: "right",
    distance: "50px"
})
// top
sr.reveal(".showcase-infos", { origin: "top", })
sr.reveal(".showcase-img ", { distance: "50px", origin: "top", })
// bottom
sr.reveal(".porfolio-bd", { distance: "50px" })
sr.reveal(".title-2");
sr.reveal(".small-card", {
    beforeReveal: () => {
        countjs(".count", 500)
    }
});
sr.reveal(".form-ctn", { delay: 450, distance: "70px" });
sr.reveal(".services-card-content", { distance: '70px', delay: 600 })
// interval
sr.reveal(document.querySelectorAll(".trust-section span, .filter-btns button"), { scale: 0.5, interval: 100, duration: 2000 })

const node = [document.querySelector(".company-desc"),
document.querySelector(".company-links"),
document.querySelector(".blog")];
sr.reveal(node, { interval: 100 });

// scroll up
document.querySelector("#scroll-up").addEventListener("click", () => {
    window.scrollTo({ left: 0, top: 0 })
});





window.addEventListener('scroll', () => stickyNav(document.querySelector("#scroll-up"), "scroll-true", 400));
window.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#copyright-date").innerHTML = new Date().getFullYear()
})
burger.addEventListener("click", collapsingNav);