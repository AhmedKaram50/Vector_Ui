var BetterListModel = function () {
    this.itemToAdd = ko.observable("");
    this.allItems = ko.observableArray(["Fries", "Eggs Benedict", "Ham", "Cheese"]); // Initial items
    this.selectedItems = ko.observableArray(["Ham"]);                                // Initial selection

    this.test = ko.observable(document.getElementById("hat"))

    this.forVar = ko.observable(document.getElementById("1"))
 
    this.addItem = function () {
        if ((this.itemToAdd() != "") && (this.allItems.indexOf(this.itemToAdd()) < 0)) // Prevent blanks and duplicates
            this.allItems.push(this.itemToAdd());
        this.itemToAdd(""); // Clear the text box
    };
 
    this.removeSelected = function () {
        this.allItems.removeAll(this.selectedItems());
        this.selectedItems([]); // Clear selection
    };
 
    this.sortItems = function(e, s) {
        console.log(e)
        console.log(s)
        this.allItems.sort();
    };

    this.forFun = function (e, s) {
        console.log(e)
        console.log(s.target)
    }

};
 
ko.applyBindings(new BetterListModel());