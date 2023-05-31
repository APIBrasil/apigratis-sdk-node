const WhatsApp = require('apigratis');

class APIGratis {

    async WhatsApp(data) {
        
        try {
            
            const response = await WhatsApp.request(data);
            return response;

        } catch (error) {
            return {
                status: "error",
                message: error.message
            };
        }

    }
}

module.exports = APIGratis;
