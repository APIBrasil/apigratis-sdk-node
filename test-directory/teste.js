const APIGratis = require('apigratis');

function teste() {
    return APIGratis.WhatsApp({
        "action": "sendText",
        "credentials": {
            "SecretKey": "SEU_SECRET_KEY",
            "PublicToken": "SEU_PUBLIC_TOKEN",
            "DeviceToken": "SEU_DEVICE_TOKEN",
            "BearerToken": "SEU_BEARER_TOKEN",
        },
        "body": {
            "message": "Hello World por Python",
            "phone": "5531994359434",
            "time_typing": 1
        }
    });
}