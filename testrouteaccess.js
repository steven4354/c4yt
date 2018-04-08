const axios = require("axios");

// Optionally the request above could also be done as
axios
  .get("/user")
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  });
