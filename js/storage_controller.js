export default class StorageController {
    constructor(key, itemIdentifierKey = "id") {
        this._key = key;
        this._itemIdentifierKey = itemIdentifierKey;
    }

    getItems() {
        if (localStorage.getItem(this._key) === null) {
            return [];
        }
        else {
            return JSON.parse(localStorage.getItem(this._key));
        }
    }

    getItem(id) {
        let requiredItem = null;
        const items = this.getItems();
        
        for (let item of items) {
            if (item[this._itemIdentifierKey] === id) {
                requiredItem = item;
                break;
            }
        }

        return requiredItem;
    }

    storeItems(...newItems) {
        const currentItems = this.getItems();
        currentItems.push(...newItems);
        localStorage.setItem(this._key, JSON.stringify(currentItems));
    }

    updateItem(id, updatedObject) {
        const currentItems = this.getItems();

        for (let item of currentItems) {
            if (item[this._itemIdentifierKey] === id) {
                Object.assign(item, updatedObject);
                break;
            }
        }

        localStorage.setItem(this._key, JSON.stringify(items));
    }

    removeItem(id) {
        const items = this.getItems();

        items.forEach((item, index) => {
            if (item[this._itemIdentifierKey] === id) {
                items.splice(index, 1);
            }
        });

        localStorage.setItem(this._key, JSON.stringify(items));
    }

    removeAllItems() {
        localStorage.removeItem(this._key);
    }
}