export class BaseBookmark {
    constructor(id, name, isVisible = true) {
        this.id = id;
        this.name = name;
        this.isVisible = isVisible;
    }
}

export class Bookmark extends BaseBookmark {
    constructor(id, name, url, description, image, isVisible = true) {
        super(id, name, isVisible);
        this.url = url;
        this.description = description;
        this.image = image;
    }
}

export class DateTimeBookmark extends BaseBookmark {
    constructor(id, name, isVisible = true) {
        super(id, name, isVisible);
    }
}

export class TemplateBookmark extends BaseBookmark {
    constructor(id, name, isVisible = true) {
        super(id, name, isVisible);
    }
}
