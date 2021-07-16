import Utilities from "./utilities";
import { ui } from "./ui";

class App {
    constructor() {
        const templateCard = document.querySelector(ui.templateCardSelector);
        // templateCard.addEventListener("click", this.openBookmarksModal);
        ui.bookmarksModal.addEventListener("click", this.closeBookmarksModal);
        ui.bookmarksModalCloseBtn.addEventListener("click", this.closeBookmarksModal);

        ui.settingsButton.addEventListener("click", this.openSettingsModal);
        ui.settingsModal.addEventListener("click", this.closeSettingsModal);
        ui.settingsModalCloseBtn.addEventListener("click", this.closeSettingsModal);

        ui.bookmarksImageInput.addEventListener("change", this.displayImageFileNameInBookmarksModal)

    }

    openBookmarksModal() {
        ui.openBookmarksModal();
    }

    closeBookmarksModal(event) {
        if (event.target === ui.bookmarksModal
            || event.target.parentElement === ui.bookmarksModalCloseBtn
            || event.target === ui.bookmarksModalCloseBtn
        ) {
            ui.closeBookmarksModal();
        }
    }

    openSettingsModal() {
        ui.openSettingsModal();
    }
    
    closeSettingsModal(event) {
        if (event.target === ui.settingsModal
            || event.target.parentElement === ui.settingsModalCloseBtn
            || event.target === ui.settingsModalCloseBtn
        ) {
            ui.closeSettingsModal();
        }
    }

    displayImageFileNameInBookmarksModal() {
        ui.displayImageFileNameInBookmarksModal();
    }
}

const app = new App();







// Draggable Bookmarks List in Settings Modal
import SingleAxisDragger from "./single_axis_dragger";

const bookmarksList = document.querySelector(".bookmarks-list");
const draggableBookmarkListElements = document.querySelectorAll(".bookmarks-list-element");
const dragger = new SingleAxisDragger(bookmarksList, draggableBookmarkListElements);



// Draggable Bookmarks Grid
import CustomMuuri from "./custom_muuri";

const grid = new CustomMuuri('#bookmarks-grid', {
    items: ".bookmarks-item",
    dragEnabled: true,
    layoutOnResize: 10,
    layoutDuration: 300,
    layoutEasing: "linear",
    layoutOnInit: true,
    layout: CustomMuuri.centerLayout,
    // dragStartPredicate: makeTemplateCardNonDraggable
});

const element = document.querySelector(".bookmarks-item")
// console.log(element);

grid.on("dragEnd", (item, event) => {
    console.log(item);
    console.log(event);
    console.log(item._element === element);
})


// document.addEventListener("click", () => {
//     console.log(grid.getItems());
// })

function makeTemplateCardNonDraggable(item, event) {
    // Prevent template-card from being dragged 
    if (item._element.classList.contains("template-card")) {
        return false;
    }
    // For other items use the default drag start predicate.
    return Muuri.ItemDrag.defaultStartPredicate(item, event);
}