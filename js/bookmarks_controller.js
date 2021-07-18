import { Bookmark, DateTimeBookmark, TemplateBookmark } from "./bookmark";
import { uniqKeepFirst } from "./util/array";

export const allBookmarkSizes = Object.freeze({
    large: "l",
    l: "l",
    medium: "m",
    m: "m",
    small: "s",
    s: "s",
    xsmall: "xs",
    xs: "xs"
});


export default class BookmarksController {
    constructor(bookmarkSize = allBookmarkSizes.l, bookmarks = []) {
        this._bookmarkSize = allBookmarkSizes.l;
        this._bookmarkSize = this.setBookmarkSize(bookmarkSize);
        this._bookmarks = [];

        this._templateBookmark = this._createTemplateBookmark();
        this._createDateTimeBookmark();
        this.setBookmarks(bookmarks);
        this._createTempBookmarks();
    }

    setBookmarkSize(bookmarkSize) {
        const isBookmarkSizeValid = Object.values(allBookmarkSizes)
            .some(size => size === bookmarkSize);

        if (isBookmarkSizeValid) {
            this._bookmarkSize = bookmarkSize;
            return bookmarkSize;
        }
        else {
            return this._bookmarkSize;
        }
    }

    getBookmarkSize() {
        return this._bookmarkSize;
    }

    _createTemplateBookmark() {
        let id = this._generateNewId()
        const templateBookmark = new TemplateBookmark(id, "Template Bookmark 000", true);
        this._bookmarks.push(templateBookmark);
        return templateBookmark;
    }

    _createDateTimeBookmark() {
        let id = this._generateNewId()
        const dateTimeBookmark = new DateTimeBookmark(id, "Date Time", true);
        const index = this._bookmarks.indexOf(this._templateBookmark);
        this._bookmarks.splice(index, 0, dateTimeBookmark);
        return dateTimeBookmark;
    }

    _createTempBookmarks() {
        // TODO eventually delete this
        const tempObj = {
            name: null,
            url: "https://www.google.com",
            description: "Hello World and bye world",
            image: "./img/logo_main.png"
        }

        for (let i = 2; i < 7; i++) {
            tempObj.name = `${i}`;
            this.addNewBookmark(tempObj)
        }
    }

    setBookmarks(bookmarks, howToDealWithDuplicateIds = "discard") {
        // TODO cleanup and make it better
        this.deleteAllBookmarks();

        let bookmarksWithIds = [];
        let bookmarksWithoutIds = [];

        bookmarks.forEach(bookmark => {
            if (bookmark.id != null) {
                bookmarksWithIds.push(bookmark);
            }
            else {
                bookmarksWithoutIds.push(bookmark);
            }
        })

        const bookmarksWithNoDuplicateIds = uniqKeepFirst(bookmarksWithIds, bookmark => bookmark.id);
        const indexOfTemplateBookmark = this._bookmarks.indexOf(this._templateBookmark);

        bookmarksWithNoDuplicateIds.forEach(bookmark => {
            const newBookmark = new Bookmark(
                bookmark.id, bookmark.name, bookmark.url,
                bookmark.description, bookmark.image, bookmark.isVisible
            );

            this._bookmarks.splice(indexOfTemplateBookmark, 0, newBookmark);
        })

        bookmarksWithoutIds.forEach(bookmark => {
            this.addNewBookmark(bookmark);
        })
    }

    addNewBookmark({name, url, description, image}, isVisible = true) {
        const id = this._generateNewId();
        const bookmark = new Bookmark(id, name, url, description, image, isVisible);
        const index = this._bookmarks.indexOf(this._templateBookmark);
        this._bookmarks.splice(index, 0, bookmark);
        return bookmark;
    }

    addCustomBookmark(bookmarkType, name, isVisible = true) {
        const id = this._generateNewId();
        const bookmark = new bookmarkType(id, name, isVisible);
        const index = this._bookmarks.indexOf(this._templateBookmark);
        this._bookmarks.splice(index, 0, bookmark);
        return bookmark;
    }

    _generateNewId() {
        if (this._bookmarks.length === 0) {
            return 0;
        }
        else {
            const ids = this._bookmarks.map(bookmark => {
                return bookmark.id;
            })
    
            const newId = Math.max(...ids) + 1;
            return newId;
        }
    }

    getAllBookmarks() {
        return [...this._bookmarks];
    }

    getBookmark(id) {
        for (const bookmark of this._bookmarks) {
            if (bookmark.id === id) {
                return bookmark;
            }
        }
    }

    getBookmarkIndex(id) {
        for (const [index, bookmark] of this._bookmarks.entries()) {
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

    deleteAllBookmarks() {
        const deletedBookmarks = this._bookmarks.splice(0, this._bookmarks.length);
        this._templateBookmark = this._createTemplateBookmark();
        this._createDateTimeBookmark();
        return deletedBookmarks;
    }

    moveBookmark(id, toIndex) {
        const bookmarkIndex = this.getBookmarkIndex(id);
        const bookmark = this._bookmarks.splice(bookmarkIndex, 1)[0];
        this._bookmarks.splice(toIndex, 0, bookmark);
        return bookmark;
    }

    extractIdFromElement(element) {
        const regex = /[0-9]+$/g;
        return parseInt(element.id.match(regex)[0]);
    }

    extractBookmarkSizeFromElement(element) {
        const elementIdSeparated = element.id.split("-");
        return elementIdSeparated[elementIdSeparated.length - 1];
    }

    // reAddBookmark(newBookmark, overwriteOld = true) {
    //     // TODO delete this
    //     let oldBookmark = null;
    //     for (const bookmark of this._bookmarks) {
    //         if (newBookmark.id === bookmark.id) {
    //             oldBookmark = bookmark;
    //             break;
    //         }
    //     }

    //     if (oldBookmark && !overwriteOld) {
    //         return oldBookmark;
    //     }
    //     else if (oldBookmark && overwriteOld) {
    //         const index = this._bookmarks.indexOf(oldBookmark);
    //         this._bookmarks.splice(index, 1);

    //         const bookmark = new Bookmark(
    //             newBookmark.id, newBookmark.name, newBookmark.url,
    //             newBookmark.description, newBookmark.image, newBookmark.isVisible
    //         );

    //         this._bookmarks.push(bookmark);
    //         return bookmark;
    //     }
    //     else {
    //         const bookmark = new Bookmark(
    //             newBookmark.id, newBookmark.name, newBookmark.url,
    //             newBookmark.description, newBookmark.image, newBookmark.isVisible
    //         );

    //         this._bookmarks.push(bookmark);
    //         return bookmark;
    //     }
    // }
}
