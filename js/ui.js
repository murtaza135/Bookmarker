import CustomMuuri from "./custom_muuri";
import SingleAxisDragger from "./single_axis_dragger";


export default class UI {
    constructor() {
        // Bookmarks grid on main page
        this.bookmarksGrid = document.querySelector("#bookmarks-grid");
        this.bookmarkItemSelector = "#bookmarks-grid .bookmarks-item";

        // Bookmarks modal for adding new bookmarks
        this.templateCardSelector = "#bookmarks-grid .template-card";
        this.bookmarksModal = document.querySelector("#bookmarks-modal");
        this.bookmarksModalCloseBtn = document.querySelector("#bookmarks-modal .modal-close-btn");
        this.bookmarksModalForm = document.querySelector("#bookmarks-modal .bookmarks-form");
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
        this.boxSections = document.querySelectorAll("#settings-modal .box-section");
        this.settingsBookmarksList = document.querySelector("#settings-modal .bookmarks-list");
        this.bookmarkListElementSelector = "#settings-modal .bookmarks-list-element";
        this.deleteBookmarkBtnSelector = "#settings-modal .bookmarks-list-element btn-delete-bookmark";
        this.editBookmarkBtnSelector = "#settings-modal .bookmarks-list-element btn-edit-bookmark";
        this.showBookmarkBtnSelector = "#settings-modal .bookmarks-list-element btn-show-bookmark input[type='checkbox']";

        // Muuri Grid
        this.grid = this._setUpMuuriGrid();
        this.dragger = this._setUpDraggerList();

        // TODO remove
        this.tempInit();
    }

    tempInit() {
        // TODO remove
        this.settingsModal.classList.remove("closed");
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

    _setUpDraggerList() {
        const draggableBookmarkListElements = document.querySelectorAll(".bookmarks-list-element");

        const dragger = new SingleAxisDragger(
            this.settingsBookmarksList,
            draggableBookmarkListElements
        );

        return dragger;
    }

    // Muuri grid on main page
    populateBookmarksGrid(bookmarks, size) {
        bookmarks.forEach(bookmark => {
            this.grid.add(bookmark.getGridComponent(size));
        })
        return this;
    }

    emptyOutBookmarksGrid() {

    }

    addBookmarkToGrid(bookmark, bookmarkSize, index) {
        const element = bookmark.getGridComponent(bookmarkSize);
        element.classList.add("newly-added");
        this.grid.add(element, { index: index });
        element.classList.remove("newly-added");
        return this;
    }

    deleteBookmarkFromGrid() {

    }

    updateBookmarkInGrid() {

    }

    moveBookmarkInGrid() {

    }

    // Single Axis Dragger in settings modal
    populateBookmarksList(bookmarks) {
        bookmarks.forEach(bookmark => {
            this.dragger.container.appendChild(bookmark.getListComponent());
        })
        return this;
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

    // Bookmarks Modal
    openBookmarksModal() {
        this.bookmarksModal.classList.remove("closed");
    }
    
    closeBookmarksModal() {
        this.bookmarksModal.classList.add("closed");
        this.clearDataFromBookmarksModal();
    }

    clearDataFromBookmarksModal() {
        this.bookmarksModalForm.reset();
    }

    getDataFromBookmarksModal() {
        const name = this.bookmarksNameInput.value;
        const url = this.bookmarksUrlInput.value;
        const description = this.bookmarksDescriptionInput.value;

        let image;
        const uploadedFile = this.bookmarksImageInput.files[0];
        if (uploadedFile) {
            image = URL.createObjectURL(uploadedFile);
        }
        else {
            image = null;
        }

        return {
            name: name,
            url: url,
            description: description,
            image: image
        };
    }

    displayImageFileNameInBookmarksModal() {
        //+ there are 2 ways of getting the name of the file/image
        // const imageFileName = this.bookmarksImageInput.files[0].name;
        const imageFilename = this.bookmarksImageInput.value.replace(/^.*(\\|\/|\:)/, '')
        this.bookmarksImageUploadText.value = imageFilename;
    }

    // Settings Modal
    openSettingsModal() {
        this.settingsModal.classList.remove("closed");
    }
    
    closeSettingsModal() {
        this.settingsModal.classList.add("closed");
    }
}