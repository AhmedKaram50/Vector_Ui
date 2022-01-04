/*
    => This Class Is Reusable responsive Side Bar
    => Version 1 [open, close, responsive with resizeObserver]
*/
class VectorSideBar {
    constructor(options){
        this.sideBarSelector = document.getElementById(options.sideBarSelector);
        this.width  = options.width
        this.openSelector  = options.openSelector
        this.closeSelector  = options.closeSelector
        this.transition = options.transition
		// ON Instance
        this.sideBarSelector.style.transition = this.transition;
        this.sideBarSelector.style.zIndex = "100";
        
    }
    getWidth () {
        return this.sideBarSelector.offsetWidth
    }
    open () {
        const openElement = document.getElementById(this.openSelector)
        openElement.addEventListener("click", () => {
            this.sideBarSelector.style.left = 0
        })
    }
    close () {
        const closeElement = document.getElementById(this.closeSelector)
        closeElement.addEventListener("click", () => {
            this.sideBarSelector.style.left = `-${this.sideBarSelector.offsetWidth}px`
        })
    }
    isClosed () {
        return getComputedStyle(this.sideBarSelector).left != "0"
    }
    widthChangingObserver () {
        const sizeObserver = new ResizeObserver(entries => {
            if (this.isClosed()) {
                this.sideBarSelector.style.left = `-${entries[0].borderBoxSize[0].inlineSize}px`
            }
        })
        sizeObserver.observe(this.sideBarSelector)
    }
}

const sideBar = new VectorSideBar({
    sideBarSelector: "sidebar",
    width: "25%",
    openSelector: "open_side_bar",
    closeSelector: "close_side_bar",
    transition: "left 1s cubic-bezier(0, 0, 0.24, 0.88)"
});

sideBar.open()
sideBar.close()
sideBar.open()
sideBar.widthChangingObserver()