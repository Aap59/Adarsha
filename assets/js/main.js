FileValidation = (event) => {
  var image = document.getElementById("output");
  image.src = URL.createObjectURL(event.target.files[0]);
  // const fi = document.getElementById("file");
  // if (fi.files.length > 0) {
  //     // for (const i = 0; i <= fi.files.length - 1; i++) {
  //     //     const fsize = fi.files.item(i).size;
  //     //     const file = Math.round((fsize / 1024));
  //     // }
  // }
};

var tag = document.createElement("p");
var text = document.getElementById("output");
tag.appendChild(text);
var element = document.getElementById("new");
element.appendChild(tag);

//ihofoizesture

const countEl = document.getElementById("count");
countvisits();

function countvisits() {
  fetch("https://api.countapi.xyz/update/asdf/ghjk/?amount=1")
    .then((res) => res.json())
    .then((res) => {
      countEl.innerHTML = res.value + 1;
    });
}

/*===== MENU SHOW =====*/

const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }
};
showMenu("nav-toggle", "nav-menu");

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2000,
  delay: 200,
  //     reset: true
});

sr.reveal(".home__data, .about__img, .skills__subtitle, .skills__text", {});
sr.reveal(".home__img, .about__subtitle, .about__text, .skills__img", {
  delay: 400,
});
sr.reveal(".home__social-icon", { interval: 200 });
sr.reveal(".skills__data, .work__img, .contact__input", { interval: 200 });
