export default class UI {
    constructor() {
        // Bookmarks grid on main page
        this.bookmarksGrid = document.querySelector("#bookmarks-grid");
        this.bookmarkItemSelector = "#bookmarks-grid .bookmarks-item";

        // Bookmarks modal for adding new bookmarks
        this.templateCardSelector = "#template-card";
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
    }
}