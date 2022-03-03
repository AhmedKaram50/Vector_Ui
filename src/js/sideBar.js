
const template = document.createElement("template");

template.innerHTML = `
    <style>
        .sidebar-container{
            position: fixed;
            top: 0;
            left: 0%;
            width: 25%;
            height: 100%;
            background-color: #232323;
            padding: 35px;
        }
    </style>

    <div class="sidebar-container">
        test
    </dic>
`

class SideBar extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true)) // Copying the new Template Deep Copy and inserting it in the dom
    }
}

window.customElements.define('side-bar', SideBar) // Define A new html tag

