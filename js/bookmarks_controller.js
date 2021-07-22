import { Bookmark, DateTimeBookmark, TemplateBookmark } from "./bookmark";

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
    constructor() {
        this._bookmarkSize = allBookmarkSizes.l;
        this._bookmarks = [];

        this._templateBookmark = null;
        this._dateTimeBookmark = null;
    }

    _createTemplateBookmark() {
        const id = 0;
        const templateBookmark = new TemplateBookmark(id, "Template", true);
        this._bookmarks.push(templateBookmark);
        return templateBookmark;
    }

    _createDateTimeBookmark() {
        const id = 1;
        const dateTimeBookmark = new DateTimeBookmark(id, "Date Time", true);
        const index = this._bookmarks.indexOf(this._templateBookmark);
        this._bookmarks.splice(index, 0, dateTimeBookmark);
        return dateTimeBookmark;
    }

    _refreshTemplateBookmark() {
        const index = this.getBookmarkIndex(0);
        const isVisible = this._bookmarks[index].isVisible;
        const bookmark = new TemplateBookmark(0, "Template", isVisible);
        this._bookmarks.splice(index, 1, bookmark);
        return bookmark;
    }

    _refreshDateTimeBookmark() {
        const index = this.getBookmarkIndex(1);
        const isVisible = this._bookmarks[index].isVisible;
        const bookmark = new DateTimeBookmark(id, "Date Time", isVisible);
        this._bookmarks.splice(index, 1, bookmark);
        return bookmark;
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

    setBookmarks(bookmarks) {
        this._bookmarks.splice(0, this._bookmarks.length);

        if (!bookmarks || bookmarks.length === 0) {
            this._bookmarks = [];
            this._templateBookmark = this._createTemplateBookmark();
            this._dateTimeBookmark = this._createDateTimeBookmark();
        }
        else {
            this._bookmarks = [];
            bookmarks.forEach(bookmark => {
                if (bookmark.id === 0) {
                    const newBookmark = new TemplateBookmark(
                        bookmark.id, "Template", bookmark.isVisible
                    );
                    this._bookmarks.push(newBookmark);
                    this._templateBookmark = newBookmark;
                }
                else if (bookmark.id === 1) {
                    const newBookmark = new DateTimeBookmark(
                        bookmark.id, "Date Time", bookmark.isVisible
                    );
                    this._bookmarks.push(newBookmark);
                    this._dateTimeBookmark = newBookmark;
                }
                else {
                    const newBookmark = new Bookmark(
                        bookmark.id, bookmark.name, bookmark.url,
                        bookmark.description, bookmark.image, bookmark.isVisible
                    );
                    this._bookmarks.push(newBookmark);
                }
            })
        }

        return this.getAllBookmarks();
    }

    addNewBookmark({name, url, description, image}, isVisible = true) {
        const id = this._generateNewId();
        const bookmark = new Bookmark(id, name, url, description, image, isVisible);
        const index = this._bookmarks.indexOf(this._templateBookmark);
        console.log(index);
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
            // id 0 and id 1 are taken by the template bookmark and datetime bookmark
            return 2;
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

    getAllBookmarksImageStriped() {
        return this._bookmarks.map(bookmark => {
            delete bookmark.image;
            return bookmark;
        });
    }

    getBookmark(id) {
        return this._bookmarks.find(bookmark => bookmark.id === id);
    }

    getBookmarkIndex(id) {
        return this._bookmarks.findIndex(bookmark => bookmark.id === id);
    }

    updateBookmark(id, updatedInfo) {
        const bookmark = this.getBookmark(id);
        return Object.assign(bookmark, updatedInfo);
    }

    deleteBookmark(id) {
        const bookmarkIndex = this.getBookmarkIndex(id);
        return this._bookmarks.splice(bookmarkIndex, 1)[0];
    }

    deleteAllBookmarks() {
        const deletedBookmarks = this._bookmarks.splice(0, this._bookmarks.length);
        this._templateBookmark = this._createTemplateBookmark();
        this._dateTimeBookmark = this._createDateTimeBookmark();
        return deletedBookmarks;
    }

    moveBookmark(id, toIndex) {
        const bookmarkIndex = this.getBookmarkIndex(id);
        const bookmark = this._bookmarks.splice(bookmarkIndex, 1)[0];
        this._bookmarks.splice(toIndex, 0, bookmark);
        return bookmark;
    }

    setBookmarkVisibility(id, isVisible) {
        const bookmark = this.getBookmark(id);
        bookmark.isVisible = isVisible;
    }

    extractIdFromElement(element) {
        const regex = /[0-9]+$/g;
        return parseInt(element.id.match(regex)[0]);
    }

    extractBookmarkSizeFromElement(element) {
        const elementIdSeparated = element.id.split("-");
        return elementIdSeparated[elementIdSeparated.length - 1];
    }
}
