import { WhatsApp } from 'apigratis-sdk-nodejs';

async function teste() {
  try {
    const response = await WhatsApp({
      action: "sendText",
      credentials: {
        SecretKey: "747bc316-1bbf-4e5e-9e88-f5c78e1425a7",
        PublicToken: "0abfbc1b-c827-4ff7-a534-6fd057a80804",
        DeviceToken: "157e8312-ecf1-4ffe-a6d7-844b1259ad17",
        BearerToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3BsYXRhZm9ybWEuYXBpYnJhc2lsLmNvbS5ici9hdXRoL2xvZ2luIiwiaWF0IjoxNjc2MzA0NjgxLCJleHAiOjE3MDc4NDA2ODEsIm5iZiI6MTY3NjMwNDY4MSwianRpIjoiNEVBWDBubWFPUDVaazN0UiIsInN1YiI6IjIiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.vwT4CM5BTl8_OmnKw8dIxi3qe1WPKcfTL3x6KhcwVaY",
      },
      body: {
        text: "Hello World por JavaScript",
        number: "5531994359434",
        time_typing: 1
      }
    });

    console.log(response);
  } catch (error) {
    console.log(response);
  }
}

teste();
