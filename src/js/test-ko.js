console.log(ko)


class ClickCounterViewModel {
    constructor () {
        this.numberOfClicks = ko.observable(0);
 
        this.resetClicks = function() {
            this.numberOfClicks(0);
        };
    
        this.hasClickedTooManyTimes = ko.pureComputed(function() {
            return this.numberOfClicks() >= 3;
        }, this);

    }

    registerClick () { // ! This is me
        this.numberOfClicks(this.numberOfClicks() + 1);
    }

    sayHi() {
        console.log("ahmed")
    }
};
 
ko.applyBindings(new ClickCounterViewModel());