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
        this.bookmarksModalForm = document.querySelector("#bookmarks-modal .bookmarks-form");
        this.bookmarksNameInput = document.querySelector("#bookmarks-name-input");
        this.bookmarksUrlInput = document.querySelector("#bookmarks-url-input");
        this.bookmarksDescriptionInput = document.querySelector("#bookmarks-description-input");
        this.bookmarksImageUploadText = document.querySelector("#bookmarks-image-upload-text");
        this.bookmarksImageInput = document.querySelector("#bookmarks-image-input");
        this.bookmarksSubmitBtn = document.querySelector("#bookmarks-modal .bookmarks-submit-btn");

        // Edit bookmarks modal
        this.editBookmarksModal = document.querySelector("#edit-bookmarks-modal");
        this.editBookmarksModalCloseBtn = document.querySelector("#edit-bookmarks-modal .modal-close-btn");
        this.editBookmarksModalForm = document.querySelector("#edit-bookmarks-modal .bookmarks-form");
        this.editBookmarksNameInput = document.querySelector("#edit-bookmarks-name-input");
        this.editBookmarksUrlInput = document.querySelector("#edit-bookmarks-url-input");
        this.editBookmarksDescriptionInput = document.querySelector("#edit-bookmarks-description-input");
        this.editBookmarksImageUploadText = document.querySelector("#edit-bookmarks-image-upload-text");
        this.editBookmarksImageInput = document.querySelector("#edit-bookmarks-image-input");
        this.editBookmarksSubmitBtn = document.querySelector("#edit-bookmarks-modal .bookmarks-submit-btn");

        // Settings modal
        this.settingsButton = document.querySelector("#settings");
        this.settingsModal = document.querySelector("#settings-modal");
        this.settingsModalCloseBtn = document.querySelector("#settings-modal .modal-close-btn");
        this.changeSizeOptionsDiv = document.querySelector("#settings-modal .change-size-options");
        this.changeSizeBoxSections = document.querySelectorAll("#settings-modal .change-size-options .box-section");
        this.settingsBookmarksList = document.querySelector("#settings-modal .bookmarks-list");
        this.bookmarkListElementSelector = "#settings-modal .bookmarks-list-element";
        this.deleteBookmarkBtnSelector = "#settings-modal .bookmarks-list-element btn-delete-bookmark";
        this.editBookmarkBtnSelector = "#settings-modal .bookmarks-list-element btn-edit-bookmark";
        this.showBookmarkBtnSelector = "#settings-modal .bookmarks-list-element btn-show-bookmark input[type='checkbox']";

        // Muuri
        this.grid = this._setUpBookmarksGrid();
        this.list = this._setUpBookmarksList();

        // Current file being edited
        this.currentEdit = null;

        // TODO remove
        this.tempInit();
    }

    tempInit() {
        // TODO remove
        this.settingsModal.classList.remove("closed");
    }

    _setUpBookmarksGrid() {
        const grid = new CustomMuuri("#bookmarks-grid", {
            items: ".bookmarks-item",
            dragEnabled: true,
            layoutOnResize: 10,
            layoutDuration: 300,
            layoutEasing: "ease",
            layoutOnInit: true,
            layout: CustomMuuri.centerLayout
        });

        return grid;
    }

    _setUpBookmarksList() {
        const list = new CustomMuuri("#settings-modal .bookmarks-list", {
            items: ".bookmarks-list-element",
            dragEnabled: true,
            layoutOnResize: 10,
            layoutDuration: 300,
            layoutEasing: "ease",
            layoutOnInit: true,
            layout: CustomMuuri.centerLayout,
            dragAxis: "y"
        });

        return list;
    }

    // Muuri grid on main page
    populateBookmarksGrid(bookmarks, size) {
        bookmarks.forEach(bookmark => {
            this.grid.add(bookmark.getGridComponent(size), { 
                active: bookmark.isVisible 
            });
        })
        return this;
    }

    addBookmarkToGrid(bookmark, bookmarkSize, index) {
        const element = bookmark.getGridComponent(bookmarkSize);
        element.classList.add("newly-added");
        this.grid.add(element, { index: index });
        element.classList.remove("newly-added");
        return this;
    }

    deleteBookmarkFromGrid(id) {
        const item = this.grid.getItemByCustomId(id)
        this.grid.remove([item]);
        item.getElement().remove();
    }

    updateBookmarkInGrid(bookmark) {
        // const item = this.grid.getItemByCustomId(bookmark.id);
        // const newElement = bookmark.getGridComponent(size);
        // this.grid.replaceElementWithinItem(newElement, item);

        const element = this.grid.getElementByCustomId(bookmark.id);
        bookmark.refreshContentInGridComponentInstance(element);
    }

    toggleBookmarkVisibilityInGrid(id, toggleValue) {
        const item = this.grid.getItemByCustomId(id);

        if (toggleValue) {
            this.grid.show([item]);
        }
        else {
            this.grid.hide([item]);
        }
    }

    moveBookmarkInGrid(id, newIndex) {
        const element = this.grid.getElementByCustomId(id)
        this.grid.move(element, newIndex);
    }

    changeSizeOfGridItems(oldBookmarkSize, newBookmarkSize) {
        this.grid.getItems().forEach(item => {
            const element = item.getElement();

            if (element.classList.contains("bookmarks-card")) {
                element.classList.remove(`bookmarks-card-${oldBookmarkSize}`);
                element.classList.add(`bookmarks-card-${newBookmarkSize}`);
            }
            else if (element.classList.contains("template-card")) {
                element.classList.remove(`template-card-${oldBookmarkSize}`);
                element.classList.add(`template-card-${newBookmarkSize}`);
            }
        })

        this.grid.refreshItems();
        this.grid.layout();
    }

    // Muuri list on settings modal
    populateBookmarksList(bookmarks) {
        bookmarks.forEach(bookmark => {
            this.list.add(bookmark.getListComponent());
        })
        return this;
    }

    addBookmarkToList(bookmark, index) {
        const element = bookmark.getListComponent();
        this.list.add(element, { index: index });
        return this;
    }

    deleteBookmarkFromList(id) {
        const item = this.list.getItemByCustomId(id)
        this.list.remove([item]);
        item.getElement().remove();
    }

    updateBookmarkInList(bookmark) {
        const element = this.list.getElementByCustomId(bookmark.id);
        bookmark.refreshContentInListComponentInstance(element);
    }

    moveBookmarkInList(id, newIndex) {
        const element = this.list.getElementByCustomId(id)
        this.list.move(element, newIndex); 
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
        const image = this.bookmarksImageInput.files[0];

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

    // Edit Bookmarks Modal
    openEditBookmarksModalForBookmark(bookmark) {
        this.editBookmarksModal.classList.remove("closed");
        this.currentEdit = bookmark;
    }

    closeEditBookmarksModal() {
        this.editBookmarksModal.classList.add("closed");
        this.currentEdit = null;
        this.clearDataFromEditBookmarksModal();
    }

    clearDataFromEditBookmarksModal() {
        this.currentEdit = null;
        this.editBookmarksModalForm.reset();
    }

    displayBookmarkDataInEditBookmarksModal(bookmark) {
        this.editBookmarksNameInput.value = bookmark.name;
        this.editBookmarksUrlInput.value = bookmark.url;
        this.editBookmarksDescriptionInput.value = bookmark.description;
        this.editBookmarksImageUploadText.value = bookmark.image ? 
            bookmark.image.name :
            "";
    }

    getDataFromEditBookmarksModal() {
        const name = this.editBookmarksNameInput.value;
        const url = this.editBookmarksUrlInput.value;
        const description = this.editBookmarksDescriptionInput.value;
        const image = this.editBookmarksImageInput.files[0];

        return {
            name: name,
            url: url,
            description: description,
            image: image
        };
    }

    displayImageFileNameInEditBookmarksModal() {
        const imageFilename = this.editBookmarksImageInput.value.replace(/^.*(\\|\/|\:)/, '')
        this.editBookmarksImageUploadText.value = imageFilename;
    }

    // Settings Modal
    openSettingsModal() {
        this.settingsModal.classList.remove("closed");
        this.list.refreshItems();
        this.list.layout();
    }
    
    closeSettingsModal() {
        this.settingsModal.classList.add("closed");
    }

    setNewActiveBookmarkSizeBoxSection(newBookmarkSize) {
        this.changeSizeBoxSections.forEach(section => section.classList.remove("active"));
        const newActiveChangeSizeBox = document
            .querySelector(`.change-size-options #box-section-${newBookmarkSize}`);
        newActiveChangeSizeBox.classList.add("active");
    }

    // Delete Confirmation Modal

}