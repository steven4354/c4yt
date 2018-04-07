const express = require('express')
const app = express()
const port = process.env.PORT || '3000'

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

let test = require('./routers/test')
app.use('/test', test)

app.listen(port, function () {
  // This function is run when the app starts up.
  console.log('Running locally on localhost')
})

/* heroku details
Creating app... done, ⬢ floating-badlands-67522
https://floating-badlands-67522.herokuapp.com/ | https://git.heroku.com/floating-badlands-67522.git
*/
