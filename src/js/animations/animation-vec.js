
// This File is Useless Until Now

import { VectorElementCollection, $ } from "../helpers.js";

export class VECAnimation extends VectorElementCollection {
    constructor () {
        super()
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

    slideUp(options) {
        const realHeight = this[0].scrollHeight
        const animationBody = `
            @keyframes slideUp {
                0% {max-height: 0;}
                100% { max-height: ${realHeight}px}
            }
        `
        this.slideHelper().sheet.insertRule(animationBody)

        if (!isNaN(options)){
            this.forEach(el => el.style.animation = `slideUp ${options/1000}s forwards ease-in-out`)
        } else {
            this.forEach(el => el.style.animation = `slideUp ${options}`)
        }
    }

    slideDown(options) {
        const realHeight = this[0].scrollHeight
        const animationBody = `
            @keyframes slideDown {
                0% {max-height: ${realHeight}px;}
                100% { max-height: 0;}
            }
        `
        this.slideHelper().sheet.insertRule(animationBody)
        if (!isNaN(options)){
            this.forEach(el => el.style.animation = `slideDown ${options/1000}s ease-in-out`)
        } else {
            this.forEach(el => el.style.animation = `slideDown ${options}`)
        }
    }

    static isSlideUp = true;

    slideToggle(options) {
        const realHeight = this[0].scrollHeight
        const animationBody = `
            @keyframes slideUp {
                0% {max-height: 0;}
                100% { max-height: ${realHeight}px;}
            }
        `
        const animationBody2 = `
            @keyframes slideDown {
                0% {max-height: ${realHeight}px;}
                100% { max-height: 0;}
            }
        `

        this.slideHelper().sheet.insertRule(animationBody)
        this.slideHelper().sheet.insertRule(animationBody2)

        
        if (VectorElementCollection.isSlideUp) {
            if (!isNaN(options)){
                this.forEach(el => el.style.animation = `slideUp ${options/1000}s ease-in-out forwards`)
            } else {
                this.forEach(el => el.style.animation = `slideUp ${options}`)
            }
        } else {
            if (!isNaN(options)){
                this.forEach(el => el.style.animation = `slideDown ${options/1000}s ease-in-out forwards`)
            } else {
                this.forEach(el => el.style.animation = `slideDown ${options}`)
            }
        }
        VectorElementCollection.isSlideUp = !VectorElementCollection.isSlideUp
       
    }
}