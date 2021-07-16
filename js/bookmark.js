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

    getGridComponent(size) {
        const div = document.createElement("div");
        div.className = `item bookmarks-item bookmarks-card bookmarks-card-${size}`;
        div.id = `bookmarks-item-${this.id}`
        div.setAttribute("draggable", "true");

        div.innerHTML = `
            <div class="item-content">
                <a href="${this.url}" class="block">
                    <img src="./img/logo_main.png" alt="">
                    <h1 class="title-1 text-center">${this.name}</h1>
                    <p class="text text-small">${this.description}</p>
                    <span class="url">${this.url}</span>
                </a>
            </div>
        `;
    }
}

export class DateTimeBookmark extends BaseBookmark {
    constructor(id, name, isVisible = true) {
        super(id, name, isVisible);
    }

    getGridComponent(size) {
        const div = document.createElement("div");
        div.className = `item bookmarks-item bookmarks-card bookmarks-card-${size}`;
        div.id = `bookmarks-item-${this.id}`
        div.setAttribute("draggable", "true");
        
        div.innerHTML = `
            <div class="item-content">
                <a href="#" class="block">
                    <h1 class="title-1 text-center">${this.name}</h1>
                </a>
            </div>
        `;
    }
}

export class TemplateBookmark extends BaseBookmark {
    constructor(id, name, isVisible = true) {
        super(id, name, isVisible);
    }

    getGridComponent(size) {
        const div = document.createElement("div");
        div.className = `item bookmarks-item bookmarks-card bookmarks-card-${size}`;
        div.id = `bookmarks-item-${this.id}`
        div.setAttribute("draggable", "true");
        
        div.innerHTML = `
            <div class="item-content">
                <a href="#" class="block">
                    <i class="fas fa-plus"></i>
                </a>
            </div>
        `;
    }
}
