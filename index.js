const express = require('express')
const app = express()
const port = process.env.PORT || '3000'

app.get('/', function (request, response) {
  response.send('Hello Viking!')
})

app.listen(port, function () {
  // This function is run when the app starts up.
  console.log('Running locally on localhost')
})

/* heroku details
Creating app... done, ⬢ floating-badlands-67522
https://floating-badlands-67522.herokuapp.com/ | https://git.heroku.com/floating-badlands-67522.git
*/
