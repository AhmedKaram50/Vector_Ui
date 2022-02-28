const accordionListTemplate = document.createElement("template");
accordionListTemplate.innerHTML = `
        <style>

            .accordion-list .heading{
                width: 300px;
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

            .accordion-list ul li{
                cursor: pointer;
                margin-bottom: 20px;
            }

            .accordion-list ul li:last-child {
                margin-bottom: 0;
            }

            .accordion-list ul li.active{
             
            }

            .accordion-list ul li:hover a {
                color: #F33900
            }

            .accordion-list ul li.active a {
                color: #F33900
            }

            .accordion-list ul a{
                text-decoration: none;
                transition: all 0.2s ease-in-out;
                color: #fff
            }
        </style>

        

        <div class="accordion-list">
            <div class="heading">Menu</div>
            <ul>
                <li class="active"><a href="#">Welcome</a></li>
                <li><a href="#">Pre-Orders</a></li>
                <li><a href="#">Gift Cards</a></li>
                <li><a href="#">Orders</a></li>
                <li><a href="#">Account Details</a></li>
                <li><a href="#">Wishlist</a></li>
                <li><a href="#">Waitlists</a></li>
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
    }
}

window.customElements.define('accordion-list', AccordionList)