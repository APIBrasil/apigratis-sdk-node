const Payload = require('./Payload');

class APIGratis{

    static WhatsApp(server, apitoken, action, method, body) {
        let response = Payload.request(server, apitoken, action, method, body);
        return response;
    }

}

module.exports = APIGratis; 