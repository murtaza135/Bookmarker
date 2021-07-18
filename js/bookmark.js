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
        div.className = `item bookmarks-item bookmarks-card bookmarks-card-${size} muuri-item-clickable`;
        div.id = `bookmarks-grid-item-${this.id}`;
        div.setAttribute("draggable", "true");

        div.innerHTML = `
            <div class="item-content">
                <a href="${this.url}" class="block">
                    <img src="${this.image}" alt="">
                    <h1 class="title-1 text-center">${this.name}</h1>
                    <p class="text text-small">${this.description}</p>
                    <span class="url">${this.url}</span>
                </a>
            </div>
        `;

        return div;
    }

    getListComponent() {
        const div = document.createElement("div");
        div.className = "bookmarks-list-element";
        div.id = `bookmarks-list-item-${this.id}`;
        div.setAttribute("draggable", "true");

        div.innerHTML = `
            <div class="item-content">
                <section class="bookmark-info">
                    <img class="img" src="${this.image}" alt="">
                    <h1>${this.name}</h1>
                </section>
                <section class="bookmark-buttons">
                    <div class="btn btn-danger btn-delete-bookmark">Delete</div>
                    <div class="btn btn-light btn-edit-bookmark">Edit</div>
                    <div class="btn btn-toggle btn-show-bookmark">
                        <label class="switch">
                            <input type="checkbox" ${this.isVisible ? "checked" : ""}>
                            <span class="slider round"></span>
                        </label>
                    </div>
                </section>
            </div>
        `;

        return div;
    }
}

export class DateTimeBookmark extends BaseBookmark {
    constructor(id, name, isVisible = true) {
        super(id, name, isVisible);
    }

    getGridComponent(size) {
        const div = document.createElement("div");
        div.className = `item bookmarks-item bookmarks-card bookmarks-card-${size} muuri-item-clickable`;
        div.id = `bookmarks-grid-item-${this.id}`
        div.setAttribute("draggable", "true");
        
        div.innerHTML = `
            <div class="item-content">
                <a class="block">
                    <i class="far fa-clock"></i>
                    <h1 class="title-1 text-center">${this.name}</h1>
                </a>
            </div>
        `;
        
        return div;
    }

    getListComponent() {
        const div = document.createElement("div");
        div.className = "bookmarks-list-element special";
        div.id = `bookmarks-list-item-${this.id}`;
        div.setAttribute("draggable", "true");

        div.innerHTML = `
            <div class="item-content">
                <section class="bookmark-info">
                    <i class="img far fa-clock"></i>
                    <h1>${this.name}</h1>
                </section>
                <section class="bookmark-buttons">
                    <div class="btn btn-toggle btn-show-bookmark">
                        <label class="switch">
                            <input type="checkbox" ${this.isVisible ? "checked" : ""}>
                            <span class="slider round"></span>
                        </label>
                    </div>
                </section>
            </div>
        `;

        return div;
    }
}

export class TemplateBookmark extends BaseBookmark {
    constructor(id, name, isVisible = true) {
        super(id, name, isVisible);
    }

    getGridComponent(size) {
        const div = document.createElement("div");
        div.className = `item bookmarks-item template-card template-card-${size} muuri-item-clickable`;
        div.id = `bookmarks-grid-item-${this.id}`
        div.setAttribute("draggable", "true");
        
        div.innerHTML = `
            <div class="item-content">
                <a class="block">
                    <i class="fas fa-plus"></i>
                </a>
            </div>
        `;

        return div;
    }

    getListComponent() {
        const div = document.createElement("div");
        div.className = "bookmarks-list-element special";
        div.id = `bookmarks-list-item-${this.id}`;
        div.setAttribute("draggable", "true");

        div.innerHTML = `
            <div class="item-content">
                <section class="bookmark-info">
                    <i class="img fas fa-plus"></i>
                    <h1>${this.name}</h1>
                </section>
                <section class="bookmark-buttons">
                    <div class="btn btn-toggle btn-show-bookmark">
                        <label class="switch">
                            <input type="checkbox" ${this.isVisible ? "checked" : ""}>
                            <span class="slider round"></span>
                        </label>
                    </div>
                </section>
            </div>
        `;

        return div;
    }
}
