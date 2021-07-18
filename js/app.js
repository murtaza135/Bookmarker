import UI from "./ui";
import BookmarksController from "./bookmarks_controller";
import { isObjectPartiallyEmpty } from "./util/object";


class App {
    constructor() {
        this.bookmarksController = new BookmarksController();
        this.ui = new UI();

        this.loadInitialState();
        this.loadInitialBookmarks();
        this.loadEventListeners();
    }

    loadInitialState() {
        const bookmarkSize = this.bookmarksController.getBookmarkSize();
        const changeSizeDiv = document.querySelector(`.change-size-options #box-section-${bookmarkSize}`);
        changeSizeDiv.classList.add("active");
    }

    loadInitialBookmarks() {
        const bookmarks = this.bookmarksController.getAllBookmarks();
        const bookmarkSize = this.bookmarksController._bookmarkSize;
        this.ui.populateBookmarksGrid(bookmarks, bookmarkSize);
        this.ui.populateBookmarksList(bookmarks);
    }

    loadEventListeners() {
        this.ui.grid.on("dragReleaseStart", item => this.moveGridItem(item, this.ui.grid));
        this.ui.bookmarksSubmitBtn.addEventListener("click", event => this.addNewBookmark(event));

        this.ui.bookmarksGrid.addEventListener("click", event => this.openBookmarksModal(event));
        this.ui.bookmarksModal.addEventListener("click", event => this.closeBookmarksModal(event));
        this.ui.bookmarksModalCloseBtn.addEventListener("click", event => this.closeBookmarksModal(event));

        this.ui.settingsButton.addEventListener("click", event => this.openSettingsModal(event));
        this.ui.settingsModal.addEventListener("click", event => this.closeSettingsModal(event));
        this.ui.settingsModalCloseBtn.addEventListener("click", event => this.closeSettingsModal(event));
        this.ui.changeSizeOptionsDiv.addEventListener("click", event => this.changeBookmarkSize(event));

        this.ui.bookmarksImageInput.addEventListener("change", event => this.displayImageFileNameInBookmarksModal(event));
    }

    moveGridItem(item, grid) {
        const id = this.bookmarksController.extractIdFromElement(item.getElement());
        const newIndex = grid.getItemIndex(item);
        this.bookmarksController.moveBookmark(id, newIndex);
    }

    addNewBookmark(event) {
        const data = this.ui.getDataFromBookmarksModal();
        if (data.image == null) {
            data.image = "./img/logo_main.png";
        }

        if (isObjectPartiallyEmpty(data)) {
            // TODO add a danger alert or modal
            console.log("not all data is present");
        }
        else {
            const bookmark = this.bookmarksController.addNewBookmark(data);
            const bookmarkSize = this.bookmarksController.getBookmarkSize();
            const bookmarkIndex = this.bookmarksController.getBookmarkIndex(bookmark.id);
            this.ui.addBookmarkToGrid(bookmark, bookmarkSize, bookmarkIndex);
            this.ui.closeBookmarksModal();
        }

        event.preventDefault();
    }

    openBookmarksModal(event) {
        const isClickable = (
            event.target.parentElement.parentElement
            .classList.contains("muuri-item-clickable")
            || event.target.parentElement.parentElement.parentElement
            .classList.contains("muuri-item-clickable")
        );

        if (isClickable) {
            const isTemplateCard = (
                event.target.parentElement.parentElement
                .classList.contains("template-card")
                || event.target.parentElement.parentElement.parentElement
                .classList.contains("template-card")
            );
    
            if (isTemplateCard) {
                this.ui.openBookmarksModal();
            }
        }
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

    changeBookmarkSize(event) {
        const element = this._getBookmarkSizeBoxSectionElement(event);

        if (element) {
            const oldBookmarkSize = this.bookmarksController.getBookmarkSize();
            const newBookmarkSize = this.bookmarksController.extractBookmarkSizeFromElement(element);
            
            this.bookmarksController.setBookmarkSize(newBookmarkSize);
            this.ui.setNewActiveBookmarkSizeBoxSection(newBookmarkSize);
            this.ui.changeSizeOfGridItems(oldBookmarkSize, newBookmarkSize);
        }
    }

    _getBookmarkSizeBoxSectionElement(event) {
        if (event.target.classList.contains("box-section")) {
            return event.target;
        }
        else if (event.target.parentElement.classList.contains("box-section")) {
            return event.target.parentElement;
        }
        else {
            return null;
        }
    }

    displayImageFileNameInBookmarksModal() {
        this.ui.displayImageFileNameInBookmarksModal();
    }
}


const app = new App();
