const express = require('express')
const app = express()
const port = process.env.PORT || '3000'
var PubNub = require('pubnub')

var pubnub = new PubNub({
  subscribeKey: "sub-c-065072d0-224c-11e7-9093-0619f8945a4f",
  publishKey: "pub-c-e0032c5e-fe30-48c8-a743-c4734119131d",
  secretKey: "sec-c-MGQxYTJlMWYtODQ1MC00ZTg2LWFhMWMtNTgzMzkyY2YzOTZm",
  ssl: true
})

pubnub.subscribe({
  channels: ['my_channel'],
});
// ----------------------------------------
// App Locals
// ----------------------------------------
app.use((req, res, next) => {
  res.locals.siteTitle = 'Building and Testing an Express API';
  next();
});


// ----------------------------------------
// Body Parser
// ----------------------------------------
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// ----------------------------------------
// Logging
// ----------------------------------------
const morgan = require('morgan');
const morganToolkit = require('morgan-toolkit')(morgan);

// Use morgan middleware with
// custom format
if (process.env.NODE_ENV !== 'test') {
  app.use(morganToolkit());
}

app.get('/', function (request, response) {
  response.send('Hello Viking!')
})

// let test = require('./routers/test')
// app.use('/test', test)

let pots = require('./routers/pots')
app.use('/pots', pots)

app.get('/test', (req, res, next) => {
  pubnub.publish(
    {
        message: { 
            such: 'object'
        },
        channel: 'my_channel',
        sendByPost: false, // true to send via post
        storeInHistory: false, //override default storage options
        meta: { 
            "cool": "meta"
        }   // publish extra meta with the request
    }, 
    function (status, response) {
        if (status.error) {
            // handle error
            console.log(status)
        } else {
            console.log("message Published w/ timetoken", response.timetoken)
        }
    }
  );
})

app.listen(port, function () {
  // This function is run when the app starts up.
  console.log('Running locally on localhost')
})



/* heroku details
Creating app... done, ⬢ floating-badlands-67522
https://floating-badlands-67522.herokuapp.com/ | https://git.heroku.com/floating-badlands-67522.git
*/
