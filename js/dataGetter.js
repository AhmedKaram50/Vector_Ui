class DataGetters {
    constructor (url, method, callBack) {
        this.url = url;
        this.method = method || "GET";
        this.data = null
        this.callBack = callBack;
    }


    // Get Elements From Dom
    async getElementsFromResult(selector, ...args) {
        const res = await fetch(this.url);
        const data = await res.text();
        const parser = new DOMParser();
        const xmlDom = parser.parseFromString(data, "text/html")
        const arr = []

        for (let i = 0; i < arguments.length; i++)
            Array.from(xmlDom.querySelectorAll(arguments[i])).forEach(el => arr.push(el))

        return arr.length ? arr : console.log(Error("Error From Me: The Elements you want to get are not exist"));
    }

    // Put Elements In Some Where
    putElementsInElement (elements, where, remove) {
        const whereElement = document.querySelector(where)
        if (!remove){
            elements.forEach(ele => whereElement.appendChild(ele))
        } else {
            whereElement.innerHTML = ""
        }
    }
}

const placeholder = new DataGetters("http://127.0.0.1:5500/index.html", "GET", function () {
    console.log("Ahmed is here")
})

placeholder.getElementsFromResult("h3").then(elmnts => {
    placeholder.putElementsInElement(elmnts, "#putin")
})