module.exports = class Response {
    static getSuccess(data){
        return {statusCode: 200, data: data};
    }

    static createSuccess(){
        return {statusCode: 201};
    }

    static notFoundError(message){
        return {statusCode: 404, message: message};
    }
};