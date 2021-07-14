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
// const draggables = document.querySelectorAll(".bookmarks-list-element");
// const bookmarksList = document.querySelector(".bookmarks-list");

// draggables.forEach(draggable => {
//     draggable.addEventListener("dragstart", event => dragStart(event, draggable));
//     draggable.addEventListener("dragend", event => dragEnd(event, draggable));
// })

// function dragStart(event, draggable) {
//     draggable.classList.add("dragging");
// }

// function dragEnd(event, draggable) {
//     draggable.classList.remove("dragging");
// }


// bookmarksList.addEventListener("dragover", dragOver);

// function dragOver(event) {
//     event.preventDefault();
//     const draggable = document.querySelector(".dragging");
//     const afterElement = getDragAfterElement(bookmarksList, event.clientY);
//     if (afterElement == null) {
//         bookmarksList.appendChild(draggable);
//     }
//     else {
//         bookmarksList.insertBefore(draggable, afterElement);
//     }
// }

// function getDragAfterElement(container, y) {
//     const draggableElements = [...container.querySelectorAll(".bookmarks-list-element:not(.dragging)")];
//     const closestElement = draggableElements.reduce((closest, draggable) => {
//         const box = draggable.getBoundingClientRect();
//         const offset = y - (box.top + (box.height / 2));
//         if (offset < 0 && offset > closest.offset) {
//             return { offset: offset, element: draggable };
//         }
//         else {
//             return closest;
//         }
//     }, { offset: Number.NEGATIVE_INFINITY });

//     return closestElement.element;
// }


// Draggables 2
// const draggableBookmarks = document.querySelectorAll(".bookmarks-card");
// const bookmarksGrid = document.querySelector("#bookmarks-grid");

// draggableBookmarks.forEach(draggable => {
//     draggable.addEventListener("dragstart", event => dragStart(event, draggable));
//     draggable.addEventListener("dragend", event => dragEnd(event, draggable));
// })

// function dragStart(event, draggable) {
//     draggable.classList.add("dragging");
// }

// function dragEnd(event, draggable) {
//     draggable.classList.remove("dragging");
// }


// bookmarksGrid.addEventListener("dragover", dragOver);

// function dragOver(event) {
//     event.preventDefault();
//     const draggable = document.querySelector(".dragging");
//     const draggedOverElement = getDraggedOverElement(bookmarksGrid, event.clientX, event.clientY);
//     console.log(draggedOverElement);
//     if (draggedOverElement == null) {
//         bookmarksGrid.insertBefore(draggable, templateCard);
//     }
//     else {
//         bookmarksGrid.insertBefore(draggable, draggedOverElement);
//     }
// }

// function getDraggedOverElement(container, x, y) {
//     const draggableElements = [...container.querySelectorAll(".bookmarks-card:not(.dragging)")];
//     const draggedOverElement = draggableElements.reduce((current, draggable) => {
//         const box = draggable.getBoundingClientRect();
//         offsetX = x - (box.left + (box.width / 2));
//         offsetY = y - (box.top + (box.height / 2));
//         offset = Math.sqrt(Math.pow(offsetX, 2) + Math.pow(offsetY, 2));
//         if (y > box.y && y < box.y + box.height && x > box.x && x < box.x + box.width && offset > current.offset) {
//             return { offset: offset, element: draggable };
//         }
//         else {
//             return current;
//         }
//     }, { offset: Number.NEGATIVE_INFINITY })

//     return draggedOverElement.element;
// }


// function getDragAfterElement(container, y) {
//     const draggableElements = [...container.querySelectorAll(".bookmarks-list-element:not(.dragging)")];
//     const closestElement = draggableElements.reduce((closest, draggable) => {
//         const box = draggable.getBoundingClientRect();
//         const offset = y - (box.top + (box.height / 2));
//         if (offset < 0 && offset > closest.offset) {
//             return { offset: offset, element: draggable };
//         }
//         else {
//             return closest;
//         }
//     }, { offset: Number.NEGATIVE_INFINITY });

//     return closestElement.element;
// }


// Draggable 4: Muuri
var grid = new Muuri('#bookmarks-grid', {
    // items: ".bookmarks-card",
    dragEnabled: true,
    layoutOnResize: 10,
    layoutDuration: 400,
    layoutEasing: "ease-out",
    dragStartPredicate: (item, event) => {
        // Prevent template-card from being dragged 
        if (item._element.classList.contains("template-card")) {
            return false;
        }
        // For other items use the default drag start predicate.
        return Muuri.ItemDrag.defaultStartPredicate(item, event);
      }
});

const draggables = document.querySelectorAll(".item");

draggables.forEach(draggable => {
    draggable.addEventListener("click", clickBookmark);
    draggable.addEventListener("dragstart", dragStart);
    draggable.addEventListener("dragend", dragEnd);
})

function clickBookmark(event) {
    if (this.classList.contains("muuri-item-dragging-before-click")) {
        this.classList.remove("muuri-item-dragging-before-click");
        event.preventDefault();
    }
}

function dragStart() {
    this.classList.add("muuri-item-dragging-before-click");
}

function dragEnd() {
    this.classList.remove("muuri-item-dragging-before-click");
}