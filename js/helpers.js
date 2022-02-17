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

    hasClass (className) {
        return this[0].classList.contains(className)
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

    /* ==================== Start Events ==================== */
    click(callBack) {
        this.forEach(el => el.addEventListener("click", (e) => callBack(e)))
    }

    change(callBack) {
        this.forEach(el => el.addEventListener("change", (e) => callBack(e)))
    }
    /* ==================== End Events ==================== */

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

    replaceWith (selector) {
        this.empty()
        if (typeof selector == "string") {
            this.forEach(el => $(el).append(selector))
        }
        if (selector instanceof VectorElementCollection){
            this.forEach(el => selector.forEach(element => el.append(element)))
        }
         return this
    }

    popUp(time) {
        const timeInSeconds = time / 1000;
        this.css({
            "transform": "scale(0)"
        })
        setTimeout(() => {
            this.css({
                "transition": `all ${timeInSeconds}s cubic-bezier(0, 0.04, 0, 0.89)`,
                "transform": "scale(1)"
            })
        }, 0)
    }

    popOut(time) {
        const timeInSeconds = time / 1000;
        this.css({
            "transform": "scale(1)"
        })
        setTimeout(() => {
            this.css({
                "transition": `all ${timeInSeconds}s cubic-bezier(0, 0.04, 0, 0.89)`,
                "transform": "scale(0)"
            })
        }, 0)
    }

    parent(parent) {
        let prnt = $(this[0].parentElement)

        if (this.isClass(parent)) {
            while (prnt[0] != null) {
                if (prnt.hasClass(parent.substr(1))) return prnt
                else  prnt = $(prnt[0].parentElement)
            }
        }

       
        return undefined
    }

    /* ==================== Start Css Things ==================== */
    width () {
        return this[0].offsetWidth
    }

    height () {
        return this[0].offsetHeight
    }

    getCssProperty (propName) {
        return getComputedStyle(this[0])[propName]
    }
    /* ==================== End Css Things ==================== */
    /* ==================== Start IN Just That Class {Private} ==================== */
    isClass(str) {
        const arrOfElms = str.split(" ")
        return arrOfElms[arrOfElms.length - 1][0] == "."
    }

    isId(str) {
        const arrOfElms = str.split(" ")
        return arrOfElms[arrOfElms.length - 1][0] == "#"
    }

    isHTMLNodeName(str) {
        const arrOfElms = str.split(" ");
        const ask = document.createElement(arrOfElms[arrOfElms.length - 1]) instanceof HTMLUnknownElement
        return !ask
    }
   /* ==================== End IN Just That Class {Private} ==================== */

}








//<script src="https://rawcdn.githack.com/AhmedKaram50/Vector_Ui/master/js/helpers.js?token=GHSAT0AAAAAABQAB6VVU23H7LWXWULIP2LUYP73L7A"></script>
/*
    - parent() => need to put an id or element name like p or h1 as parameters
*/
