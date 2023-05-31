const axios = require("axios");

class Payload {

    static async request(service, data) {

        const { credentials, body, action } = data;
        const SERVER = `https://cluster-01.apigratis.com/api/v1/${service}`;

        try {

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
                error: error?.response?.data?.error || error.message,
            };
        }
    }
}

module.exports = Payload;
