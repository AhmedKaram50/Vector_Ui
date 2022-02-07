function $(selector) {
    if (typeof selector == "string") {
        if (selector.startsWith("#")) return new VectorElementCollection(document.getElementById(selector.substr(1)))
        else if (selector.startsWith(".")) {
            const element = Array.from(document.querySelectorAll(selector));
            if (element.length == 1) return new VectorElementCollection(element[0])
            else {
                return new VectorElementCollection(...element)
            }
        }
    } else return new VectorElementCollection(selector)
}


// This Class Is Trying to be a Jquery or maybe better
class VectorElementCollection extends Array {
    on (eventName, callBack) {
        this.forEach(el => el.addEventListener(eventName, callBack))
    }

    // Need To remove Multible classes
    removeClass (className) {
        this.forEach(el => el.classList.remove(className))
        return this
    }

    // Need To add Multible classes
    addClass(className) {
        this.forEach(el => el.classList.add(className))
        return this
    }

    toggleClass(className) {
        this.forEach(el => el.classList.toggle(className))
        return this
    }

    css (props) {
        if (typeof props == "object"){
            for (let prop in props) {
                this.forEach(el => el.style[prop] = props[prop])
            }
            return this
        } else {
            this.forEach(el => el.style[props.split(":")[0]] = props.split(":")[1])
            return this
        }
    }

    append (elementOrString, position = "append") {
        if (position == "append") {
            if (elementOrString instanceof VectorElementCollection){
                this.forEach(el => {
                    elementOrString.forEach(one => el.appendChild(one))
                })
            } else {
                this.forEach(el => {
                    el.insertAdjacentHTML('beforeend', elementOrString)
                })
            }
        } else if (position == "prepend") {
            if (elementOrString instanceof VectorElementCollection){
                this.forEach(el => {
                    elementOrString.forEach(one => el.prepend(one))
                })
            } else {
                this.forEach(el => {
                    el.insertAdjacentHTML('afterbegin', elementOrString)
                })
            }
        }
    }

    attr (attributeName, value) {
        if (arguments.length < 2) {
            if (this.length == 1) {
                return this[0].getAttribute(attributeName)
            } else {
                return this.map(el => el.getAttribute(attributeName))
            }
        } else {
            if (this.length == 1) {
                this[0].setAttribute(attributeName, value)
            } else {
                this.map(el => el.setAttribute(attributeName, value))
            }
            return this
        }
    }

    // Need To Be a dynamic property
    children () {
        const children = new VectorElementCollection()
        this.forEach(el => children.push(...el.children))
        return children
    }

    // needs Handling Id Selector as aparam
    siblings (selector) {
        const siblings = new VectorElementCollection(...this[0].parentElement.children)
        if (selector && selector.startsWith(".")) {
            const filteredS = siblings.filter(element => element.classList.contains(selector.substr(1)))
            return new VectorElementCollection(...filteredS)
        }
        if (selector && !selector.startsWith(".")) {
            const filteredS = siblings.filter(element => element.nodeName.toLowerCase() == selector)
            return new VectorElementCollection(...filteredS)
        }
        return siblings
    }

    /* Start Events */
    click(callBack) {
        this.forEach(el => el.addEventListener("click", (e) => callBack(e)))
    }

    /* Start Events */
    change(callBack) {
        this.forEach(el => el.addEventListener("change", (e) => callBack(e)))
    }

    remove() {
        this.forEach(el => el.remove())
    }

    empty () {
        const all = new VectorElementCollection()
        this.forEach(el => {
            all.push(...el.children)
        })
        all.remove()
    }

    replaceAll (selectors) {

    }
}






countriesData($("#countries"), $("#regions"))




//<script src="https://rawcdn.githack.com/AhmedKaram50/Vector_Ui/master/js/helpers.js?token=GHSAT0AAAAAABQAB6VVU23H7LWXWULIP2LUYP73L7A"></script>