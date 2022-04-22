import "./js/helpers.js";
import {VectorMVVM} from "./js/VectorMVVM.js";

class PageName {
    constructor () {
        this.afterChange = (newData, oldData) => {}

        this.name = "ahmed"
        this.firstName = "vector"
        this.data = {
            name: "Ahmed Karam",
            firstName: "Ahmed",
        }
   
        var targetObj = this.data;
        this.proxy = new Proxy(targetObj, {
            set: function (target, key, value) {
                target[key] = value;
                const thatBinding = document.querySelectorAll(`[data-bind='${key}']`)
                thatBinding.forEach(el => {
                    el.innerHTML = value
                    el.value = value
                })
                return true;
            }
        });



    }


//    data () {
//        return {
//            name: "soso",
//            firstName: "ahmed"
//        }
//    }

    sayHi (e) {
        console.log(e)
    }

    sayHello (e) {
        console.log(e)
    }

    refreshCartInfo () {
        console.log(this.data)
        this.proxy.name = "testaaaaawi";
        console.log(this.data)
    }
}
const pageName = new PageName()
new VectorMVVM(pageName)





class MonitoredVariable {
    constructor(initialValue) {
      this._innerValue = initialValue;
      this.afterChange = (newValue, oldValue) => {};
      this.val = 55
    }
  
    set val(newValue) {
      const oldValue = this._innerValue;
      // newValue, oldValue may be the same
      if (oldValue !== newValue) {
        this._innerValue = newValue;
        this.afterChange(newValue, oldValue);
      }
    }
  
    get val() {
      return this._innerValue;
    }
}

const money = new MonitoredVariable(0);

console.log(money.val)

money.val = 2

money.afterChange = (newValue, oldValue) => {
    console.log(`Money has been changed from ${oldValue} to ${newValue}`);
};

money.val = 3;