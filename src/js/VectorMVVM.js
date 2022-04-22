export class VectorMVVM {
    constructor(pageNameObject) {
        this.pageNameObject = pageNameObject

        const eventDataAttribute = "data-event";
        const jsEventsName = ["click", "change", "mouseover", "input"];
        const allElementsWeWant = [];
        
        const eventsSelectors = document.querySelectorAll(`[${eventDataAttribute}]`);
        
        eventsSelectors.forEach((el) => {
            const regex = /:*\w+/g
            const eventMethodNames = el.dataset.event.match(regex)
        
            for (let i = 0; i < eventMethodNames.length; i = i + 2) {
                const currentEventName = eventMethodNames[i]
                const currentActionName = eventMethodNames[i + 1]
                el.addEventListener(currentEventName, (e) => {
                    this.pageNameObject[currentActionName](e)
                });
            }
        
        });

        this.handleBindings()
    }

    handleBindings () {
        const bindingDataAttribute = "data-bind";
        const bindingsSelectors = document.querySelectorAll(`[${bindingDataAttribute}]`);
        // const options = {
        //     attributes: true,
        //     childList: true, 
        //     subtree: true
        // }

        // const callBack = (mut, obs) => {
        //     console.log(mut)
        // }
        
        // const observer = new MutationObserver(callBack)

        
        console.log(this.pageNameObject.data)

        
        console.log(this.pageNameObject)

        
        bindingsSelectors.forEach((el) => {
            // observer.observe(el, options)
            const bindingMethodNames = el.dataset.bind
            const value = this.pageNameObject[bindingMethodNames]
            this.isEnableValueElement(el) ? el.value = value : el.innerHTML = value
        
        });
    }

    // handleBindings () { // ! This is binding by data function 
    //     const bindingDataAttribute = "data-bind";
    //     const observerFunctionName = "data";
    //     const bindingsSelectors = document.querySelectorAll(`[${bindingDataAttribute}]`);
    //     const options = {
    //         attributes: true,
    //         childList: true, 
    //         subtree: true
    //     }

    //     const callBack = (mut, obs) => {
    //         console.log(mut)
    //     }
        
    //     const observer = new MutationObserver(callBack)
        
    //     const values = this.pageNameObject[observerFunctionName]()
        
    //     bindingsSelectors.forEach((el) => {
    //         observer.observe(el, options)
    //         const bindingMethodNames = el.dataset.bind
    //         const value = values[bindingMethodNames]
    //         this.isEnableValueElement(el) ? el.value = value : el.innerHTML = value
    //     });
    // }

    isEnableValueElement (element) { // * Check if the element can access value prop or not
        const arrOfHTMLElements = [HTMLInputElement, HTMLSelectElement, HTMLOptionElement]
        let answer = false
        arrOfHTMLElements.forEach(el => {
            if (element instanceof el) answer = true
        })
        return answer
    }
}

