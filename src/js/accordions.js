class Accordion {
    constructor(variantName, animationDur){
        this.variantName = variantName;
        this.animationDur = animationDur;
    }
}

const headingLinks = document.querySelectorAll("[class*=accordion_][class$=_heading] ul li");
let startingLink = 0;
let animationDuration = 0.5
headingLinks[startingLink].classList.add("active")
headingLinks.forEach(link => {
    link.addEventListener("click",  function () {
        headingLinks.forEach(lnk => lnk.classList.remove("active"))
        this.classList.add("active")
        const dataShow = this.getAttribute("data-show")

        const activeShow = document.getElementById(dataShow);
        const activeShowSiblings = Array.from(activeShow.parentElement.children)
        activeShowSiblings.forEach(element => {
            element.classList.remove("active");
            // activeShow.style.animation = "slideDonw 1 ease-in-out forwards";
            // activeShow.style.animationPlayState = "running";
        });
        activeShow.classList.add("active");
        activeShow.style.animationPlayState = "running";
        activeShow.style.animationDuration = animationDuration + "s";
    });
});



const accordionToggle = Array.from(document.getElementsByClassName("accordion_toggle_title"));



accordionToggle.forEach(elmnt => {
    elmnt.addEventListener("click", function () {
        accordionToggle.forEach(elm => elm.classList.remove("active"))
        this.classList.add("active");

    })
})


const accordion= new Accordion("default", 500);