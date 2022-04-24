import { Subject } from "rxjs";

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
        const data = this.pageNameObject.data
        
        // const bindingsSelectors = document.querySelectorAll(`[${bindingDataAttribute}]`);
        
        for (let key in data) {
            const subject = new Subject()
            this.observeValue(key, subject)

            // * Initial Value For Every Elements has data-bind
            subject.next(data[key])

        }
    }

    observeValue (dataKey, subj) {
        const bindingDataAttribute = "data-bind";
        const subject$ = subj.asObservable()
        const bindSelectorForProp = document.querySelectorAll(`[${bindingDataAttribute}=${dataKey}]`);

        /*
            * That Will Execute On Changes
            * this action 1 execute when the observable is changed 
            * you can make multiple actions Asyncronously 
        */
        const action1 = subject$.subscribe(value => {
            // * Check If there Is an elements that have prop bind
            if (bindSelectorForProp.length) { 
                bindSelectorForProp.forEach((el) => {
                    this.isEnableValueElement(el) ? el.value = value : el.innerHTML = value
                });
            }
        })

        // * handle if the bind element is input & add Event For it to change every input change
        bindSelectorForProp.forEach(el => {
            if (el instanceof HTMLInputElement) {
                el.addEventListener("keyup", (e) => {
                    subj.next(e.target.value)
                    // this.changeObserverValue(subj, e.target.value)
                })
            }
        })
    }

    changeObserverValue (subject, newValue) {
        subject.next(newValue)
    }

    isEnableValueElement (element) { // * Check if the element can access value prop or not
        const arrOfHTMLElements = [HTMLInputElement, HTMLSelectElement, HTMLOptionElement]
        let answer = false
        arrOfHTMLElements.forEach(el => {
            if (element instanceof el) answer = true
        })
        return answer
    }
}

