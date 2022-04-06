// class Accordion {
//     constructor(variantName, animationDur){
//         this.variantName = variantName;
//         this.animationDur = animationDur;
//     }
// }

// const headingLinks = document.querySelectorAll("[class*=accordion_][class$=_heading] ul li");
// let startingLink = 0;
// let animationDuration = 0.5
// headingLinks[startingLink].classList.add("active")
// headingLinks.forEach(link => {
//     link.addEventListener("click",  function () {
//         headingLinks.forEach(lnk => lnk.classList.remove("active"))
//         this.classList.add("active")
//         const dataShow = this.getAttribute("data-show")

//         const activeShow = document.getElementById(dataShow);
//         const activeShowSiblings = Array.from(activeShow.parentElement.children)
//         activeShowSiblings.forEach(element => {
//             element.classList.remove("active");
//             // activeShow.style.animation = "slideDonw 1 ease-in-out forwards";
//             // activeShow.style.animationPlayState = "running";
//         });
//         activeShow.classList.add("active");
//         activeShow.style.animationPlayState = "running";
//         activeShow.style.animationDuration = animationDuration + "s";
//     });
// });

// const accordionToggle = Array.from(document.getElementsByClassName("accordion_toggle_title"));

// accordionToggle.forEach(elmnt => {
//     elmnt.addEventListener("click", function () {
//         accordionToggle.forEach(elm => elm.classList.remove("active"))
//         this.classList.add("active");

//     })
// })

// const accordion= new Accordion("default", 500);

const template = document.createElement("template");

template.innerHTML = `
    <style>
        .accordion-toggle-holder{

        }
    
        .accordion-toggle-holder .accordion-heading{
            display: flex;
            gap: 20px;
        }

        .accordion-toggle-holder .accordion-heading .head-item{
            cursor: pointer;
        }

        .accordion-toggle-holder .accordion-heading .head-item.active{
            color: aqua
        }

        .accordion-body .body-item{
            overflow: hidden
        }

        ::slotted(.heading) {
            gap: 20px;
            display: flex
        }


        :host-context(div){
            
        }


    </style>

    <div class="accordion-toggle-holder">
        <div class="accordion-heading">
            <slot name="heading"><slot>
        </div>
        <div class="accordion-body">
            <slot name="body"></slot>
        </div>
    </div>
`;

const styleSheet = new CSSStyleSheet();

class AccordionToggle extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));


    const slottedHeadingItems = this.shadowRoot.querySelector("slot[name='heading']").assignedElements()[0]
    const slottedBodyItems = this.shadowRoot.querySelector("slot[name='body']").assignedElements()[0]

    const headingItems = slottedHeadingItems.querySelectorAll(".head-item");
    
    const bodyItems = slottedBodyItems.querySelectorAll(".body-item");

    styleSheet.replaceSync(
      `
          
      `
    );

    this.shadowRoot.adoptedStyleSheets = [styleSheet];

    
    bodyItems.forEach((el) => {
      $(el).slideDown(0);
    });
    
    headingItems.forEach((el) => {
      if ($(el).hasClass("active")) {
        $(slottedBodyItems.querySelector('#'+$(el).attr("data-for"))).slideUp(500)
      }
      $(el).click((e) => {
          const thisElement = e.target.parentElement;
          $(thisElement).siblings(".head-item").removeClass("active");
          $(thisElement).addClass("active");
          
          const clickFor = $(thisElement).attr("data-for")
          
        $(slottedBodyItems.querySelector("#"+clickFor))
          .siblings(".body-item")
          .slideDown(500, () => {
            $(slottedBodyItems.querySelector("#"+clickFor)).slideUp(500);
          });
      });
    });
  }
}

window.customElements.define("accordion-toggle", AccordionToggle);
