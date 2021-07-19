import UI from "./ui";
import BookmarksController from "./bookmarks_controller";


class App {
    constructor() {
        this.bookmarksController = new BookmarksController();
        this.ui = new UI();

        // TODO possibly create a structure or class around the file input
        // TODO ... to make it easier to handle file uploads from user
        // TODO ... this is used in the edit bookmarks modal, because the file change
        // TODO ... does not take place if you cancel the first time you pick an image
        this.hasImageChangeOccurred = false;

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
        this.ui.list.on("dragReleaseStart", item => this.moveGridItem(item, this.ui.list));
        this.ui.bookmarksSubmitBtn.addEventListener("click", event => this.addNewBookmark(event));
        this.ui.settingsBookmarksList.addEventListener("click", event => this.deleteBookmark(event));
        this.ui.settingsBookmarksList.addEventListener("click", event => this.editBookmark(event));
        this.ui.editBookmarksSubmitBtn.addEventListener("click", event => this.updateBookmark(event));
        this.ui.settingsBookmarksList.addEventListener("click", event => this.toggleBookmarkVisibility(event));

        this.ui.bookmarksGrid.addEventListener("click", event => this.openBookmarksModal(event));
        this.ui.bookmarksModal.addEventListener("click", event => this.closeBookmarksModal(event));
        this.ui.bookmarksModalCloseBtn.addEventListener("click", event => this.closeBookmarksModal(event));

        this.ui.editBookmarksModal.addEventListener("click", event => this.closeEditBookmarksModal(event));
        this.ui.editBookmarksModalCloseBtn.addEventListener("click", event => this.closeEditBookmarksModal(event));

        this.ui.settingsButton.addEventListener("click", event => this.openSettingsModal(event));
        this.ui.settingsModal.addEventListener("click", event => this.closeSettingsModal(event));
        this.ui.settingsModalCloseBtn.addEventListener("click", event => this.closeSettingsModal(event));
        this.ui.changeSizeOptionsDiv.addEventListener("click", event => this.changeBookmarkSize(event));

        this.ui.bookmarksImageInput.addEventListener("input", event => this.displayImageFileNameInBookmarksModal(event));
        this.ui.editBookmarksImageInput.addEventListener("input", event => this.displayImageFileNameInEditBookmarksModal(event));
    }

    moveGridItem(item, muuri) {
        const itemId = this.bookmarksController.extractIdFromElement(item.getElement());
        const newIndex = muuri.getItemIndex(item);

        this.bookmarksController.moveBookmark(itemId, newIndex);
        this.ui.moveBookmarkInGrid(itemId, newIndex);
        this.ui.moveBookmarkInList(itemId, newIndex);
    }

    addNewBookmark(event) {
        const data = this.ui.getDataFromBookmarksModal();

        if (data.name && data.url) {
            const bookmark = this.bookmarksController.addNewBookmark(data);
            const bookmarkSize = this.bookmarksController.getBookmarkSize();
            const bookmarkIndex = this.bookmarksController.getBookmarkIndex(bookmark.id);
            this.ui.addBookmarkToGrid(bookmark, bookmarkSize, bookmarkIndex);
            this.ui.addBookmarkToList(bookmark, bookmarkIndex);
            this.ui.closeBookmarksModal();
            event.preventDefault();
        }
    }

    deleteBookmark(event) {
        if (event.target.classList.contains("btn-delete-bookmark")) {
            // TODO add a proper confirm modal
            if (confirm("Are you sure you want to delete this bookmark?")) {
                const bookmarkListElement = event.target.parentElement.parentElement.parentElement;
                const id = this.bookmarksController.extractIdFromElement(bookmarkListElement);
    
                this.bookmarksController.deleteBookmark(id);
                this.ui.deleteBookmarkFromGrid(id);
                this.ui.deleteBookmarkFromList(id);
            }
        }
    }

    editBookmark(event) {
        if (event.target.classList.contains("btn-edit-bookmark")) {
            this.hasImageChangeOccurred = false;
            const bookmarkListElement = event.target.parentElement.parentElement.parentElement;
            const id = this.bookmarksController.extractIdFromElement(bookmarkListElement);

            const bookmark = this.bookmarksController.getBookmark(id);
            this.ui.openEditBookmarksModalForBookmark(bookmark);
            this.ui.displayBookmarkDataInEditBookmarksModal(bookmark);
        }

    }

    updateBookmark(event) {
        const bookmark = this.ui.currentEdit;
        const newData = this.ui.getDataFromEditBookmarksModal();

        if (!this.hasImageChangeOccurred) {
            delete newData.image;
            this.hasImageChangeOccurred = false;
        }

        if (newData.name && newData.url) {
            this.bookmarksController.updateBookmark(bookmark.id, newData);
            this.ui.updateBookmarkInGrid(bookmark);
            this.ui.updateBookmarkInList(bookmark);
            this.ui.grid.refresh();
            this.ui.list.refresh();
            this.ui.closeEditBookmarksModal();
            event.preventDefault();
        }
    }

    toggleBookmarkVisibility(event) {
        if (event.target.parentElement.parentElement.classList.contains("btn-show-bookmark")) {
            const toggleButton = event.target;
            const toggleButtonDiv = event.target.parentElement.parentElement;
            const bookmarkListElement = toggleButtonDiv.parentElement.parentElement.parentElement;
            const id = this.bookmarksController.extractIdFromElement(bookmarkListElement);

            this.bookmarksController.setBookmarkVisibility(id, toggleButton.checked);
            this.ui.toggleBookmarkVisibilityInGrid(id, toggleButton.checked)
        }
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

    closeEditBookmarksModal(event) {
        if (event.target === this.ui.editBookmarksModal
            || event.target.parentElement === this.ui.editBookmarksModalCloseBtn
            || event.target === this.ui.editBookmarksModalCloseBtn
        ) {
            this.ui.closeEditBookmarksModal();
            this.hasImageChangeOccurred = false;
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

    displayImageFileNameInBookmarksModal(event) {
        this.ui.displayImageFileNameInBookmarksModal();
    }

    displayImageFileNameInEditBookmarksModal(event) {
        this.hasImageChangeOccurred = true;
        this.ui.displayImageFileNameInEditBookmarksModal();
    }
}


const app = new App();
