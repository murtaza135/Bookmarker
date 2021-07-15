import Bookmark from "./bookmark";

export default class BookmarksController {
    constructor(bookmarks = []) {
        this._bookmarks = [];

        bookmarks.forEach(bookmark => {
            this.reAddBookmark(bookmark);
        })
    }

    reAddBookmark(newBookmark, overwriteOld = true) {
        let oldBookmark = null;
        for (let bookmark of this._bookmarks) {
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
        id = this._generateNewId();
        const bookmark = new Bookmark(id, name, url, description, image, isVisible);
        this._bookmarks.push();
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
        for (let bookmark of this._bookmarks) {
            if (bookmark.id === id) {
                return bookmark;
            }
        }
    }

    getBookmarkIndex(id) {
        for (let i in this._bookmarks) {
            const bookmark = this._bookmarks[i];
            if (bookmark.id === id) {
                return i;
            }
        }
    }

    updateBookmark(id, updatedInfo) {
        for (let bookmark of this._bookmarks) {
            if (bookmark.id === id) {
                return Object.assign(bookmark, updatedInfo);
            }
        }
    }

    deleteBookmark(id) {
        for (let i in this._bookmarks) {
            const bookmark = this._bookmarks[i];
            if (bookmark.id === id) {
                return this._bookmarks.splice(i, 1)[0];
            }
        }
    }

    moveBookmark(id, toIndex) {
        const bookmarkIndex = this.getBookmark(id);
    }
}

// [0, 1, 2, 3, 4, 5, 6, 7, 8]