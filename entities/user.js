module.exports = class User {
    constructor({login, password, _id}){
        if (_id){
            this.id = _id;
        }
        this.login = login;
        this.password = password;
    }
};