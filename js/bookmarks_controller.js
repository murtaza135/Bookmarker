import { Bookmark, DateTimeBookmark, TemplateBookmark } from "./bookmark";

export default class BookmarksController {
    constructor(bookmarks = []) {
        this._bookmarks = [];
        this._templateBookmark = this._createTemplateBookmark();
        // this._createDateTimeBookmark();
        this.addNewBookmark("Hello World", "https://www.google.com", "Hello World and bye world", "./img/logo_main.png");
        this.addNewBookmark("Hello World", "https://www.google.com", "Hello World and bye world", "./img/logo_main.png");
        this.addNewBookmark("Hello World", "https://www.google.com", "Hello World and bye world", "./img/logo_main.png");
        this.addNewBookmark("Hello World", "https://www.google.com", "Hello World and bye world", "./img/logo_main.png");
        this.addNewBookmark("Hello World", "https://www.google.com", "Hello World and bye world", "./img/logo_main.png");

        // bookmarks.forEach(bookmark => {
        //     this.reAddBookmark(bookmark);
        // })
    }

    _createTemplateBookmark() {
        let id = this._generateNewId()
        const templateBookmark = new TemplateBookmark(id, "Date Time", true);
        this._bookmarks.push(templateBookmark);
        return templateBookmark;
    }

    _createDateTimeBookmark() {
        let id = this._generateNewId()
        const dateTimeBookmark = new DateTimeBookmark(id, "Date Time", true);
        // this._bookmarks.push(dateTimeBookmark);
        const index = this._bookmarks.indexOf(this._templateBookmark);
        this._bookmarks.splice(index, 0, dateTimeBookmark);
        return dateTimeBookmark;
    }

    reAddBookmark(newBookmark, overwriteOld = true) {
        let oldBookmark = null;
        for (const bookmark of this._bookmarks) {
            if (newBookmark.id === bookmark.id) {
                oldBookmark = bookmark;
                break;
            }
        }

        if (oldBookmark && !overwriteOld) {
            return oldBookmark;
        }
        else if (oldBookmark && overwriteOld) {
            const index = this._bookmarks.indexOf(oldBookmark);
            this._bookmarks.splice(index, 1);

            const bookmark = new Bookmark(
                newBookmark.id, newBookmark.name, newBookmark.url,
                newBookmark.description, newBookmark.image, newBookmark.isVisible
            );

            this._bookmarks.push(bookmark);
            return bookmark;
        }
        else {
            const bookmark = new Bookmark(
                newBookmark.id, newBookmark.name, newBookmark.url,
                newBookmark.description, newBookmark.image, newBookmark.isVisible
            );

            this._bookmarks.push(bookmark);
            return bookmark;
        }

    }

    addNewBookmark(name, url, description, image, isVisible = true) {
        const id = this._generateNewId();
        const bookmark = new Bookmark(id, name, url, description, image, isVisible);
        // this._bookmarks.push(bookmark);
        const index = this._bookmarks.indexOf(this._templateBookmark);
        this._bookmarks.splice(index, 0, bookmark);
        return bookmark;
    }

    addCustomBookmark(bookmarkType, name, isVisible = true) {
        const id = this._generateNewId();
        const bookmark = new bookmarkType(id, name, isVisible);
        // this._bookmarks.push(bookmark);
        const index = this._bookmarks.indexOf(this._templateBookmark);
        this._bookmarks.splice(index, 0, bookmark);
        return bookmark;
    }

    _generateNewId() {
        if (this._bookmarks.length >= 0) {
            const len = this._bookmarks.length;
            // const id = this._bookmarks[this._bookmarks.length - 1].id + 1;
            const id = this._bookmarks.length;
            // console.log(id);
            return id;
        }
        else {
            return 0;
        }
    }

    getAllBookmarks() {
        return this._bookmarks;
    }

    getBookmark(id) {
        for (const bookmark of this._bookmarks) {
            if (bookmark.id === id) {
                return bookmark;
            }
        }
    }

    getBookmarkIndex(id) {
        for (const [index, bookmark] in this._bookmarks.entries()) {
            if (bookmark.id === id) {
                return index;
            }
        }
    }

    updateBookmark(id, updatedInfo) {
        for (const bookmark of this._bookmarks) {
            if (bookmark.id === id) {
                return Object.assign(bookmark, updatedInfo);
            }
        }
    }

    deleteBookmark(id) {
        for (const [index, bookmark] in this._bookmarks.entries()) {
            if (bookmark.id === id) {
                return this._bookmarks.splice(index, 1)[0];
            }
        }
    }

    moveBookmark(id, toIndex) {
        const bookmarkIndex = this.getBookmarkIndex(id);
        const bookmark = this._bookmarks.splice(bookmarkIndex, 1)[0];
        return this._bookmarks.splice(toIndex, 0, bookmark)[0];
    }
}