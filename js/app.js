const settingsButton = document.querySelector("#settings");
const settingsModal = document.querySelector("#settings-modal");
const settingsModalContent = document.querySelector("#settings-modal .modal-content");
const settingsModalCloseBtn = document.querySelector("#settings-modal .modal-content .modal-close-btn");

const templateCard = document.querySelector(".template-card");
const bookmarksModal = document.querySelector("#bookmarks-modal");
const bookmarksModalContent = document.querySelector("#bookmarks-modal .modal-content");
const bookmarksModalCloseBtn = document.querySelector("#bookmarks-modal .modal-content .modal-close-btn");


settingsButton.addEventListener("click", openSettingsModal);
settingsModal.addEventListener("click", closeSettingsModal);
settingsModalCloseBtn.addEventListener("click", closeSettingsModal);

function openSettingsModal() {
    settingsModal.style.display = "block";
}

function closeSettingsModal(event) {
    if (event.target === settingsModal) {
        settingsModal.style.display = "none";
    }
    else if (event.target.parentElement === settingsModalCloseBtn
            || event.target === settingsModalCloseBtn) {
        settingsModal.style.display = "none";
    }
}


templateCard.addEventListener("click", openBookmarksModal);
bookmarksModal.addEventListener("click", closeBookmarksModal);
bookmarksModalCloseBtn.addEventListener("click", closeBookmarksModal);

function openBookmarksModal() {
    bookmarksModal.style.display = "block";
}

function closeBookmarksModal(event) {
    if (event.target === bookmarksModal) {
        bookmarksModal.style.display = "none";
    }
    else if (event.target.parentElement === bookmarksModalCloseBtn
            || event.target === bookmarksModalCloseBtn) {
        bookmarksModal.style.display = "none";
    }
}


// Draggable Bookmarks List in Settings Modal (https://www.youtube.com/watch?v=jfYWwQrtzzY)
const draggableBookmarkListElements = document.querySelectorAll(".bookmarks-list-element");
const bookmarksList = document.querySelector(".bookmarks-list");

bookmarksList.addEventListener("dragover", bookmarksListDragOver);
draggableBookmarkListElements.forEach(bookmark => {
    bookmark.addEventListener("dragstart", bookmarksListDragStart);
    bookmark.addEventListener("dragend", bookmarksListDragEnd);
})

function bookmarksListDragStart() {
    console.log(this);
    this.classList.add("dragging");
}

function bookmarksListDragEnd() {
    this.classList.remove("dragging");
}

function bookmarksListDragOver(event) {
    event.preventDefault();
    const draggable = document.querySelector(".dragging");
    console.log(draggable);
    const afterElement = getDragAfterElement(bookmarksList, event.clientY);
    if (afterElement == null) {
        bookmarksList.appendChild(draggable);
    }
    else {
        bookmarksList.insertBefore(draggable, afterElement);
    }
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll(".bookmarks-list-element:not(.dragging)")];
    const closestElement = draggableElements.reduce((closest, draggable) => {
        const box = draggable.getBoundingClientRect();
        const offset = y - (box.top + (box.height / 2));
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: draggable };
        }
        else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY });

    return closestElement.element;
}


// Draggable Bookmarks Grid (https://github.com/haltu/muuri/issues/308)
import CustomMuuri from "./custom_muuri";

let grid = new CustomMuuri('#bookmarks-grid', {
    items: ".bookmarks-item",
    dragEnabled: true,
    layoutOnResize: 10,
    layoutDuration: 300,
    layoutEasing: "linear",
    layoutOnInit: true,
    layout: CustomMuuri.centerLayout,
    // dragStartPredicate: makeTemplateCardNonDraggable
});

function makeTemplateCardNonDraggable(item, event) {
    // Prevent template-card from being dragged 
    if (item._element.classList.contains("template-card")) {
        return false;
    }
    // For other items use the default drag start predicate.
    return Muuri.ItemDrag.defaultStartPredicate(item, event);
}


// File Input
const bookmarkImageFileInput = document.querySelector("#bookmarks-image-input");
const bookmarkImageFileUploadText = document.querySelector("#bookmarks-image-upload-text");

bookmarkImageFileInput.addEventListener("change", event => {
    const imageFilename = bookmarkImageFileInput.value.replace(/^.*(\\|\/|\:)/, '')
    bookmarkImageFileUploadText.value = imageFilename;
})