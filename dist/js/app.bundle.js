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
    else if (event.target.parentElement === settingsModalCloseBtn) {
        settingsModal.style.display = "none";
    }
}


// templateCard.addEventListener("click", openBookmarksModal);
// bookmarksModal.addEventListener("click", closeBookmarksModal);
// bookmarksModalCloseBtn.addEventListener("click", closeBookmarksModal);

function openBookmarksModal() {
    bookmarksModal.style.display = "block";
}

function closeBookmarksModal(event) {
    if (event.target === bookmarksModal) {
        bookmarksModal.style.display = "none";
    }
    else if (event.target.parentElement === bookmarksModalCloseBtn) {
        bookmarksModal.style.display = "none";
    }
}



// Draggable (https://www.youtube.com/watch?v=jfYWwQrtzzY)
const draggables = document.querySelectorAll(".bookmarks-list-element");
const bookmarksList = document.querySelector(".bookmarks-list");

draggables.forEach(draggable => {
    draggable.addEventListener("dragstart", event => dragStart(event, draggable));
    draggable.addEventListener("dragend", event => dragEnd(event, draggable));
})

function dragStart(event, draggable) {
    draggable.classList.add("dragging");
}

function dragEnd(event, draggable) {
    draggable.classList.remove("dragging");
}


bookmarksList.addEventListener("dragover", dragOver);

function dragOver(event) {
    event.preventDefault();
    const draggable = document.querySelector(".dragging");
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