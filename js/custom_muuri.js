import Muuri from "muuri";


export default class CustomMuuri extends Muuri {
    constructor(element, options) {
        super(element, options);
        this.draggableItems = document.querySelectorAll(options.items);
        this._setupEventListeners();
    }

    getElementIndex(element) {
        const item = this.getItem(element);
        const index = this.getItems().indexOf(item);
        return index;
    }

    getItemIndex(item) {
        const index = this.getItems().indexOf(item);
        return index;
    }

    _setupEventListeners() {
        this.draggableItems.forEach(item => {
            item.addEventListener("click", this._itemClick);
            item.addEventListener("dragstart", this._itemDragStart);
            item.addEventListener("dragend", this._itemDragEnd);
        })

        this.on("add", items => {
            items.forEach(item => {
                const element = item.getElement();
                element.addEventListener("click", this._itemClick);
                element.addEventListener("dragstart", this._itemDragStart);
                element.addEventListener("dragend", this._itemDragEnd);
            })
        })
    }

    _itemClick(event) {
        if (this.classList.contains("muuri-item-dragging-before-click")) {
            this.classList.remove("muuri-item-dragging-before-click");
            event.preventDefault();
        }
    }

    _itemDragStart() {
        this.classList.add("muuri-item-dragging-before-click");
    }

    _itemDragEnd() {
        this.classList.remove("muuri-item-dragging-before-click");
    }

    static centerLayout(grid, layoutId, items, width, height, callback) {
        // Center Layout from https://github.com/haltu/muuri/issues/308

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
}