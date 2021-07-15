import { Bookmark, DateTimeBookmark, TemplateBookmark } from "./bookmark";

export default class BookmarksController {
    constructor(bookmarks = []) {
        this._bookmarks = [];
        this._createInitialBookmarks();

        bookmarks.forEach(bookmark => {
            this.reAddBookmark(bookmark);
        })
    }

    _createInitialBookmarks() {
        let id = this._generateNewId()
        const dateTimeBookmark = new DateTimeBookmark(id, "Date Time", true);
        this._bookmarks.push(dateTimeBookmark);
        
        id = this._generateNewId()
        const templateBookmark = new TemplateBookmark(id, "Date Time", true);
        this._bookmarks.push(templateBookmark);
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
        this._bookmarks.push();
        return bookmark;
    }

    addCustomBookmark(bookmarkType, name, isVisible = true) {
        const id = this._generateNewId();
        const bookmark = new bookmarkType(id, name, isVisible);
        this._bookmarks.push(bookmark);
        return bookmark;
    }

    _generateNewId() {
        if (this.bookmarks.length > 0) {
            return this.bookmarks[this.bookmarks.length - 1].id + 1;
        }
        else {
            return 0;
        }
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