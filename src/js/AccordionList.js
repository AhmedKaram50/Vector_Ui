const accordionListTemplate = document.createElement("template");
accordionListTemplate.innerHTML = `
    <style>
        .accordion-list{
            text-align: left;
        }
        
        .accordion-list .heading{
            border: 2px solid #393939;
            padding: 12px;
            border-radius: 4px;
            color: #fff;
            cursor: pointer;
        }

        .accordion-list ul{
            list-style: none;
            padding: 0;
            padding-left: 12px;
            max-height: 0;
            overflow: hidden;
            margin-top: 20px
        }

        
    </style>

    

    <div class="accordion-list">
        <div class="heading">Menu</div>
        <ul>
            <slot></slot>
        </ul>
    </div>

`

const stylesheet = new CSSStyleSheet();

class AccordionList extends HTMLElement {
    constructor () {
    super();
    this.attachShadow({mode: 'open'})
    this.shadowRoot.appendChild(accordionListTemplate.content.cloneNode(true))
    stylesheet.replaceSync(`
        @keyframes slideUp {
            0% {max-height: 0;}
            100% {max-height: ${this.shadowRoot.querySelector("ul").scrollHeight}px;}
        }
        
        @keyframes slideDown {
            0% {max-height: ${this.shadowRoot.querySelector("ul").scrollHeight}px;}
            100% {max-height: 0;}
        }
    `)
    this.shadowRoot.adoptedStyleSheets = [stylesheet]
    this.shadowRoot.querySelector(".accordion-list .heading").addEventListener("click", () => {
        $(this.shadowRoot.querySelector(".accordion-list ul")).slideToggle(400)
    })

    this.shadowRoot.querySelector(".heading").innerHTML = $(this).attr("default-value")
    const obj = $(this).attr("css")
    $(this.shadowRoot.querySelector(".heading")).css(JSON.parse(obj))
}
}

window.customElements.define('accordion-list', AccordionList)