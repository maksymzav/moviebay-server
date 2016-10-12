module.exports = class Film {
    constructor({ name, actors, year, rate, producer, _id }) {
        if (_id) {
            this.id = _id;
        }
        this.name = name;
        this.actors = actors;
        this.year = year;
        this.rate = rate;
        this.producer = producer;
    }
};
