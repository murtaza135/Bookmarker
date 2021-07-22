export default class SimpleStorageController {
    constructor(key) {
        this._key = key;
    }

    getItem() {
        return JSON.parse(localStorage.getItem(this._key));
    }

    setItem(item) {
        localStorage.setItem(this._key, JSON.stringify(item));
        return item;
    }

    deleteItem() {
        localStorage.removeItem(this._key);
    }
}
