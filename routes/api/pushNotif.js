const https = require('https');

module.exports = {
    sendPushNotification : (id, title) => {
        // This registration token comes from the client FCM SDKs.
        let topic = `/topics/news`;
        let serverKey = 'AAAASwE3Gu8:APA91bFzNJft0-4FGa3S2la36AWDsRjk3CCGJqwb9t1P6undO8uklyFGG_h88H9MG3YULV0atUv4idBMGGHCv0zMDm3crVgWnouebNSzCrXV-XaOFsgzzygZBcQNaksil125prdWxEjw';

        let message = {
                to : topic,
                collapse_key : 'type_a',
                notification : {
                    body : title,
                    title : 'New article on feed...',
                    icon : 'ic_launcher',
                    color: "#cd534b",
                },
                data : {
                    id : id,
                }
            };

        let options = {
            method : 'POST',
            hostname : 'fcm.googleapis.com',
            path : '/fcm/send',
            headers : {
                'Content-Type': 'application/json',
                'Authorization': `key=${serverKey}`,
            }
        };

        let req = https.request(options, function (res) {
            let chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function (chunk) {
                let body = Buffer.concat(chunks);
                console.log(body.toString());
            });

            res.on("error", function (error) {
                console.error(error);
            });
        });

        req.write(JSON.stringify(message));
        req.end();
    }
};