export default class StorageController {
    // TODO make this class more robust by checking for extreme values
    // TODO possibly remove "itemIdentifierKey"

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
        return items.find(item => item[this._itemIdentifierKey] === id);
    }

    setItems(items) {
        localStorage.setItem(this._key, JSON.stringify(items));
        return items;
    }

    addItems(...newItems) {
        const currentItems = this.getItems();
        currentItems.push(...newItems);
        localStorage.setItem(this._key, JSON.stringify(currentItems));
        return newItems;
    }

    updateItem(id, updatedObject) {
        const items = this.getItems();
        const item = items.find(item => item[this._itemIdentifierKey] === id);
        Object.assign(item, updatedObject);
        localStorage.setItem(this._key, JSON.stringify(items));
        return item;
    }

    deleteItem(id) {
        const items = this.getItems();
        const itemIndex = items.findIndex(item => item[this._itemIdentifierKey] === id);
        const deletedItem = items.splice(itemIndex, 1)[0];
        localStorage.setItem(this._key, JSON.stringify(items));
        return deletedItem;
    }

    deleteAllItems() {
        localStorage.removeItem(this._key);
    }
}