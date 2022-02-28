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
            }

            .accordion-list ul li{
                cursor: pointer;
                margin-bottom: 10px;
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

            .accordion-list ul li:not(.active){
                // display: none
            }

            @keyframes slideUp {
                0% {max-height: 0;}
                100% { max-height: 300px;}
            }

            @keyframes slideDown {
                0% {max-height: 300px;}
                100% { max-height: 0;}
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

class AccordionList extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: 'open'})
        this.shadowRoot.appendChild(accordionListTemplate.content.cloneNode(true))
        this.shadowRoot.querySelector(".accordion-list .heading").addEventListener("click", () => {
            $(this.shadowRoot.querySelector(".accordion-list ul")).slideToggle(300)
        })
    }
}

window.customElements.define('accordion-list', AccordionList)