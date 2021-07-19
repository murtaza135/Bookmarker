import Muuri from "muuri";


export default class CustomMuuri extends Muuri {
    constructor(element, options) {
        CustomMuuri._setCustomDragStartPredicate(options);
        super(element, options);
        this._setupEventListeners(options.items);
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

    getElementByCustomId(id) {
        const regex = /[0-9]+$/g;

        for (const item of this.getItems()) {
            const element = item.getElement();
            const elementCustomId = parseInt(element.id.match(regex)[0]);
            if (elementCustomId === id) {
                return element;
            }
        }

        return null;
    }

    getItemByCustomId(id) {
        const regex = /[0-9]+$/g;

        for (const item of this.getItems()) {
            const element = item.getElement();
            const elementCustomId = parseInt(element.id.match(regex)[0]);
            if (elementCustomId === id) {
                return item;
            }
        }

        return null;
    }

    refresh() {
        this.refreshItems();
        this.refreshSortData();
        this.layout();
    }

    _setupEventListeners(itemSelector) {
        const items = document.querySelectorAll(itemSelector);
        items.forEach(item => {
            item.addEventListener("click", this._itemClick);
        })

        this.on("add", items => {
            items.forEach(item => {
                const element = item.getElement();
                element.addEventListener("click", this._itemClick);
            })
        })
    }

    _itemClick(event) {
        if (!this.classList.contains("muuri-item-clickable")) {
            setTimeout(() => {
                this.classList.add("muuri-item-clickable");
            }, 1250);
            event.preventDefault();
        }
    }

    static _setCustomDragStartPredicate(options) {
        if (options.dragStartPredicate == null) {
            options.dragStartPredicate = (item, event) => {
                CustomMuuri._customDragStartPredicate(item, event);
                return Muuri.ItemDrag.defaultStartPredicate(item, event);
            }
        }
        else {
            const userDefinedDragStartPredicate = options.dragStartPredicate;
            options.dragStartPredicate = (item, event) => {
                CustomMuuri._customDragStartPredicate(item, event);
                return userDefinedDragStartPredicate(item, event);
            }
        }
    }

    static _customDragStartPredicate(item, event) {
        if (event.distance <= 2) {
            item.getElement().classList.add("muuri-item-clickable");
        }
        else {
            item.getElement().classList.remove("muuri-item-clickable");
        }
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
