// Index.js if the file expected by the aws lambda function we created
// This file will handle the HTTP to MQTT bridge
// Once code is created it will be uploaded onto the aws function


//Beginning point of Lambda function
exports.handler = async (event, context, callback) => {
    
    //Make a connection to cloudMQTT
    var mqtt = require("mqtt");

    var url = 'mqtt://m16.cloudmqtt.com:19897';

    var options = {
        clientId: 'client_httptomqtt',
        username: 'user1',
        password: 'password'
    };

    // Make a connection to the cloudMQTT Server
    var client = mqtt.connect(url,options);
    var myMessage = event.messageontopic;

    // On connect event, publish this
    client.on('connect', function(){
        // Now write code to publish the message from HTTP to MQTT
        client.publish('MyLED', myMessage, function(){
            console.log("Message is published");
            client.end();
        })
    });
    // End of making connection to cloudMQTT

    //AWSLambda function
    callback(null, "Message sent with" + myMessage);
};
