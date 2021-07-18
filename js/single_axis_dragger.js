export default class SingleAxisDragger {
    // TODO make this class more sophisticated by adding ability to keep track of elements and their order
    // Majority of code from Web Dev Simplified (https://www.youtube.com/watch?v=jfYWwQrtzzY)
    
    constructor(container, draggableItems, containerDirection = "y") {
        this.container = container;
        this.draggableItems = draggableItems;
        this.containerDirection = containerDirection;
        this._setupEventListeners();
    }

    _setupEventListeners() {
        this.draggableItems.forEach(item => {
            item.addEventListener("dragstart", event => this._itemDragStart(event, item));
            item.addEventListener("dragend", event => this._itemDragEnd(event, item));
        });
        this.container.addEventListener("dragover", event => this._itemDragOver(event));
    }
    
    _itemDragStart(event, item) {
        item.classList.add("dragged-item");
    }
    
    _itemDragEnd(event, item) {
        item.classList.remove("dragged-item");
    }

    _itemDragOver(event) {
        event.preventDefault();

        const draggedItem = document.querySelector(".dragged-item");
        const elementAfterDraggedItem = this._getElementAfterDraggedItem(event.clientY);

        if (elementAfterDraggedItem == null) {
            this.container.appendChild(draggedItem);
        }
        else {
            this.container.insertBefore(draggedItem, elementAfterDraggedItem);
        }
    }

    _getElementAfterDraggedItem(position) {
        const draggableItemsInContainer = [...this.draggableItems].filter(item => {
            return this.container.contains(item) && !item.classList.contains("dragged-item");
        })

        const closestElement = draggableItemsInContainer.reduce((closest, item) => {
            const box = item.getBoundingClientRect();

            let offset = 0;
            if (this.containerDirection === "x" || this.containerDirection === "horizontal") {
                offset = position - (box.x + (box.width / 2));
            }
            else {
                offset = position - (box.y + (box.height / 2));
            }

            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: item };
            }
            else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY });

        return closestElement.element;
    }
}