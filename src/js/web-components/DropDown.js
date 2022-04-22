const dropDownTemplate = document.createElement("template");

dropDownTemplate.innerHTML = `
    <style>
    .newselectbox {
        position: relative;
        border: 2px solid #393939;
        font-family: sans-serif;
        width: 300px;
        margin: 0 auto;
        border-radius: 4px;
      }
      
      .newselectbox select {
        display: none; /*hide original SELECT:*/
      }
      
      .select-selected {
        background-color: none;
        color: #3c4d62;
      }
      
      /*style the arrow:*/
      .select-selected:after {
        position: absolute;
        content: "";
        top: 20px;
        right: 15px;
        width: 0;
        height: 0;
        border: 6px solid transparent;
        border-color: #fff transparent transparent transparent;
      }
      
      /*point the arrow upwards (active):*/
      .select-selected.select-arrow-active:after {
        border-color: transparent transparent #fff transparent;
        top: 12px;
      }
      
      /*style the items (options):*/
      .select-items div,
      .select-selected {
        color: #fff;
        padding: 13px;
        cursor: pointer;
        user-select: none;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-content: center;
      }
      
      /*style items (options):*/
      .select-items {
        position: absolute;
        background-color: none;
        color: #3c4d62;
        top: 55px;
        left: 0;
        right: 0;
        z-index: 99;
      }
      
      /*hide the items when the select box is closed:*/
      .select-hide {
        display: none;
      }
      
      .select-items div:hover,
      .same-as-selected {
        background-color: rgba(0, 0, 0, 0.1);
      }

    </style>
    
    <div class="drop-down-list">
        <div class="newselectbox">
            <select class="form-control" style="width:100%;">
                <option value="default_option">Default Option</option>
                <option value="option_select_name">Option select name</option>
                <option value="option_select_name">Option 2</option>
                <option value="option_select_name">Option 3</option>
                <option value="option_select_name">Option 4</option>
                <option value="option_select_name">Option 5</option>
            </select>
            </div>
        </div>
    </div>
`

class DropDownList extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(dropDownTemplate.content.cloneNode(true))
    }
}

window.customElements.define('drop-down-list', DropDownList)