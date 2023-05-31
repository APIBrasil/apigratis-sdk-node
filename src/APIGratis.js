const Payload = require('apigratis');

class APIGratis {

    async WhatsApp(data) {
        try {
            
            const response = await Payload.request('whatsapp', data);
            return response;

        } catch (error) {
            return {
                status: "error",
                error: error.message
            };
        }
    }

    //vehicles
    async Vehicles(data) {

        try {

            const response = await Payload.request('vehicles', data);
            return response;

        } catch (error) {
            return {
                status: "error",
                error: error.message
            };
        }
    }

}

module.exports = APIGratis;
