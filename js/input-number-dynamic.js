class DynamicInputNumber {
    constructor (inputSelector, incSelector, decSelector, min, max) {
        this.inputSelector = document.querySelector(inputSelector);
        this.incSelector = document.querySelector(incSelector);
        this.decSelector = document.querySelector(decSelector);
        this.min = min
        this.max = max;

        this.increase()
        this.decrease()
    }

    increase() {
        this.incSelector.addEventListener("click", () => this.inputSelector.value = parseInt(this.inputSelector.value) + 1)
    }

    decrease() {
        this.decSelector.addEventListener("click", () => this.inputSelector.value = parseInt(this.inputSelector.value) - 1)
    }
    reset () {
        this.inputSelector.value = 0
    }
    getValue () {
        return parseInt(this.inputSelector.value)
    }
    
}

const inputNumber = new DynamicInputNumber("#v-inputNumber", "#increase", "#decrease", 10, 100);

console.log(inputNumber.getValue())
