const axios = require("axios");

class WhatsApp {

    static validateCredentials(credentials) {
        if (
            !credentials?.SecretKey ||
            !credentials?.PublicToken ||
            !credentials?.DeviceToken ||
            !credentials?.BearerToken
        ) {
            throw new Error("Invalid credentials");
        }
    }

    static validateWBody(body) {
        if (!body) {
            throw new Error("Invalid body");
        }
    }

    static async request(data) {

        const { credentials, body, action } = data;

        try {
            
            this.validateCredentials(credentials);
            this.validateBody(body);

            const SERVER = "https://cluster-01.apigratis.com/api/v1/whatsapp/";

            const config = {
                method: "POST",
                url: `${SERVER}${action || ""}`,
                headers: {
                    "Agent": "APIBRASIL/SDK-JS",
                    "Content-Type": "application/json",
                    "SecretKey": credentials.SecretKey,
                    "PublicToken": credentials.PublicToken,
                    "DeviceToken": credentials.DeviceToken,
                    "Authorization": `Bearer ${credentials.BearerToken}`,
                },
                data: JSON.stringify(body),
            };

            const response = await axios(config);
            return response.data;

        } catch (error) {
            return {
                status: "error",
                message: error.message,
            };
        }
    }
}

module.exports = WhatsApp;
