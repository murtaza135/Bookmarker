import CustomMuuri from "./custom_muuri";


export default class UI {
    constructor() {
        // Bookmarks grid on main page
        this.bookmarksGrid = document.querySelector("#bookmarks-grid");
        this.bookmarkItemSelector = "#bookmarks-grid .bookmarks-item";

        // Bookmarks modal for adding new bookmarks
        this.templateCardSelector = "#bookmarks-grid .template-card";
        this.bookmarksModal = document.querySelector("#bookmarks-modal");
        this.bookmarksModalCloseBtn = document.querySelector("#bookmarks-modal .modal-close-btn");
        this.bookmarksNameInput = document.querySelector("#bookmarks-name-input");
        this.bookmarksUrlInput = document.querySelector("#bookmarks-url-input");
        this.bookmarksDescriptionInput = document.querySelector("#bookmarks-description-input");
        this.bookmarksImageUploadText = document.querySelector("#bookmarks-image-upload-text");
        this.bookmarksImageInput = document.querySelector("#bookmarks-image-input");
        this.bookmarksSubmitBtn = document.querySelector(".bookmarks-submit-btn");

        // Settings modal
        this.settingsButton = document.querySelector("#settings");
        this.settingsModal = document.querySelector("#settings-modal");
        this.settingsModalCloseBtn = document.querySelector("#settings-modal .modal-close-btn");
        this.settingsBookmarksList = document.querySelector("#settings-modal .bookmarks-list");
        this.bookmarkListElementSelector = "#settings-modal .bookmarks-list-element";
        this.deleteBookmarkBtnSelector = "#settings-modal .bookmarks-list-element btn-delete-bookmark";
        this.editBookmarkBtnSelector = "#settings-modal .bookmarks-list-element btn-edit-bookmark";
        this.showBookmarkBtnSelector = "#settings-modal .bookmarks-list-element btn-show-bookmark input[type='checkbox']";

        // Muuri Grid
        this.grid = this._setUpMuuriGrid();
    }

    _setUpMuuriGrid() {
        const grid = new CustomMuuri('#bookmarks-grid', {
            items: ".bookmarks-item",
            dragEnabled: true,
            layoutOnResize: 10,
            layoutDuration: 300,
            layoutEasing: "linear",
            layoutOnInit: true,
            layout: CustomMuuri.centerLayout
        });

        return grid;
    }

    // Muuri grid on main page
    populateBookmarksGrid(bookmarks, size) {
        bookmarks.forEach(bookmark => {
            this.grid.add(bookmark.getGridComponent(size));
        })
    }

    emptyOutBookmarksGrid() {

    }

    addBookmarkToGrid() {

    }

    deleteBookmarkFromGrid() {

    }

    updateBookmarkInGrid() {

    }

    moveBookmarkInGrid() {

    }

    // Single Axis Dragger in settings modal
    populateBookmarksList() {

    }

    emptyOutBookmarksList() {

    }

    addBookmarkToList() {

    }

    deleteBookmarkFromList() {

    }

    updateBookmarkInList() {

    }

    moveBookmarkInList() {

    }

    // Modals
    openBookmarksModal() {
        this.bookmarksModal.classList.remove("closed");
    }
    
    closeBookmarksModal() {
        this.bookmarksModal.classList.add("closed");
    }

    openSettingsModal() {
        this.settingsModal.classList.remove("closed");
    }
    
    closeSettingsModal() {
        this.settingsModal.classList.add("closed");
    }

    displayImageFileNameInBookmarksModal() {
        const imageFilename = this.bookmarksImageInput.value.replace(/^.*(\\|\/|\:)/, '')
        this.bookmarksImageUploadText.value = imageFilename;
    }
}