import UI from "./ui";
import BookmarksController from "./bookmarks_controller";


class App {
    constructor() {
        this.bookmarksController = new BookmarksController();
        this.ui = new UI();

        this.loadInitialBookmarks();
        this.loadEventListeners();
    }

    loadInitialBookmarks() {
        const bookmarks = this.bookmarksController.getAllBookmarks();
        const bookmarkSize = this.bookmarksController._bookmarkSize;
        this.ui.populateBookmarksGrid(bookmarks, bookmarkSize);
    }

    loadEventListeners() {
        const templateCard = document.querySelector(this.ui.templateCardSelector);
        // templateCard.addEventListener("click", event => this.openBookmarksModal(event));
        this.ui.bookmarksModal.addEventListener("click", event => this.closeBookmarksModal(event));
        this.ui.bookmarksModalCloseBtn.addEventListener("click", event => this.closeBookmarksModal(event));

        this.ui.settingsButton.addEventListener("click", event => this.openSettingsModal(event));
        this.ui.settingsModal.addEventListener("click", event => this.closeSettingsModal(event));
        this.ui.settingsModalCloseBtn.addEventListener("click", event => this.closeSettingsModal(event));

        this.ui.bookmarksImageInput.addEventListener("change", event => this.displayImageFileNameInBookmarksModal(event));

        this.ui.grid.on("dragReleaseStart", item => {});
        this.ui.grid.on("move", data => {});
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