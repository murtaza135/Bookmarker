export default class Bookmark {
    constructor(id, name, url, description, image=null, isVisible = true) {
        this.id = id;
        this.name = name;
        this.url = url;
        this.description = description;
        this.image = image;
        this.isVisible = isVisible;
    }
}