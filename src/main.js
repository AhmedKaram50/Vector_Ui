import "./js/helpers.js";
import "./js/rx.js";
import { VectorMVVM } from "./js/VectorMVVM.js";
import { Subject } from "rxjs";

class PageName {
  constructor() {
    this.data = {
      name: "Ahmed Karam Ahmned",
      firstName: "Ahmed",
      lastName: "Not Found",
      dd: "Not Found333",
    };

  }


  sayHi(e) {
    console.log(e);
  }

  sayHello(e) {
    console.log(e);
  }

  refreshCartInfo() {
      console.log(this.data.firstName)
    this.data.firstName = "koko";
    console.log(this.data.firstName)
  }

  hideH1 (e) {
    e.target.remove()
    setTimeout(() => {
      document.querySelector(".test-component").insertAdjacentHTML("afterbegin", '<button data-event="click: hideH1">Hide Second Button</button>')
    }, 1000)
  }

  print () {
    console.log("print is here")
  }

}
const pageName = new PageName();
new VectorMVVM(pageName);

// setTimeout(() => {
//     pageName.stringVar.next("Value From Set Time Out");
// }, 5000)


