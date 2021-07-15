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
        const items = this.getItems();
        
        for (const item of items) {
            if (item[this._itemIdentifierKey] === id) {
                return item;
            }
        }
    }

    addItems(...newItems) {
        const currentItems = this.getItems();
        currentItems.push(...newItems);
        localStorage.setItem(this._key, JSON.stringify(currentItems));
    }

    updateItem(id, updatedObject) {
        const currentItems = this.getItems();

        for (const item of currentItems) {
            if (item[this._itemIdentifierKey] === id) {
                Object.assign(item, updatedObject);
                break;
            }
        }

        localStorage.setItem(this._key, JSON.stringify(items));
    }

    deleteItem(id) {
        const items = this.getItems();

        for (const [index, item] in items) {
            if (item[this._itemIdentifierKey] === id) {
                items.splice(index, 1);
                break;
            }
        }

        localStorage.setItem(this._key, JSON.stringify(items));
    }

    deleteAllItems() {
        localStorage.removeItem(this._key);
    }
}