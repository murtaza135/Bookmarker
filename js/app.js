import UI from "./ui";
import CustomMuuri from "./custom_muuri";
import BookmarksController from "./bookmarks_controller";

class App {
    constructor() {
        this.ui = new UI();
        this.initialiseBookmarksGrid();

        const templateCard = document.querySelector(this.ui.templateCardSelector);
        // templateCard.addEventListener("click", this.openBookmarksModal);
        this.ui.bookmarksModal.addEventListener("click", this.closeBookmarksModal);
        this.ui.bookmarksModalCloseBtn.addEventListener("click", this.closeBookmarksModal);

        this.ui.settingsButton.addEventListener("click", this.openSettingsModal);
        this.ui.settingsModal.addEventListener("click", this.closeSettingsModal);
        this.ui.settingsModalCloseBtn.addEventListener("click", this.closeSettingsModal);

        this.ui.bookmarksImageInput.addEventListener("change", this.displayImageFileNameInBookmarksModal)
    }

    initialiseBookmarksGrid() {
        const bookmarksController = new BookmarksController();

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

        bookmarksController.getAllBookmarks().forEach(bookmark => {
            grid.add(bookmark.getGridComponent("l"));
        })

        grid.on("dragReleaseStart", item => {
            // console.log(item.getGrid());
            // console.log(grid.getItems());
            // grid.synchronize();
            // console.log(grid.getItemIndex(item));
        })

        grid.on("move", data => {
            // console.log(data);
            // console.log(grid.getItemIndex(data.item));
        })
    }

    openBookmarksModal() {
        this.ui.openBookmarksModal();
    }

    closeBookmarksModal(event) {
        if (event.target === this.ui.bookmarksModal
            || event.target.parentElement === this.ui.bookmarksModalCloseBtn
            || event.target === this.ui.bookmarksModalCloseBtn
        ) {
            this.ui.closeBookmarksModal();
        }
    }

    openSettingsModal() {
        this.ui.openSettingsModal();
    }
    
    closeSettingsModal(event) {
        if (event.target === this.ui.settingsModal
            || event.target.parentElement === this.ui.settingsModalCloseBtn
            || event.target === this.ui.settingsModalCloseBtn
        ) {
            this.ui.closeSettingsModal();
        }
    }

    displayImageFileNameInBookmarksModal() {
        this.ui.displayImageFileNameInBookmarksModal();
    }
}

const app = new App();







// Draggable Bookmarks List in Settings Modal
import SingleAxisDragger from "./single_axis_dragger";

const bookmarksList = document.querySelector(".bookmarks-list");
const draggableBookmarkListElements = document.querySelectorAll(".bookmarks-list-element");
const dragger = new SingleAxisDragger(bookmarksList, draggableBookmarkListElements);



// Draggable Bookmarks Grid

// const grid = new CustomMuuri('#bookmarks-grid', {
//     items: ".bookmarks-item",
//     dragEnabled: true,
//     layoutOnResize: 10,
//     layoutDuration: 300,
//     layoutEasing: "linear",
//     layoutOnInit: true,
//     layout: CustomMuuri.centerLayout,
//     // dragStartPredicate: makeTemplateCardNonDraggable
// });

// const element = document.querySelector(".bookmarks-item")
// console.log(element);

// grid.on("dragEnd", (item, event) => {
//     console.log(item);
//     console.log(event);
//     console.log(item._element === element);
// })


// document.addEventListener("click", () => {
//     console.log(grid.getItems());
// })

// function makeTemplateCardNonDraggable(item, event) {
//     // Prevent template-card from being dragged 
//     if (item._element.classList.contains("template-card")) {
//         return false;
//     }
//     // For other items use the default drag start predicate.
//     return Muuri.ItemDrag.defaultStartPredicate(item, event);
// }