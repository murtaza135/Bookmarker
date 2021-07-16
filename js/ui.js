export default class UI {
    constructor() {
        // Bookmarks grid on main page
        const bookmarksGrid = document.querySelector("#bookmarks-grid");
        const bookmarkItemsAll = () => document.querySelector("#bookmarks-grid .bookmarks-item");

        // Bookmarks modal for adding new bookmarks
        const templateCard = () => document.querySelector("#template-card");
        const bookmarksModal = document.querySelector("#bookmarks-modal");
        const bookmarksModalCloseBtn = () => document.querySelector("#bookmarks-modal .modal-close-btn");
        const bookmarksNameInput = () => document.querySelector("#bookmarks-name-input");
        const bookmarksUrlInput = () => document.querySelector("#bookmarks-url-input");
        const bookmarksDescriptionInput = () => document.querySelector("#bookmarks-description-input");
        const bookmarksImageUploadText = () => document.querySelector("#bookmarks-image-upload-text");
        const bookmarksImageInput = () => document.querySelector("#bookmarks-image-input");
        const bookmarksSubmitBtn = () => document.querySelector(".bookmarks-submit-btn");

        // Settings modal
        const settingsButton = document.querySelector("#settings");
        const settingsModal = document.querySelector("#settings-modal");
        const settingsModalCloseBtn = () => document.querySelector("#settings-modal .modal-close-btn");
        const settingsBookmarksList = () => document.querySelector("#settings-modal .bookmarks-list");
    }
}