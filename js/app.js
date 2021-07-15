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
let grid = new Muuri('#bookmarks-grid', {
    items: ".bookmarks-item",
    dragEnabled: true,
    layoutOnResize: 10,
    layoutDuration: 300,
    layoutEasing: "linear",
    layoutOnInit: true,
    layout: centerLayout,
    // dragStartPredicate: makeTemplateCardNonDraggable
});

const draggableBookmarkItems = document.querySelectorAll(".bookmarks-item");

draggableBookmarkItems.forEach(bookmark => {
    bookmark.addEventListener("click", clickBookmark);
    bookmark.addEventListener("dragstart", bookmarksGridDragStart);
    bookmark.addEventListener("dragend", bookmarksGridDragEnd);
})

function clickBookmark(event) {
    if (this.classList.contains("muuri-item-dragging-before-click")) {
        this.classList.remove("muuri-item-dragging-before-click");
        event.preventDefault();
    }
}

function bookmarksGridDragStart() {
    this.classList.add("muuri-item-dragging-before-click");
}

function bookmarksGridDragEnd() {
    this.classList.remove("muuri-item-dragging-before-click");
}

function makeTemplateCardNonDraggable(item, event) {
    // Prevent template-card from being dragged 
    if (item._element.classList.contains("template-card")) {
        return false;
    }
    // For other items use the default drag start predicate.
    return Muuri.ItemDrag.defaultStartPredicate(item, event);
}

function centerLayout(grid, layoutId, items, width, height, callback) {
    let layout = {
        id: layoutId,
        items: items,
        slots: [],
        styles: {},
    };

    let item;
    let m;
    let x = 0;
    let y = 0;
    let w = 0;
    let h = 0;

    let maxW = width / 2;
    let currentW = 0;
    let currentRowH = 0;
    let currentRowW = 0;
    let rowSizes = [];
    let rowFixes = [];

    let xPre, yPre, wPre, hPre;
    let numToFix = 0;

    for (let i = 0; i < items.length; i++) {
        item = items[i];

        m = item.getMargin();
        wPre = item.getWidth() + m.left + m.right;
        hPre = item.getHeight() + m.top + m.bottom;
        xPre += wPre;

        if (hPre > currentRowH) {
            currentRowH = hPre;
        }

        if (w < currentRowW) {
            currentRowW = wPre;
        }

        rowSizes.push(width / 2);
        numToFix++;
        currentW += wPre;

        let k = 0;

        for (let j = 0; j < numToFix; j++) {
            rowSizes[i - j] -= wPre / 2;
        }

        if (numToFix > 1) {
            rowSizes[i] -= (wPre / 2) * (numToFix - 1);
            k += (wPre / 2);
        }

        currentW -= k;
        rowFixes.push(k);

        if (currentW >= maxW) {
            yPre += currentRowH;
            currentRowH = 0;
            xPre = 0;
            numToFix -= 1;
            currentW = 0;
            numToFix = 0;
            k = 0;
        }
    }

    maxW = width / 2;
    currentW = 0;
    currentRowH = 0;
    currentRowW = 0;

    for (let i = 0; i < items.length; i++) {
        item = items[i];
        x += w;

        if (h > currentRowH) {
            currentRowH = h;
        }

        if (w < currentRowW) {
            currentRowW = w;
        }

        currentW += w - rowFixes[i];

        if (currentW >= maxW) {
            y += currentRowH;
            currentRowH = 0;
            x = 0;
            currentW = 0;
        }

        m = item.getMargin();
        w = item.getWidth() + m.left + m.right;
        h = item.getHeight() + m.top + m.bottom;
        layout.slots.push(x + rowSizes[i], y);
    }

    layout.styles.width = '100%';
    layout.styles.height = y + h + 1 + 'px';

    callback(layout);
}


// File Input
const bookmarkImageFileInput = document.querySelector("#bookmarks-image-input");
const bookmarkImageFileUploadText = document.querySelector("#bookmarks-image-upload-text");

bookmarkImageFileInput.addEventListener("change", event => {
    const imageFilename = bookmarkImageFileInput.value.replace(/^.*(\\|\/|\:)/, '')
    bookmarkImageFileUploadText.value = imageFilename;
})