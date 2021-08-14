const accountSid = process.env.TWILIO_ACCOUNT_SID || 'AC14688f4833fa61cb3953716b178e3b79';
const authToken = process.env.TWILIO_AUTH_TOKEN || '4944b10aeaa619ce25de0d3a34f7001e';
const client = require('twilio')(accountSid, authToken);

module.exports = (phone, message) => {
  client.messages
    .create({
      messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID || 'MGd8e367cf72acab287b057ab49b13fcbd',
      body: message,
      to: phone,
    })
    .then(message => console.log('Message sid: ', message.sid))
    .catch(error => console.log('Error while sending message', error))
    .done();
}