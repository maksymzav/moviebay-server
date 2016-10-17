module.exports = class Producer {
    constructor({ name, biography, films, _id }) {
        if (_id) {
            this.id = _id;
        }
        this.name = name;
        this.biography = biography;
        this.films = films;
    }
};
