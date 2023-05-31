const axios = require("axios");

let config = {};
let local = `http://localhost:3333`;

class Payload {
    
    static request(server, apitoken, action, method, body) {

        switch (action) {
            case 'start':
                config = {
                    method: `${method || 'GET'}`,
                    url: `${server || local}/${action || 'start'}`,
                    headers: {
                        'Content-Type': 'application/json',
                        'apitoken': `${apitoken || ''}`
                    },
                    data: JSON.stringify(body)
                };
                break;
            case 'qrcode':
                config = {
                    method: `${method || 'GET'}`,
                    url: `${server || local}/${action}?session=${body?.session}&sessionkey=${body?.sessionkey}`,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                };
                break;
            default:
                config = {
                    method: `${method || 'POST'}`,
                    url: `${server || local}/${action || ''}`,
                    headers: {
                        'Content-Type': 'application/json',
                        'sessionkey': `${body?.sessionkey || ''}`
                    },
                    data: JSON.stringify(body)
                };
                break;
        }

        axios(config).then(function (response) {
            return JSON.stringify(response?.data);
        }).catch(function (error) {
            return error?.response?.data;
        });

    }
}

module.exports = Payload; 
