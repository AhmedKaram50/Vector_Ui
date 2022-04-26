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


class BST {
  constructor (arr) {
    this.arr = arr
    this.start = 0
    this.end = arr.length - 1
    this.mid = Math.floor(arr.length / 2) // * Pointer That Indicates The Middle of array
  }

  getMidRight () { // * Getting The Middle Of the half Right part of The array
    return Math.ceil((this.mid + this.end) / 2) 
  }

  getMidLeft () { // * Getting The Middle Of the half Left part of The array
    return Math.floor((this.mid + this.start) / 2) 
  }

  isContinue () { // * Stops The Recursion When The mid is reached the start or end of array
    return this.mid > this.start && this.mid < this.end
  }

  indexOf(num) {
    if (num == this.arr[0]) return 0  // * if The number is the first or last value in the array then we dont need to make the Recursion 
    else if (num == this.arr.at(-1)) return this.arr.length - 1

    if (this.isContinue()) {
      
      if (num > this.arr[this.mid]) {
        this.start = this.mid
        this.mid = this.getMidRight()
        this.indexOf(num) // ! Dangerous Recursion :)
      } else if (num < this.arr[this.mid]) {
        this.end = this.mid
        this.mid = this.getMidLeft() 
        this.indexOf(num) // ! Dangerous Recursion :)
      } else {
        console.log("found", this.mid)
        return 999
      }
    } else {
      console.log("yes")
      return -1 // * Not Found
    }
  }
  
}

const arr = new BST([-5, 1, 10, 50, 55, 100, 900])
console.log(arr.indexOf(100)) // 5

/*
  -5, 1, 10, 50, 55, 100, 900
   0  1   2  3   4    5    6
*/

