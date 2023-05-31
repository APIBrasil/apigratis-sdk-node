const WhatsApp = require('apigratis');

async function teste() {

    try {
    
        const response = await WhatsApp.request({
            action: "sendText",
            credentials: {
                SecretKey: "SEU_SECRET_KEY",
                PublicToken: "SEU_PUBLIC_TOKEN",
                DeviceToken: "SEU_DEVICE_TOKEN",
                BearerToken: "SEU_BEARER_TOKEN",
            },
            body: {
                message: "Hello World por JavaScript",
                phone: "5531994359434",
                time_typing: 1
            }
        });
    
        return response;
    
    } catch (error) {
        return {
            status: "error",
            message: error.message
        };
    }
}

teste().then(result => {

    console.log(result);

}).catch(error => {

    console.error(error);
});
